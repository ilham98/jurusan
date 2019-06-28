import React, { useState, useEffect, useContext } from 'react';
import AdminMain from '@/components/AdminMain';
import useAxios from '@/hooks/useAxios';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import SelectedJadwal from './SelectedJadwal';
import FormGroup from '@/components/forms/FormGroup';
import InputSelect from '@/components/forms/InputSelect';
import Button from '@/components/Button';
import axios from 'axios';
import { BASE_API_URL } from '@/config';
import { AuthContext } from '@/contexts/auth-context';
import JadwalForm from '@/forms/JadwalForm';
import Swal from 'sweetalert2';

function AdminDashboard() {
	const [semester, setSemester] = useState("");
	const { data } = useAxios({ url: 'kelas' });
	const [form, setForm] = useState({ kelas_id:'', semester:'', dosenIds:[] });
	const [tahun, setTahun] = useState(2016);
	const { data:jadwal, refetch, loading } = useAxios({ url: `jadwal?tahun=${tahun}` });
	const { data:hari } = useAxios({ url: 'hari' });
	const { data:mata_kuliah } = useAxios({ url: 'mata-kuliah' });
	const { data:ruangan } = useAxios({ url: 'ruangan' });
	const { data:dosen } = useAxios({ url: 'dosen' });
	const [kelas, setKelas] = useState([]);
	const [selectedJadwal, setSelectedJadwal] = useState({});
	const [dosenId, setDosenId] = useState('')
	const [selectedDosen, setSelectedDosen] = useState([]);
	const [namaKelas, setNamaKelas] = useState('');
	const [kodeProdi, setKodeProdi] = useState('');
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [ errors, setErrors ] = useState({});
	const { access_token } = useContext(AuthContext);

	useEffect(() => {
		if(form.tahun !== '') {
			refetch();
		}

	}, [tahun])

	useEffect(() => {
		const k = [];
		if(tahun !== '' && semester !== '') {
			data.forEach(function(d) {
				const selisih_tahun = tahun-d.tahun_angkatan+1;
				if(selisih_tahun >= 1) {
					let sem = 1;
					if(semester % 2 === 0) {
						sem = selisih_tahun*2;
					} else {
						sem = selisih_tahun*2-1;
					}
					if(d.prodi.jenjang === 'D3') {
						if(selisih_tahun <= 3) {
							k.push({ nama: d.prodi.kode+sem+d.nama, kode_prodi: d.prodi.kode, semester: sem, kelas_id: d.id });	
						}
					} else {
						if(selisih_tahun <= 4) {
							k.push({ nama: d.prodi.kode+sem+d.nama, kode_prodi: d.prodi.kode, semester: sem, kelas_id: d.id });	
						}
					}
				}
			});
		}
		setKelas(k);	
	}, [semester, namaKelas]);

	function getSelectedJadwal() {
		console.log(tahun, semester, namaKelas, kodeProdi);
		if(tahun !== "" && semester !== "" && namaKelas !== "" && kodeProdi !== '') {
			if(jadwal[semester]) {
				if(jadwal[semester][kodeProdi][namaKelas]) {
					return jadwal[semester][kodeProdi][namaKelas];
				} else {
					return {};
				}
			} else {
				return {};
			}
		} else {
			return {};
		}
	}

	function tahunChangeHandler(e) {
		setTahun(e.target.value);
		setKelas([]);
		setSemester('');
	}

	function semesterChangeHandler(e) {
		setSemester(e.target.value);
		if(e.target.value !== "") {
			setForm(f => ({ ...f, kelas_id: '', semester: '' }));
		} else {
			setKelas([]);
		}
	}

	function kelasChangeHandler(e) {
		e.persist();
		if(e.target.value !== '') {
			const kelas_id = parseInt(e.target.value);
			const kel = kelas.find(k => k.kelas_id === parseInt(kelas_id));
			const sem = kel.semester;
			setKodeProdi(kel.kode_prodi);
			setNamaKelas(kel.nama);
			setForm(f => ({ ...f, semester: sem, kelas_id }));
		} else {
			setForm(f => ({ ...f, kelas_id: '', semester: '' }));
			setNamaKelas('');
			setKodeProdi('');
		}
	}

	function changeHandler(e) {
		e.persist();
		setForm(f => ({ ...f, [e.target.name]: parseInt(e.target.value) }));
		if(e.target.name === 'hari_id') {
			setForm(f => ({ ...f, 'waktu_id': '' }));
		}
	}

	function tambahDosenPengajarClickHandler() {
		const checkDosen = selectedDosen.find(d => d.nidn === dosenId);
		if(!checkDosen) {
			const d = selectedDosen;
			d.push(dosen.find(d => d.nidn === dosenId));
			setSelectedDosen(d);
			setForm(f => {
				const dosenIds = f.dosenIds;
				return { ...f, dosenIds: [...dosenIds, dosenId] }
			});
			setOpen2(false);
		} else {
			Swal.fire(
			  'Error!',
			  'Dosen yang sama telah ditambahkan sebelumnya!',
			  'error'
			);
		}
	}

	function submitHandler(e) {
		e.preventDefault();
		axios.post(`${BASE_API_URL}/jadwal`, form, { headers: { Authorization: access_token } })
			.then(({data}) => {
				refetch();
				Swal.fire(
				  'Berhasil!',
				  'Jadwal berhasil ditambahkan',
				  'success'
				);
				handleClose();
			}).catch(err =>	 {
				if(err.response.status === 422)
				setErrors(err.response.data.errors);
				if(err.response.status === 500) {
					Swal.fire(
					  'Gagal!',
					  err.response.data.messages,
					  'error'
					);
				};
			}).then(() => {
				setSelectedJadwal(jadwal[semester][kodeProdi][namaKelas]);
			})
	}

	function deleteClickHandler(id) {
		axios.delete(`${BASE_API_URL}/jadwal/${id}`)
			.then(() => {
				refetch();
				Swal.fire(
				  'Berhasil!',
				  'Jadwal berhasil dihapus',
				  'success'
				);
			})
	}

	function handleOpen() {
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
		setSelectedDosen([]);
		setErrors([]);
		setForm(f => ({ ...f, dosenIds: [] }));
		setDosenId('');
	}

	function dosenDetail(dosen) {
		if(dosen)
			return (
				<table className='m-3' cellPadding='5'>
					<tbody>
						<tr>
							<td>Nama</td>
							<td>:</td>
							<td>{ dosen.nama }</td>
						</tr>
						<tr>
							<td>NIDN</td>
							<td>:</td>
							<td>{ dosen.nidn }</td>
						</tr>
						<tr>
							<td>NIP</td>
							<td>:</td>
							<td>{ dosen.nip }</td>
						</tr>
					</tbody>
				</table>
			);
		return '';
	}

	return (
		<AdminMain title='Jadwal'>
			<form onSubmit={ submitHandler }>
				<div className="flex">
					<FormGroup>
						<InputSelect name="tahun" onChange={ tahunChangeHandler }>
							<option value="">Pilih Tahun</option>
							<option value={ 2016 }>2016</option>
							<option value={ 2017 }>2017</option>
							<option value={ 2018 }>2018</option>
							<option value={ 2019 }>2019</option>
						</InputSelect>
					</FormGroup>
					<FormGroup>
						<InputSelect value={ semester } onChange={ semesterChangeHandler }>
							<option value="">Pilih Semester</option>
							<option value={ 1 }>Ganjil</option>
							<option value={ 2 }>Genap</option>
						</InputSelect>
					</FormGroup>
					<FormGroup>
						<InputSelect name="kelas_id" value={ form.kelas_id } onChange={ kelasChangeHandler }>
							<option value="">Pilih Kelas</option>
								{
									kelas.map(k => (
										<option key={ k.kelas_id } value={ k.kelas_id }>{ k.nama }</option>	
									)) 
								}
						</InputSelect>
					</FormGroup>
					<FormGroup>
						<Button type="button" onClick={ handleOpen } text='Tambah Jadwal' disabled={ tahun === "" || semester === "" || namaKelas === "" } />
					</FormGroup>
				</div>
			</form>
			{
				loading ?
					<Loading /> :
					(
						tahun === "" || semester === "" || namaKelas === "" ? 
							<div className='h-64 flex items-center justify-center'>Silahkan Pilih Tahun, Semester, Dan Nama Kelas Lebih dulu</div> : (
								Object.keys(getSelectedJadwal()).length ? 
								<SelectedJadwal 
									deleteClickHandler={ deleteClickHandler } 
									selectedJadwal={ getSelectedJadwal() }
								/> :
								<div className='h-64 flex items-center justify-center'>Tidak ditemukan jadwal</div>
							)
					)
			}
			<Modal 
				title='Tambah Jadwal'
				isOpen={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
			>
				<JadwalForm 
					selectedDosen={ selectedDosen }
					hari={ hari }
					mata_kuliah = { mata_kuliah }
					ruangan = { ruangan }
					form={ form }
					errors = { errors }
					changeHandler = { changeHandler }
					submitHandler = { submitHandler } 
					teacherModalHandleOpen={ () => setOpen2(true) }
				/>
			</Modal>
			<Modal 
				isOpen={open2}
				handleClose={() => setOpen2(false)}
			>
				<div>
					{ 
						dosenId !== '' ? (
							<div>
								{ dosenDetail(dosen.find(d => d.nidn === dosenId)) }
							</div>
						) : '' 
					}
				</div>
				<FormGroup>
					<InputSelect onChange={ e => setDosenId(e.target.value) }>
						<option value=''>Pilih Dosen</option>
						{
							dosen.map(d => (
								<option value={ d.nidn } key={ d.nidn }>{ d.nama }</option>
							))
						}
					</InputSelect>
				</FormGroup>
				<FormGroup>
					<Button onClick={ tambahDosenPengajarClickHandler } color='secondary' text='Tambah Dosen' />
				</FormGroup>
			</Modal>
		</AdminMain>
	);
}

export default AdminDashboard;