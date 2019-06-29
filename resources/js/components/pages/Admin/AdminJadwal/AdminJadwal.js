import React, { useState, useEffect, useContext } from 'react';
import AdminMain from '@/components/AdminMain';
import useAxios from '@/hooks/useAxios';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import DosenDetail  from './components/DosenDetail';
import SelectedJadwal from './components/SelectedJadwal';
import FormGroup from '@/components/forms/FormGroup';
import InputSelect from '@/components/forms/InputSelect';
import JadwalFilterFormAdmin from '@/forms/JadwalFilterFormAdmin';
import Button from '@/components/Button';
import axios from 'axios';
import { BASE_API_URL } from '@/config';
import { AuthContext } from '@/contexts/auth-context';
import JadwalForm from '@/forms/JadwalForm';
import Swal from 'sweetalert2';

function AdminDashboard() {
	const [semester, setSemester] = useState(0);
	const { data } = useAxios({ url: 'kelas' });
	const [form, setForm] = useState({ kelas_id:'', semester:'', dosenIds:[] });
	const [tahun, setTahun] = useState(2016);
	const { data:jadwal, refetch, loading } = useAxios({ url: `jadwal?tahun=${tahun}` });
	const { data:hari } = useAxios({ url: 'hari' });
	const { data:mata_kuliah } = useAxios({ url: 'mata-kuliah' });
	const { data:ruangan } = useAxios({ url: 'ruangan' });
	const { data:dosen } = useAxios({ url: 'dosen' });
	const [kelas, setKelas] = useState([]);	
	const [dosenId, setDosenId] = useState('')
	const [selectedDosen, setSelectedDosen] = useState([]);
	const [namaKelas, setNamaKelas] = useState('');
	const [kodeProdi, setKodeProdi] = useState('');
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [ errors, setErrors ] = useState([]);
	const { access_token } = useContext(AuthContext);

	useEffect(() => {
		document.title = 'Admin | Jadwal';
	}, []);

	useEffect(() => {
		if(form.tahun !== '') {
			refetch();
		}
		setKelas([]);
		setSemester(0);
	}, [tahun])

	useEffect(() => {
		const k = [];
		if(tahun !== 0 && semester !== 0) {
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
		setTahun(parseInt(e.target.value));
	}

	function semesterChangeHandler(e) {
		setSemester(parseInt(e.target.value));
		if(e.target.value !== 0) {
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
			.then(() => {
				refetch();
				Swal.fire(
				  'Berhasil!',
				  'Jadwal berhasil ditambahkan',
				  'success'
				);
				closeJadwalModalHandler();
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

	function openJadwalModalHandler() {
		setOpen(true);
	}

	function closeJadwalModalHandler() {
		setOpen(false);
		setSelectedDosen([]);
		setErrors([]);
		setForm(f => ({ ...f, dosenIds: [] }));
		setDosenId('');
	}

	return (
		<AdminMain title='Jadwal'>
			<JadwalFilterFormAdmin  
				semester={ semester }
				kelas= {kelas}
				form={ form }
				openJadwalModalHandler={ openJadwalModalHandler }
				tahunChangeHandler={ tahunChangeHandler }
				semesterChangeHandler={ semesterChangeHandler }
				namaKelas={ namaKelas }
				submitHandler= { submitHandler }
				kelasChangeHandler={ kelasChangeHandler }
				tahun={ tahun }
			/>
			<div className='border-t border-gray-400 my-6'></div>
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
				handleOpen={openJadwalModalHandler}
				handleClose={closeJadwalModalHandler}
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
				title='Tambah Dosen Pengajar'
				isOpen={open2}
				handleClose={() => setOpen2(false)}
			>
				<div>
					{ 
						dosenId !== '' ? (
							<div>
								<DosenDetail dosen={ dosen.find(d => d.nidn === dosenId) }/>
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