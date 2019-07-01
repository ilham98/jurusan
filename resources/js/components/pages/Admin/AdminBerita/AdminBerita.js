import React, { useState, useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import BeritaForm from '@/forms/BeritaForm';

function AdminBerita() {
	const [ open, setOpen ] = useState(false);

	useEffect(() => {
		document.title = 'Admin | Berita';
	})
 
	const handleOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<AdminMain title='Dashboard'>
			<Button onClick={ handleOpen } text='Tambah Berita' />
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