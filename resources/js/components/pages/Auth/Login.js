import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/auth-context';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';
import { withRouter } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FormGroup from '@/components/forms/FormGroup';
import InputText from '@/components/forms/InputText';

function Login(props) {
	const [ nidn, setNidn ] = useState('');
	const [ password, setPassword ] = useState('');
	const { authenticated, role, signin } = useContext(AuthContext);

	useEffect(() => {
		document.title = 'Login';
		if(authenticated) {
			if(role === 'admin')
				props.history.push('/a/jadwal');
			else props.history.push('/t/modul');
		}
	}, []);

	function submitHandler(e) {
		e.preventDefault();
		axios.post(generateUrl('login'), { nidn, password })
			.then(res => {
				signin(res.data);
				if(res.data.role === 'admin')
					props.history.push('/a/jadwal');
				else props.history.push('/t/modul');
			}).catch(err => {
				console.log(err);
			})
	}
	return (
		<div>
			<Navbar />
			<div className='p-3 flex justify-center mt-20 lg:p-10'>
				<div className='bg-white shadow'>
					<div className='p-3'>Login</div>
					<div>
						<form onSubmit={ submitHandler }>
							<FormGroup>
								<InputText onChange={ e => setNidn(e.target.value) }/>
							</FormGroup>
							<FormGroup>
								<InputText type='password' onChange={ e => setPassword(e.target.value) }/>
							</FormGroup>
							<FormGroup>
								<button type='submit'>Masuk</button>
							</FormGroup>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Login);