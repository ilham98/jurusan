import React, { useState} from 'react';
import Button from '@/components/Button';
import axios from 'axios'
import { InputSelect, FormGroup, ErrorMessage, Label } from '@/components/forms';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import generateUrl from '@/helper/generateUrl';
// import TimePicker from 'rc-time-picker';
// import moment from 'moment';

function WaktuForm(props) {
	const { fetchWaktu, handleChange, handleClose } = props;
	const { hari, form, editMode } = props;
	const [ errors, setErrors ] = useState({});
	const [ formBusy, setFormBusy ] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setFormBusy(true);
		const ax = editMode ? axios.put(generateUrl('waktu/'+form.id), form) : axios.post(generateUrl('waktu'), form);
		ax.then(function() {
			Swal.fire(
			  'Berhasil!',
			  'Data berhasil diinput!',
			  'success'
			);
			fetchWaktu();
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
				<Label>Nama</Label>
				<InputSelect 
					name='hari_id' 
					onChange={ handleChange }
					value={ form.hari_id }
				>
					<option value=''>Pilih Hari</option>
					{
						hari.map(h => {
							return <option key={ h.id } value={ h.id }>{ h.nama }</option>
						})
					}
				</InputSelect>
				<ErrorMessage>{ errors.hari_id && errors.hari_id[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Mulai</Label>
				<input type='time' name='mulai' onChange={ handleChange } value={ form.mulai } />
				<ErrorMessage>{ errors.mulai && errors.mulai[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Selesai</Label>
				<input type='time' name='selesai' onChange={ handleChange } value={ form.selesai } />
				<ErrorMessage>{ errors.selesai && errors.selesai[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup align='right'>
				<Button disabled={ formBusy } type='submit' text='Submit' />
			</FormGroup>
		</form>
	);	
}

WaktuForm.propTypes = {
	closeModal: PropTypes.func,
	fetchAgenda: PropTypes.func,
	fetchWaktu: PropTypes.func,
	handleChange: PropTypes.func,
	handleClose: PropTypes.func,
	hari: PropTypes.array,
	form: PropTypes.object,
	editMode: PropTypes.bool
};

export default WaktuForm;