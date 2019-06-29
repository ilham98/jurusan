import React, { useEffect } from 'react';
import FormGroup from '@/components/forms/FormGroup';
import InputSelect from '@/components/forms/InputSelect';
import Button from '@/components/Button';
import PropTypes from 'prop-types';

function JadwalForm(props) {
	const { hari, mata_kuliah, ruangan, form, selectedDosen, errors } = props;
	const { changeHandler, submitHandler, teacherModalHandleOpen } = props;

	useEffect(() => {
		console.log('dosen_change')
	}, [props.selectedDosen]);
	
	return (
		<form onSubmit={ submitHandler }>
			<div className='sm:flex'>
				<FormGroup>
					<InputSelect name='hari_id' onChange={ changeHandler }>
						<option value=''>Pilih hari</option>
						{
							hari.map(h => (
								<option key={ h.id } value={ h.id }>{ h.nama }</option>
							))
						}
					</InputSelect>
				</FormGroup>
				<FormGroup>
					<InputSelect name='waktu_id' onChange={ changeHandler } error={errors['waktu_id']}>
						<option value=''>Pilih Waktu</option>
						{
							form.hari_id &&
							hari.find(h => h.id === form.hari_id).waktu.map(w => (
								<option key={ w.id } value={ w.id }>{ w.mulai } - { w.selesai }</option>
							))
						}
					</InputSelect>
				</FormGroup>
			</div>
			<div className='sm:flex'>
				<FormGroup>
					<InputSelect name='mata_kuliah_id' onChange={ changeHandler } error={errors['mata_kuliah_id']}>
						<option value=''>Pilih Mata Kuliah</option>
						{
							mata_kuliah.map(mk => (
								<option key={ mk.id } value={ mk.id }>{ mk.nama }</option>
							))
						}
					</InputSelect>
				</FormGroup>
				<FormGroup>
					<InputSelect name='ruangan_id' onChange={ changeHandler } error={errors['ruangan_id']}>
						<option value=''>Pilih Ruangan</option>
						{
							ruangan.map(r => (
								<option key={ r.id } value={ r.id }>{ r.nama }</option>
							))
						}
					</InputSelect>
				</FormGroup>
			</div>
			<div className={`p-3 bg-gray-200 ${ errors['dosenIds'] && 'border-red-500 border-2' }`}>
				<div className='font-bold'>Daftar Dosen Pengajar</div>
				{
					selectedDosen && selectedDosen.length === 0 ?
					<div>---Dosen Pengajar Belum Ditambahkan---</div> :
					selectedDosen.map((s, key) => (
						<div key={s.nidn} className='mt-2'>{key+1}. { s.nama }</div>
					))
				}
			</div>
			<div className='sm:flex'>
				<FormGroup>
					<Button type="submit" text='Tambah Jadwal' />
				</FormGroup>
				<FormGroup>
					<Button type='button' color='secondary' onClick={ () => teacherModalHandleOpen() } text='Tambah Dosen Pengajar' />
				</FormGroup>
			</div>
		</form>
	)
}

JadwalForm.propTypes = {
	hari: PropTypes.array,
	mata_kuliah: PropTypes.array,
	ruangan: PropTypes.array,
	form: PropTypes.object,
	selectedDosen: PropTypes.array,
	errors: PropTypes.array,
	changeHandler: PropTypes.func,
	submitHandler: PropTypes.func,
	teacherModalHandleOpen: PropTypes.func,
}

export default JadwalForm;