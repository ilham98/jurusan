import React, { useState, useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import BeritaForm from '@/forms/BeritaForm';
import generateUrl from '@/helper/generateUrl';
import axios from 'axios';
import PropTypes from 'prop-types';

function AdminBerita(props) {

	const [berita, setBerita] = useState({});
	const [loading, setLoading] = useState(true);

	function fetchBerita() {
		setLoading(true);
		const id = props.match.params.id;
		axios.get(generateUrl('berita/'+id))
			.then(res => {
				setBerita(res.data);
				setLoading(false);
			});
	}

	useEffect(() => {
		document.title = 'Admin | Tambah Berita';
		fetchBerita();
	}, []);



	return (
		<AdminMain title='Berita'>
			{
				!loading && (<BeritaForm 
					editMode={ true }
					berita={ berita }
				/>)
			}	
		</AdminMain>
	);
}

AdminBerita.propTypes = {
	match: PropTypes.object
};

export default AdminBerita;