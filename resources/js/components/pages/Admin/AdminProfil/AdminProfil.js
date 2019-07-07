import React, { useState, useEffect } from 'react';
import AdminMain from '@/components/AdminMain';
import Button from '@/components/Button';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';
import Loading from '@/components/Loading';
import { FormGroup } from '@/components/forms';
import { Link } from  'react-router-dom';
import PropTypes from 'prop-types';

function Pillow(props) {
	return (
		<div>
			<div className='inline-block px-5 text-white rounded-full py-1 bg-blue-500'>{ props.children }</div>
		</div>
	)
}

Pillow.propTypes = {
	children: PropTypes.node
};


function AdminVisiMisi() {
	
	const [profil, setProfil] = useState({});
	const [loading, setLoading] = useState(false);

	function fetchProfil() {
		setLoading(true);
		axios.get(generateUrl('profil'))
			.then(res => {
				setProfil(res.data);
				setLoading(false);
			})
	}

	useEffect(() => {
		fetchProfil();
	}, []);

	return (
		<AdminMain title='Profil Jurusan'>
			<FormGroup align='right'>
				<Link to='/a/profil/edit'>
					<Button text='Edit Profil' />
				</Link>
			</FormGroup>
			{
				loading ? (
						<Loading />
					) : (
						<div className='bg-white p-10 shadow'>
							<div>
								<Pillow>Visi</Pillow>		
								<div className='my-4'>
									{ profil.visi }
								</div>
							</div> 
							<div>
								<Pillow>Misi</Pillow>
								<ol className='list-decimal my-4 ml-3' dangerouslySetInnerHTML={{ __html: profil.misi }}>
								</ol>
							</div>
						</div>
					)
			}
		</AdminMain>
	);
}

export default AdminVisiMisi;