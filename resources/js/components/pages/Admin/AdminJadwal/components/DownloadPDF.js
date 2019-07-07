import React from 'react';
import Button from '@/components/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';
import XLSX from 'xlsx';

function DownloadPDF() {
	// const { tahun, semester } = props;

	function clickHandler() {
		axios.get(generateUrl('waktu'))
			.then(res => {
				console.log(res.data);
				var ws = XLSX.utils.aoa_to_sheet(res.data);
				// var ws = XLSX.utils.table_to_book(document.getElementById('table'), { raw: true });
				XLSX.writeFile(ws, 'out.xlsb');
			})
	}

	return (
		<Button onClick={ clickHandler } text='DownloadPDF' />
	)
}

DownloadPDF.propTypes = {
	tahun: PropTypes.number,
	semester: PropTypes.number
}

export default DownloadPDF;