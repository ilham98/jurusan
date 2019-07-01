import React, { useState} from 'react';
import Button from '@/components/Button';
import axios from 'axios'
import { InputText, InputDate, FormGroup, ErrorMessage, InputTextArea, Label } from '@/components/forms';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import generateUrl from '@/helper/generateUrl';

function AgendaForm(props) {
	const { fetchAgenda, handleChange } = props;
	const { form, editMode } = props;
	const [ errors, setErrors ] = useState({});
	const [ formBusy, setFormBusy ] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setFormBusy(true);
		const ax = editMode ? axios.put(generateUrl('agenda/'+form.id), form) : axios.post(generateUrl('agenda'), form);
		ax.then(function() {
			Swal.fire(
			  'Berhasil!',
			  'Data berhasil diinput!',
			  'success'
			);
			fetchAgenda();
			setFormBusy(false);
			props.closeModal();
		})
		.catch(function(err) {
			setFormBusy(false);
			setErrors(err.response.data.errors);
		});
	}

	return (
		<form onSubmit={ handleSubmit }>
			<FormGroup>
				<Label>Nama</Label>
				<InputText
					name='nama' 
					type="text" 
					onChange={ handleChange }
					value={ form.nama }
				/>
				<ErrorMessage>{ errors.nama && errors.nama[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Tanggal</Label>
				<InputDate name='tanggal' type='date' onChange={ handleChange } value={ form.tanggal } />
				<ErrorMessage>{ errors.tanggal && errors.tanggal[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Deskripsi</Label>
				<InputTextArea name='deskripsi' onChange={ handleChange } value={ form.deskripsi }>
				</InputTextArea>
				<ErrorMessage>{ errors.deskripsi && errors.deskripsi[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup align='right'>
				<Button disabled={ formBusy } type='submit' text='Submit' />
			</FormGroup>
		</form>
	);	
}

AgendaForm.propTypes = {
	closeModal: PropTypes.func,
	fetchAgenda: PropTypes.func
};

export default AgendaForm;