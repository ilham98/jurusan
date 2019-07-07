import React, { useState, useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import axios from 'axios';
// import Swal from 'sweetalert2';
import generateUrl from '@/helper/generateUrl';
import Loading from '@/components/Loading';
// import { FormGroup } from '@/components/forms';
import ProfilForm from '@/forms/ProfilForm';

function AdminEditProfil() {

	const [profil, setProfil] = useState({});
	const [loading, setLoading] = useState(true);

	function fetchProfil() {
		setLoading(true);
		axios.get(generateUrl('profil'))
			.then(res => {
				setProfil(res.data);
				setLoading(false);
			});
	}

	useEffect(() => {
		fetchProfil();
	}, []);

	return (
		<AdminMain title='Edit Profil Jurusan'>
			{
				loading ? (
						<Loading />
					) : (
						<ProfilForm profil={ profil }/>
					)
			}
		</AdminMain>
	);
}

export default AdminEditProfil;