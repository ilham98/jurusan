import React, { useState} from 'react';
import Button from '@/components/Button';
import api from '@/services/api';
import InputText from '@/components/forms/InputText';
import FormGroup from '@/components/forms/FormGroup';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';

function BeritaForm(props) {

	const formInit = {
		judul: '',
		isi: ''
	};

	const [ form, setForm ] = useState(formInit);
	const [ errors, setErrors ] = useState({});
	const [ formBusy, setFormBusy ] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setFormBusy(true);
		api.berita.store(form)
			.then(function() {
				Swal.fire(
				  'Berhasil!',
				  'Data berhasil diinput!',
				  'success'
				);
				props.closeModal();
			})
			.catch(function(err) {
				setFormBusy(false);
				setErrors(err.response.data);
			});
	}

	function handleChange(e) {
		e.persist();
		setForm(s => ({ ...s, [e.target.name]:e.target.value }));
	}

	return (
		<form onSubmit={ handleSubmit }>
			<FormGroup>
				<InputText
					name='judul' 
					type="text" 
					placeholder="Judul"
					onChange={ handleChange }
					value={ form.judul }
				/>
				<label>{ errors.judul && errors.judul[0] }</label>
			</FormGroup>
			<FormGroup>
				<InputText
					name='isi' 
					type="text" 
					placeholder="Isi"
					onChange={ handleChange }
					value={ form.isi }
				/>
				<label>{ errors.isi && errors.isi[0] }</label>
			</FormGroup>
			<FormGroup align='right'>
				<Button disabled={ formBusy } text='Tambah'/>
			</FormGroup>
		</form>
	);	
}

BeritaForm.propTypes = {
	closeModal: PropTypes.func
};

export default BeritaForm;