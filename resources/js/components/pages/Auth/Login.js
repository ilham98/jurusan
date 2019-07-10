import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/contexts/auth-context';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';
import { withRouter, Redirect } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FormGroup from '@/components/forms/FormGroup';
import { InputText, ErrorMessage } from '@/components/forms';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Swal from 'sweetalert2';

function Login(props) {
	const [ nidn, setNidn ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errors, setErrors ] = useState([]);
	const { authenticated, role, signin } = useContext(AuthContext);

	useEffect(() => {
		console.log(authenticated);
		document.title = 'Login';
		// if(authenticated) {
		// 	if(role === 'admin')
		// 		props.history.push('/a/jadwal');
		// 	else props.history.push('/t/modul');
		// }
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
				console
				if(err.response.status === 500 || err.response.status === 403) {
					Swal.fire(
					  'Error!',
					  'Username atau Password salah',
					  'error'
					);
				} else if(err.response.status === 422)
					setErrors(err.response.data.errors);
			})
	}

	if(authenticated) {
		if(role === 'admin')
			return <Redirect to='/a/jadwal' />
		else
			return <Redirect to='/t/modul' />
	}
	return (
		<div>
			<Navbar />
			<div className='p-3 flex justify-center mt-20 lg:p-10'>
				<div className='bg-white shadow'>
					<div className='flex p-3 justify-center'>
						<i className='fas fa-key text-white p-3 bg-orange-500 rounded-full' />
					</div>
					<div>
						<form onSubmit={ submitHandler }>
							<FormGroup>
								<InputText placeholder='nidn' onChange={ e => setNidn(e.target.value) }/>
								<ErrorMessage>{ errors.nidn && errors.nidn[0] }</ErrorMessage>
							</FormGroup>
							<FormGroup>
								<InputText placeholder='password' type='password' onChange={ e => setPassword(e.target.value) }/>
								<ErrorMessage>{ errors.password && errors.password[0] }</ErrorMessage>
							</FormGroup>
							<FormGroup>
								<div className='flex p-3 justify-center'>
									<Button type='submit' text='Masuk' />
								</div>
							</FormGroup>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

Login.propTypes = {
	history: PropTypes.object 
}

export default withRouter(Login);