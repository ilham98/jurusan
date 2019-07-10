import React, { useState, useEffect, useContext, useRef } from 'react';
import DosenMain from '@/components/DosenMain';
import generateUrl from '@/helper/generateUrl';
import axios from 'axios';
import { AuthContext } from '@/contexts/auth-context';
import { FormGroup, InputText, InputSelect, ErrorMessage } from '@/components/forms';
import DosenModulTable from '@/tables/DosenModulTable';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Swal from 'sweetalert2';

function DosenModul() {
	const [ mataKuliah, setMataKuliah ] = useState([]);
	const [ form, setForm ] = useState({});
	const [ modul, setModul ] = useState({ data:[] });
	const { nidn } = useContext(AuthContext);
	const auth = useContext(AuthContext);
	const [ open, setOpen ] = useState(false);
	const [ agenda, setAgenda ] = useState({ data: [] });
	const [ page, setPage ] = useState(1);
	const initialMount = useRef(true);
	const [ loading, setLoading ] = useState(false);
	const [ errors, setErrors ] = useState([]);

	useEffect(() => {
		document.title = 'Admin | Agenda';
	})

	const handleOpen = () => {
		console.log(handleOpen);
		setEditMode(false);
		setForm(formInit);
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	function nextClickHandler() {
		setPage(p => p + 1);
	}

	function prevClickHandler() {
		setPage(p => p - 1);
	}

	function deleteClickHandler($id) {
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
		  	axios.delete(generateUrl('modul/'+$id))
			.then(() => {
				fetchModul();
				Swal.fire(
			      'Deleted!',
			      'Your file has been deleted.',
			      'success'
			    )
			})
		  }
		})
		
	}

	function handleChange(e) {
		e.persist();
		setForm(s => ({ ...s, [e.target.name]:e.target.value }));
	}

	function fillAndOpenFormModal(d) {
		setEditMode(true);
		setForm(d);
		setOpen(true);
	}

	function fetchModul() {
		axios.get(generateUrl('dosen/'+nidn+'/modul?page='+page))
			.then(({data}) => {
				setModul(data);
			});
	}

	useEffect(() => {
		console.log(auth);
		fetchModul();
		axios.get(generateUrl('mata-kuliah'))
			.then(({data}) => {
				setMataKuliah(data);
			});
	}, [])

	useEffect(() => {
		fetchModul()
	}, [page]);

	function submitHandler(e) {
		e.preventDefault();
		const body = new FormData();
		form.judul && body.append('judul', form.judul);
		form.mata_kuliah_id && body.append('mata_kuliah_id', form.mata_kuliah_id);
		form.modul_file && body.append('modul_file', form.modul_file);
		console.log(form);
		axios.post(generateUrl('modul'), body)
			.then(() => {
				fetchModul();
				setOpen(false);
				Swal.fire(
			      'Berhasil!',
			      'Modul berhasil ditambahkan.',
			      'success'
			    )
			}).catch(err => {
				setErrors(err.response.data.errors);
			})
	}

	function clickHandler(id) {
		axios.delete(generateUrl('modul/'+id))
			.then(() => {
				fetchModul();
			})
	}

	function openModalClickHandler() {
		setErrors({});
		setOpen(true);
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
			<FormGroup align='right'>
				<Button text='Tambah Modul' onClick={ openModalClickHandler } />
			</FormGroup>
			<div>
				<DosenModulTable 
					data={ modul } 
					nextClickHandler = { nextClickHandler }
					prevClickHandler = { prevClickHandler }
					loading = { loading }
					fillAndOpenFormModal = { fillAndOpenFormModal }
					deleteClickHandler = { deleteClickHandler }
					fetchModul={ fetchModul } 
				/>
			</div>
			<Modal 
				isOpen={ open }
				handleOpen={ () => setOpen(true) }  
				handleClose={ () => setOpen(false) }
				title='Tambah Modul'
			>
				<form onSubmit={ submitHandler } encType='multipart/form-data'>
					<FormGroup>
						<InputText name='judul' onChange={ changeHandler } />
						<ErrorMessage>{ errors.judul && errors.judul[0] }</ErrorMessage>
					</FormGroup>
					<FormGroup>
						<InputSelect name='mata_kuliah_id' onChange={ changeHandler }>
							<option value=''>Pilih Mata Kuliah</option>
							{
								mataKuliah.map(mk => (
									<option value={ mk.id } key={ mk.id }>{ mk.nama }</option>
								))
							}
						</InputSelect>
						<ErrorMessage>{ errors.mata_kuliah_id && errors.mata_kuliah_id[0] }</ErrorMessage>
					</FormGroup>
					<FormGroup>
						<input type='file' name='modul_file' onChange={ fileChangeHandler } />
						<ErrorMessage>{ errors.modul_file && errors.modul_file[0] }</ErrorMessage>
					</FormGroup>
					<Button type='submit' text='Submit' />
				</form>
			</Modal>
		</DosenMain>
	);
}

export default DosenModul;