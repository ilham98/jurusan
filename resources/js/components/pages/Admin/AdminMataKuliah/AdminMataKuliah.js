import React, { useState, useEffect, useRef } from 'react';
import AdminMain from '@/components/AdminMain';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import MataKuliahForm from '@/forms/MataKuliahForm';
import MataKuliahTable from '@/tables/MataKuliahTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import generateUrl from '@/helper/generateUrl';
import { FormGroup } from '@/components/forms';

function AdminMataKuliah() {
	const formInit = {
		nama: ''
	};

	const [ open, setOpen ] = useState(false);
	const [ waktu, setWaktu ] = useState([]);
	const [ page, setPage ] = useState(1);
	const initialMount = useRef(true);
	const [ loading, setLoading ] = useState(false);
	const [ form, setForm ] = useState(formInit);
	const [ editMode, setEditMode ] = useState(false);
	const [ hari, setHari ] = useState([]);

	useEffect(() => {
		document.title = 'Admin | Mata Kuliah';
	})

	function fetchMataKuliah() {
		setLoading(true);
		axios.get(generateUrl('mata-kuliah'))
			.then(res => {
				setWaktu(res.data);
				setLoading(false);
			});
	}

	useEffect(() => {
		fetchMataKuliah();
	}, []);

	const handleOpen = () => {
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
		  	axios.delete(generateUrl('mata-kuliah/'+$id))
			.then(res => {
				fetchMataKuliah();
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
		<AdminMain title='Mata Kuliah'>
			<FormGroup align='right'>
				<Button onClick={ handleOpen } text='Tambah Mata Kuliah' />
			</FormGroup>
			<div>
				<MataKuliahTable 
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
				title='Tambah Mata Kuliah'
			>
				<MataKuliahForm 
					fetchMataKuliah={ fetchMataKuliah }
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

export default AdminMataKuliah;