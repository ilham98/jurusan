import React, { useState, useEffect, useRef } from 'react';
import AdminMain from '@/components/AdminMain';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import DosenForm from '@/forms/DosenForm';
import DosenTable from '@/tables/DosenTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import generateUrl from '@/helper/generateUrl';
import { FormGroup } from '@/components/forms';

function AdminBerita() {
	const formInit = {
		nidn: '',
		nip: '',
		nama: '',
		no_telepon: '',
		keahlian: '',
		email: '',
		jabatan_fungsional_id: ''
	};

	useEffect(() => {
		document.title = 'Admin | Dosen';
	})

	const [ open, setOpen ] = useState(false);
	const [ dosen, setDosen ] = useState({ data: [] });
	const [ jabatanFungsional, setJabatanFungsional ] = useState([]);
	const [ page, setPage ] = useState(1);
	const initialMount = useRef(true);
	const [ loading, setLoading ] = useState(false);
	const [ form, setForm ] = useState(formInit);
	const [ editMode, setEditMode ] = useState(false);

	function fetchDosen() {
		setLoading(true);
		axios.get(generateUrl('dosen?paginate=20&page='+page))
			.then(res => {
				setDosen(res.data);
				setLoading(false);
			});
	}

	function fetchJabatanFungsional() {
		axios.get(generateUrl('jabatan-fungsional'))
			.then(res => {
				setJabatanFungsional(res.data);
			});
	}

	useEffect(() => {
		fetchDosen();
		fetchJabatanFungsional();
	}, []);

	useEffect(() => {
		if(initialMount.current) {
			initialMount.current = false
		} else {
			fetchDosen();
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
		  	axios.delete(generateUrl('dosen/'+$id))
			.then(() => {
				fetchDosen();
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
		<AdminMain title='Dosen'>
			<FormGroup align='right'>
				<Button onClick={ handleOpen } text='Tambah Dosen' />
			</FormGroup>
			<div>
				<DosenTable 
					data={ dosen } 
					nextClickHandler = { nextClickHandler }
					prevClickHandler = { prevClickHandler }
					loading = { loading }
					fillAndOpenFormModal = { fillAndOpenFormModal }
					deleteClickHandler = { deleteClickHandler }
					fetchDosen={ fetchDosen } 
				/>
			</div>
			<Modal 
				isOpen={ open } 
				handleOpen={ handleOpen }  
				handleClose={ handleClose }
				title='Tambah Dosen'
			>
				<DosenForm 
					jabatan_fungsional = { jabatanFungsional }
					editMode={ editMode }
					form={ form }
					closeModal={ handleClose }
					fetchDosen={ fetchDosen } 
					handleChange={ handleChange }
				/>
			</Modal>
		</AdminMain>
	);
}

export default AdminBerita;