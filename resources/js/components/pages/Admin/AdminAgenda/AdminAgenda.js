import React, { useState, useEffect, useRef } from 'react';
import AdminMain from '@/components/AdminMain';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import AgendaForm from '@/forms/AgendaForm';
import AgendaTable from '@/tables/AgendaTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import generateUrl from '@/helper/generateUrl';
import { FormGroup } from '@/components/forms';

function AdminBerita() {
	const formInit = {
		nama: '',
		tanggal: '',
		deskripsi: ''
	};

	const [ open, setOpen ] = useState(false);
	const [ agenda, setAgenda ] = useState({ data: [] });
	const [ page, setPage ] = useState(1);
	const initialMount = useRef(true);
	const [ loading, setLoading ] = useState(false);
	const [ form, setForm ] = useState(formInit);
	const [ editMode, setEditMode ] = useState(false);

	useEffect(() => {
		document.title = 'Admin | Agenda';
	})

	function fetchAgenda() {
		setLoading(true);
		axios.get(generateUrl('agenda?page='+page))
			.then(res => {
				setAgenda(res.data);
				setLoading(false);
			});
	}

	useEffect(() => {
		fetchAgenda();
	}, []);

	useEffect(() => {
		if(initialMount.current) {
			initialMount.current = false
		} else {
			fetchAgenda();
		}
	}, [page]);

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
		  	axios.delete(generateUrl('agenda/'+$id))
			.then(() => {
				fetchAgenda();
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

	return (
		<AdminMain title='Agenda'>
			<FormGroup align='right'>
				<Button onClick={ handleOpen } text='Tambah Agenda' />
			</FormGroup>
			<div>
				<AgendaTable 
					data={ agenda } 
					nextClickHandler = { nextClickHandler }
					prevClickHandler = { prevClickHandler }
					loading = { loading }
					fillAndOpenFormModal = { fillAndOpenFormModal }
					deleteClickHandler = { deleteClickHandler }
					fetchAgenda={ fetchAgenda } 
				/>
			</div>
			<Modal 
				isOpen={ open } 
				handleOpen={ handleOpen }  
				handleClose={ handleClose }
				title='Tambah Agenda'
			>
				<AgendaForm 
					editMode={ editMode }
					form={ form }
					closeModal={ handleClose }
					fetchAgenda={ fetchAgenda } 
					handleChange={ handleChange }
				/>
			</Modal>
		</AdminMain>
	);
}

export default AdminBerita;