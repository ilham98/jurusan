import React, { useState } from 'react';
import Button from '@/components/Button';
import axios from 'axios';
import { InputTextArea, FormGroup, ErrorMessage, Label } from '@/components/forms';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import generateUrl from '@/helper/generateUrl';
import { withRouter } from 'react-router-dom';

function ProfilForm(props) {

	function convertMisi(m) {
		var myString = m;
		var splits = myString.split(/<li>|<.li><li>|<.li>/gm).filter(s => {
		  return s !== '';
		});

		var join = splits.join(',');

		return join;
	}

	const { profil } = props;
	const [ misi, setMisi ] = useState(convertMisi(profil.misi));
	const [ errors, setErrors ] = useState({});
	const [ formBusy, setFormBusy ] = useState(false);
	const [ visi, setVisi ] = useState(profil.visi);

	function handleSubmit(e) {
		e.preventDefault();
		setFormBusy(true);
		const f = { visi, misi };
		axios.put(generateUrl('profil'), f)
			.then(() => {
				Swal.fire(
				  'Berhasil!',
				  'Data berhasil diinput!',
				  'success'
				);
				props.history.push('/a/profil');
			}).catch(err => {
				setFormBusy(false);
				setErrors(err.response.data.errors);
			});
	}

	return (
		<form onSubmit={ handleSubmit }>
			<FormGroup>
				<Label>Visi</Label>
				<InputTextArea
					name='visi' 
					onChange={ e => setVisi(e.target.value) }
					value={ visi }
				>
				</InputTextArea>
				<ErrorMessage>{ errors.visi && errors.visi[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Misi</Label>
				<InputTextArea
					wfull={ true }
					name='visi' 
					onChange={ e => setMisi(e.target.value) }
					value={ misi }
				>
				</InputTextArea>
				<ErrorMessage>{ errors.misi && errors.misi[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup align='right'>
				<Button disabled={ formBusy } type='submit' text='Submit' />
			</FormGroup>
		</form>
	);	
}

ProfilForm.propTypes = {
	history: PropTypes.object,
	profil: PropTypes.object
};

export default withRouter(ProfilForm);