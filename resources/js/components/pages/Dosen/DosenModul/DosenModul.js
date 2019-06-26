import React, { useState, useEffect, useContext } from 'react';
import DosenMain from '@/components/DosenMain';
import generateUrl from '@/helper/generateUrl';
import { AuthContext } from '@/contexts/auth-context';

function DosenModul() {
	const [ open, setOpen ] = useState(false);
	const [ mataKuliah, setMataKuliah ] = useState([]);
	const [ form, setForm ] = useState({});
	const [ modul, setModul ] = useState([]);
	const { nidn } = useContext(AuthContext);
	const auth = useContext(AuthContext);

	function fetchModul() {
		axios.get(generateUrl('dosen/'+nidn+'/modul'))
			.then(({data}) => {
				setModul(data);
			});
	}

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	useEffect(() => {
		console.log(auth);
		fetchModul();
		axios.get(generateUrl('mata-kuliah'))
			.then(({data}) => {
				setMataKuliah(data);
			});
	}, [])

	function submitHandler(e) {
		e.preventDefault();
		const body = new FormData();
		form.judul && body.append('judul', form.judul);
		form.mata_kuliah_id && body.append('mata_kuliah_id', form.mata_kuliah_id);
		form.modul_file && body.append('modul_file', form.modul_file);
		console.log(form);
		axios.post(generateUrl('modul'), body)
			.then(({ data }) => {
				fetchModul();
			}).catch(err => {
				console.log(err);
			})
	}

	function clickHandler(id) {
		axios.delete(generateUrl('modul/'+id))
			.then(({ data }) => {
				fetchModul();
			})
	}

	function changeHandler(e) {
		e.persist();
		setForm(f => ({ ...f, [e.target.name]: e.target.value }));
	}

	function fileChangeHandler(e) {
		e.persist();
		const file = e.target.files[0];
		setForm(f => ({ ...f, 'modul_file': file }));
	}

	return (
		<DosenMain title='Dashboard'>
			<div>
				{
					modul.map(m => (
						<div key={ m.id }>{ m.judul } <button onClick={ () => clickHandler(m.id) }>x</button></div>
					))
				}
			</div>
			<form onSubmit={ submitHandler } encType='multipart/form-data'>
				<input name='judul' onChange={ changeHandler } />
				<select name='mata_kuliah_id' onChange={ changeHandler }>
					<option value=''>Pilih Mata Kuliah</option>
					{
						mataKuliah.map(mk => (
							<option value={ mk.id } key={ mk.id }>{ mk.nama }</option>
						))
					}
				</select>
				<input type='file' name='modul_file' onChange={ fileChangeHandler } />
				<input name='judul' />
				<input type='submit' />
			</form>
		</DosenMain>
	);
}

export default DosenModul;