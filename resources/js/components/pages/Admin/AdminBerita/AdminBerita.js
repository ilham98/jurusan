import React, { useState, useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import BeritaForm from '@/forms/BeritaForm';
import generateUrl from '@/helper/generateUrl';
import axios from 'axios';

function AdminBerita() {

	useEffect(() => {
		document.title = 'Admin | Berita';
	})

	return (
		<AdminMain title='Berita'>
			<BeritaForm />
		</AdminMain>
	);
}

export default AdminBerita;