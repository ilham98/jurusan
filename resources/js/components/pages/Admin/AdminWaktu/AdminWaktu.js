import React, { useState, useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import WaktuForm from '@/forms/WaktuForm';
import WaktuTable from '@/tables/WaktuTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import generateUrl from '@/helper/generateUrl';
import { FormGroup } from '@/components/forms';

function AdminWaktu() {
	const formInit = {
		hari_id: '',
		mulai: '',
		selesai: ''
	};

	const [ open, setOpen ] = useState(false);
	const [ waktu, setWaktu ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ form, setForm ] = useState(formInit);
	const [ editMode, setEditMode ] = useState(false);
	const [ hari, setHari ] = useState([]);

	useEffect(() => {
		document.title = 'Admin | Waktu';
	})

	function fetchWaktu() {
		setLoading(true);
		axios.get(generateUrl('waktu'))
			.then(res => {
				setWaktu(res.data);
				setLoading(false);
			});
	}

	function fetchHari() {
		axios.get(generateUrl('hari'))
			.then(res => {
				setHari(res.data);
			});
	}

	useEffect(() => {
		fetchWaktu();
		fetchHari();
	}, []);

	const handleOpen = () => {
		console.log(handleOpen);
		setEditMode(false);
		setForm(formInit);
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
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
		  	axios.delete(generateUrl('waktu/'+$id))
			.then(() => {
				fetchWaktu();
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

	const handleMulaiChange = mulai => {
		mulai = mulai.format('HH:mm:ss')
    	setForm(s => ({ ...s, mulai:mulai }));
  	}

  	const handleSelesaiChange = selesai => {
  		selesai.format('HH:mm:ss')
    	setForm(s => ({ ...s, selesai:selesai }));
  	}

	function fillAndOpenFormModal(d) {
		setEditMode(true);
		setForm(d);
		setOpen(true);
	}

	return (
		<AdminMain title='Waktu'>
			<FormGroup align='right'>
				<Button onClick={ handleOpen } text='Tambah Waktu' />
			</FormGroup>
			<div>
				<WaktuTable 
					data={ waktu } 
					loading = { loading }
					fillAndOpenFormModal = { fillAndOpenFormModal }
					deleteClickHandler = { deleteClickHandler }
				/>
			</div>
			<Modal 
				isOpen={ open } 
				handleOpen={ handleOpen }  
				handleClose={ handleClose }
				title='Tambah Waktu'
			>
				<WaktuForm 
					handleMulaiChange={ handleMulaiChange }
					handleSelesaiChange={ handleSelesaiChange }
					fetchWaktu={ fetchWaktu }
					form={ form }
					editMode={ editMode }
					handleChange={ handleChange }
					hari={ hari }
					handleClose={ handleClose }
				/>
			</Modal>
		</AdminMain>
	);
}

export default AdminWaktu;