import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function convertTime(time) {
	return moment(time, "HH:mm:ss").format("HH:mm");
}

function MataKuliah(props) {
	const { form, selected, waktu, copyMode } = props;
	const { setValueOfForm, copyClickHandler, deleteClickHandler, pasteClickHandler } = props;
	function clickHandler() {
		const dosenIds = selected.dosen.map(d => d.nidn);
		console.log(selected);
		const value = {
			ruangan_id: selected.ruangan_id,
			kelas_id: selected.kelas_id,
			mata_kuliah_id: selected.mata_kuliah_id,
			semester: selected.semester,
			dosenIds
		}
		setValueOfForm(value);
		copyClickHandler(value);
	}

	function pasClickHandler() {
		const value = {
			...form,
			waktu_id: waktu.id
		}
		pasteClickHandler(value);
	}

	if(selected)
		return (
			<div>
				{ selected.mata_kuliah.nama } 
				<i
					className='fa fa-copy text-blue-600 inline-block ml-2' 
					onClick={ clickHandler }
				/>
				<i 
					className='fa fa-trash text-red-600 inline-block ml-1' 
					onClick={ () => deleteClickHandler(selected.id) } 
				/>
				<div>
					{ selected.ruangan.nama }
				</div>
				<div>
					{ 
						selected.dosen.map(d => (
							<span key={ d.nidn }>{ d.kode_nama } </span>
						))
					}
				</div>
			</div>
		);
	return <div>{ copyMode ? <div onClick={ pasClickHandler } className='px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600'>Paste</div> : '------' }</div>
}

MataKuliah.propTypes = {
	selected: PropTypes.object,
	hari: PropTypes.object,
	copyClickHandler: PropTypes.func,
	deleteClickHandler: PropTypes.func,
	copyMode: PropTypes.bool,
	pasteClickHandler: PropTypes.func,
	form: PropTypes.object,
	setValueOfForm: PropTypes.func,
	waktu: PropTypes.object
}

function Waktu(props) {
	const { form, waktu, hari, selected,copyMode } = props;
	const { setValueOfForm, deleteClickHandler, copyClickHandler, pasteClickHandler } = props;
	return (
		waktu.map(w => {
			const mulai = convertTime(w.mulai);
			const selesai = convertTime(w.selesai);
			return (
				<div key={ w.id } className='py-3 px-10' style={{ minWidth: '200px' }}>
					<div className='whitespace-no-wrap text-sm text-center'>
						<div>{ mulai } - { selesai }</div>
						<MataKuliah 
							hari={ hari } 
							waktu={ w } 
							deleteClickHandler={ deleteClickHandler } selected={ selected ? selected[`${mulai}-${selesai}`] : null }
							copyClickHandler={ copyClickHandler }
							copyMode={ copyMode }
							pasteClickHandler={ pasteClickHandler }
							form={ form }
							setValueOfForm={ setValueOfForm }
						/>
					</div>
				</div>
			)
		})	
	);
}

Waktu.propTypes = {
	hari: PropTypes.object,
	copyClickHandler: PropTypes.func,
	deleteClickHandler: PropTypes.func,
	copyMode: PropTypes.bool,
	pasteClickHandler: PropTypes.func,
	form: PropTypes.object,
	setValueOfForm: PropTypes.func
}


function Hari(props) {
	const { form, hari, selected, copyMode } = props;
	const { setValueOfForm, deleteClickHandler, copyClickHandler, pasteClickHandler } = props;
	return hari.map(h => {
		if(h.waktu.length > 0) {
			return (
				<div key={ h.id } className='rounded-lg shadow bg-white p-1 mx-2 animated fadeInDown faster flex-init my-3'>
		 			<div className='rounded-lg p-5 border-b-2 border-blue-500 font-bold text-center text-blue-500'>{ h.nama }</div>
		 			<div className='text-center text-sm'>
						<Waktu 
							hari={h} 
							waktu={ h.waktu } 
							selected={ selected[h.nama] }
							copyClickHandler={ copyClickHandler }
							copyMode={ copyMode }
							pasteClickHandler={ pasteClickHandler }
							form={ form }
							setValueOfForm={ setValueOfForm }
							deleteClickHandler={ deleteClickHandler }
						/>
		 			</div>
		 		</div>
		 	)
		}
	})
}

Hari.propTypes = {
	selected: PropTypes.object,
	hari: PropTypes.array,
	copyClickHandler: PropTypes.func,
	deleteClickHandler: PropTypes.func,
	copyMode: PropTypes.bool,
	pasteClickHandler: PropTypes.func,
	form: PropTypes.object,
	setValueOfForm: PropTypes.func
}

function SelectedJadwal(props) {
	const [ form, setForm ] = useState({});
	const { selectedJadwal, hari, copyMode } = props;
	const { deleteClickHandler, copyClickHandler, pasteClickHandler } = props;

	function setValueOfForm(v) {
		setForm(v);
	}

	return (
		<div className='sm:flex flex-wrap items-start'>
			{
				<Hari 
					selected={ selectedJadwal } 
					hari={ hari } 
					copyClickHandler={ copyClickHandler }
					deleteClickHandler={ deleteClickHandler }
					copyMode={ copyMode }
					pasteClickHandler={ pasteClickHandler }
					form={ form }
					setValueOfForm={ setValueOfForm }
				/>
			}
		</div>
	)
}

SelectedJadwal.propTypes = {
	selectedJadwal: PropTypes.object,
	deleteClickHandler: PropTypes.func,
	selected: PropTypes.object,
	hari: PropTypes.array,
	copyClickHandler: PropTypes.func,
	copyMode: PropTypes.bool,
	pasteClickHandler: PropTypes.func
}

export default SelectedJadwal;