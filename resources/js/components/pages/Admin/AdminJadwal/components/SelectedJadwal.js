import React from 'react';
import PropTypes from 'prop-types'

function Waktu({waktu, deleteClickHandler }) {
	return Object.keys(waktu).map(function(key) {
		return (
			<div key={ key } className='py-3 px-10' style={{ minWidth: '200px' }}>
				<div className='whitespace-no-wrap text-sm text-center'>
					{ key } <i className='fa fa-trash text-red-600' onClick={ () => deleteClickHandler(waktu[key]['jadwal_id']) } />
				</div>
				<div>{ waktu[key].mata_kuliah.nama }</div>
			</div>
		);
	});
}

function Hari({hari, deleteClickHandler}) {
	return Object.keys(hari).map(function(key) {
		return (
			<div key={ key } className='rounded-lg shadow bg-white p-1 mx-2 animated fadeInDown faster flex-init my-3'>
				<div className='rounded-lg p-5 border-b-2 border-blue-500 font-bold text-center text-blue-500'>{ key }</div>
				<div className='text-center text-sm'>
					<Waktu waktu={ hari[key] } deleteClickHandler={ deleteClickHandler } />
				</div>
			</div>
		);
	});
}

function SelectedJadwal(props) {
	const { selectedJadwal } = props;
	const { deleteClickHandler } = props;
	return (
		<div className='sm:flex flex-wrap'>
			{
				<Hari hari={ selectedJadwal } deleteClickHandler={ deleteClickHandler }/>
			}
		</div>
	)
}

SelectedJadwal.propTypes = {
	selectedJadwal: PropTypes.object,
	deleteClickHandler: PropTypes.func
}

export default SelectedJadwal;