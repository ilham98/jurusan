import React, { useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import BeritaForm from '@/forms/BeritaForm';

function AdminBerita() {

	useEffect(() => {
		document.title = 'Admin | Tambah Berita';
	})

	return (
		<AdminMain title='Berita'>
			<BeritaForm
				editMode={ false }
			/>
		</AdminMain>
	);
}

export default AdminBerita;