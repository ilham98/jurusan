import React, { useState} from 'react';
import Button from '@/components/Button';
import axios from 'axios';
import { InputText, InputSelect, FormGroup, ErrorMessage, Label } from '@/components/forms';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import generateUrl from '@/helper/generateUrl';

function DosenForm(props) {
	const { fetchDosen, handleChange } = props;
	const { form, editMode, jabatan_fungsional } = props;
	const [ errors, setErrors ] = useState({});
	const [ formBusy, setFormBusy ] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		setFormBusy(true);
		const ax = editMode ? axios.put(generateUrl('dosen/'+form.nidn), form) : axios.post(generateUrl('dosen'), form);
		ax.then(function() {
			Swal.fire(
			  'Berhasil!',
			  'Data berhasil diinput!',
			  'success'
			);
			fetchDosen();
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
				<Label>NIDN</Label>
				<InputText
					name='nidn' 
					onChange={ handleChange }
					value={ form.nidn }
				/>
				<ErrorMessage>{ errors.nidn && errors.nidn[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>NIP</Label>
				<InputText
					name='nip' 
					onChange={ handleChange }
					value={ form.nip }
				/>
				<ErrorMessage>{ errors.nip && errors.nip[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Nama</Label>
				<InputText
					name='nama' 
					onChange={ handleChange }
					value={ form.nama }
				/>
				<ErrorMessage>{ errors.nama && errors.nama[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>No Telepon</Label>
				<InputText
					name='no_telepon' 
					onChange={ handleChange }
					value={ form.no_telepon }
				/>
				<ErrorMessage>{ errors.no_telepon && errors.no_telepon[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Keahlian</Label>
				<InputText
					name='keahlian' 
					onChange={ handleChange }
					value={ form.keahlian }
				/>
				<ErrorMessage>{ errors.keahlian && errors.keahlian[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Email</Label>
				<InputText
					name='email' 
					onChange={ handleChange }
					value={ form.email }
				/>
				<ErrorMessage>{ errors.email && errors.email[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup>
				<Label>Jabatan Fungsional</Label>
				<InputSelect name='jabatan_fungsional_id' value={ form.jabatan_fungsional_id } onChange={ handleChange }>
					<option value=''>Pilih Jabatan Fungsional</option>
					{
						jabatan_fungsional.map(j => (
							<option key={ j.id } value={ j.id }>{ j.nama }</option>
						))
					}
				</InputSelect>
				<ErrorMessage>{ errors.jabatan_fungsional_id && errors.jabatan_fungsional_id[0] }</ErrorMessage>
			</FormGroup>
			<FormGroup align='right'>
				<Button disabled={ formBusy } type='submit' text='Submit' />
			</FormGroup>
		</form>
	);	
}

DosenForm.propTypes = {
	closeModal: PropTypes.func,
	fetchDosen: PropTypes.func,
	handleChange: PropTypes.func,
	handleClose: PropTypes.func,
	form: PropTypes.object,
	editMode: PropTypes.bool,
	jabatan_fungsional: PropTypes.array
};

export default DosenForm;