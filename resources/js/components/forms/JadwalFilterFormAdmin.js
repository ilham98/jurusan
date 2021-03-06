import React from 'react';
import FormGroup from '@/components/forms/FormGroup';
import InputSelect from '@/components/forms/InputSelect';
import Button from '@/components/Button';
import PropTypes from 'prop-types';
import DownloadPDF from '@/pages/Admin/AdminJadwal/components/DownloadPDF';

function AdminJadwalFilterForm(props) {
	const { semester, tahun, form, kelas, namaKelas } = props;
	const { openJadwalModalHandler, tahunChangeHandler, submitHandler, semesterChangeHandler, kelasChangeHandler } = props;
	return (
		<form onSubmit={ submitHandler }>
			<div className="sm:flex">
				<FormGroup>
					<InputSelect name="tahun" onChange={ tahunChangeHandler }>
						<option value={ 0 }>Pilih Tahun</option>
						<option value={ 2016 }>2016</option>
						<option value={ 2017 }>2017</option>
						<option value={ 2018 }>2018</option>
						<option value={ 2019 }>2019</option>
					</InputSelect>
				</FormGroup>
				<FormGroup>
					<InputSelect name="semester" value={ semester } onChange={ semesterChangeHandler }>
						<option value={ 0 }>Pilih Semester</option>
						<option value={ 1 }>Ganjil</option>
						<option value={ 2 }>Genap</option>
					</InputSelect>
				</FormGroup>
				<FormGroup>
					<InputSelect name="kelas_id" value={ form.kelas_id } onChange={ kelasChangeHandler }>
						<option value="">Pilih Kelas</option>
							{
								kelas.map(k => (
									<option key={ k.kelas_id } value={ k.kelas_id }>{ k.nama }</option>	
								)) 
							}
					</InputSelect>
				</FormGroup>
				<FormGroup>
					<div className='flex'>
						<Button type="button" onClick={ openJadwalModalHandler } text='Tambah Jadwal' disabled={ tahun === "" || semester === "" || namaKelas === "" } />
						<DownloadPDF tahun={ tahun } semester={ semester } />
					</div>
				</FormGroup>
			</div>
		</form>
	)
}

AdminJadwalFilterForm.propTypes = {
	semester: PropTypes.number,
	tahun: PropTypes.number,
	form: PropTypes.object,
	kelas: PropTypes.array,
	namaKelas: PropTypes.string,
	openJadwalModalHandler: PropTypes.func,
	tahunChangeHandler: PropTypes.func,
	submitHandler: PropTypes.func,
	semesterChangeHandler: PropTypes.func,
	kelasChangeHandler: PropTypes.func,
}

export default AdminJadwalFilterForm;