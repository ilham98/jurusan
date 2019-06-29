import React, { useState, useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import BeritaForm from '@/forms/BeritaForm';
import Table from './components/Table';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';

function AdminBerita() {
	const [ open, setOpen ] = useState(false);
	const [ agenda, setAgenda ] = useState({});

	function fetchAgenda() {
		axios.get(generateUrl('agenda'))
			.then(res => {
				setAgenda(res.data);
			});
	}

	useEffect(() => {
		fetchAgenda();
	}, []);

	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<AdminMain title='Agenda'>
			<Button onClick={ handleOpen } text='Tambah Agenda' />
			<div>
				<Table data={ agenda } />
			</div>
			<Modal 
				isOpen={ open } 
				handleOpen={ handleOpen }  
				handleClose={ handleClose }
				title='Tambah Berita'
			>
				<BeritaForm closeModal={ handleClose } />
			</Modal>
		</AdminMain>
	);
}

export default AdminBerita;