import React from 'react';

function loopWaktu(waktu) {
	return Object.keys(waktu).map(function(key, index) {
		return (
			<div key={ key } className='py-3 px-10' style={{ minWidth: '200px' }}>
				<div className='whitespace-no-wrap text-sm text-center'>{ key }</div>
				<div>{ waktu[key].mata_kuliah.nama }</div>
			</div>
		);
	});
}

function loopHari(hari) {
	return Object.keys(hari).map(function(key, index) {
		return (
			<div key={ key } className='rounded-lg shadow bg-white p-1 mx-2 animated fadeInDown faster flex-init my-3'>
				<div className='rounded-lg p-5 border-b-2 border-blue-500 font-bold text-center text-blue-500'>{ key }</div>
				<div className='text-center text-sm'>{ loopWaktu(hari[key]) }</div>
			</div>
		);
	});
}

function SelectedJadwal({ selectedJadwal }) {
	return (
		<div className='flex flex-wrap'>
			{
				loopHari(selectedJadwal)
			}
		</div>
	)
}

export default SelectedJadwal;