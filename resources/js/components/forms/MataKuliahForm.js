import React, { useState} from 'react';
import Button from '@/components/Button';
import axios from 'axios'
import { InputText, ErrorMessage, Label, FormGroup } from '@/components/forms';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import generateUrl from '@/helper/generateUrl';
// import TimePicker from 'rc-time-picker';
// import moment from 'moment';

function MataKuliahForm(props) {
	const { fetchMataKuliah, handleChange, handleClose } = props;
	const { form, editMode } = props;
	const [ errors, setErrors ] = useState({});
	const [ formBusy, setFormBusy ] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setFormBusy(true);
		const ax = editMode ? axios.put(generateUrl('mata-kuliah/'+form.id), form) : axios.post(generateUrl('mata-kuliah'), form);
		ax.then(function() {
			Swal.fire(
			  'Berhasil!',
			  'Data berhasil diinput!',
			  'success'
			);
			fetchMataKuliah();
			setFormBusy(false);
			handleClose();
		})
		.catch(function(err) {
			setFormBusy(false);
			setErrors(err.response.data.errors);
		});
	}

	return (
		<form onSubmit={ handleSubmit }>
			<FormGroup>
				<Label>Mulai</Label>
				<InputText name='nama' onChange={ handleChange } value={ form.nama } />
				<ErrorMessage>{ errors.nama && errors.nama[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup align='right'>
				<Button disabled={ formBusy } type='submit' text='Submit' />
			</FormGroup>
		</form>
	);	
}

MataKuliahForm.propTypes = {
	closeModal: PropTypes.func,
	fetchAgenda: PropTypes.func,
	fetchMataKuliah: PropTypes.func,
	handleChange: PropTypes.func,
	handleClose: PropTypes.func,
	form: PropTypes.object,
	editMode: PropTypes.bool
};

export default MataKuliahForm;