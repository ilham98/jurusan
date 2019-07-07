import React, { useState, useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import Button from '@/components/Button';
import FormGroup from '@/components/forms/FormGroup';
import BeritaTable from '@/tables/BeritaTable';
import generateUrl from '@/helper/generateUrl';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminBerita() {

	const [ berita, setBerita ] = useState({ data: [] });
	const [ loading, setLoading ] = useState(false);
	const [ page, setPage ] = useState(1);

	useEffect(() => {
		fetchBerita();
	}, [page])

	function fetchBerita(body) {
		setLoading(true);
		axios.get(generateUrl('berita?page='+page), body)
			.then(res => {
				setBerita(res.data);
				setLoading(false);
			});
	}

	function nextClickHandler() {
		setPage(p => p + 1);
	}

	function prevClickHandler() {
		setPage(p => p - 1);
	}

	useEffect(() => {
		document.title = 'Admin | Berita';
		fetchBerita();
		sessionStorage.setItem("draftail:content", null);
	}, [])

	return (
		<AdminMain title='Berita'>
			<FormGroup align='right'>
				<Link to='/a/berita/tambah'>
					<Button text='Tambah Berita' />
				</Link>
			</FormGroup>
			<BeritaTable
			  fetchBerita={ fetchBerita }
			  nextClickHandler={ nextClickHandler }
			  prevClickHandler={ prevClickHandler }
			  data={ berita } loading={ loading } />
		</AdminMain>
	);
}

export default AdminBerita;