import React from 'react';

function DosenDetail({dosen}) {
	if(dosen)
		return (
			<table className='m-3' cellPadding='5'>
				<tbody>
					<tr>
						<td>Nama</td>
						<td>:</td>
						<td>{ dosen.nama }</td>
					</tr>
					<tr>
						<td>NIDN</td>
						<td>:</td>
						<td>{ dosen.nidn }</td>
					</tr>
					<tr>
						<td>NIP</td>
						<td>:</td>
						<td>{ dosen.nip }</td>
					</tr>
				</tbody>
			</table>
		);
	return '';
}

export default DosenDetail;