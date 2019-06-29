import React from 'react';
import PropTypes from 'prop-types';
import PaginationButton from '@/components/PaginationButton';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/table';

function AgendaTable(props) {
	const { data } = props;

	return (
		<div className='border mt-3 bg-white overflow-auto max-w-xs'>
			<div className='p-3 flex justify-end'>
				<PaginationButton type='left' />
				<PaginationButton type='right' />
			</div>
			<Table>
				<Thead>
					<Tr>
						<Th>No</Th>
						<Th>Nama</Th>
						<Th>Tanggal</Th>
						<Th>Option</Th>
					</Tr>
				</Thead>
				<Tbody>
					{
						data.data && data.data.map((d, index) => (
							<Tr key={ d.id } className={ `hover:bg-gray-400 ${index % 2 === 0 && 'bg-gray-300'}` }>
								<Td>{ data.current_page * (index+1) }</Td>
								<Td>{ d.nama }</Td>
								<Td><span className='inline-block px-3 font-bold text-yellow-800 rounded-full py-1 text-sm bg-yellow-200'>{ d.tanggal }</span></Td>
								<Td><i className='text-red-500 fas fa-trash' /></Td>
							</Tr>
						))
					}
				</Tbody>
			</Table>
		</div>
	);
}

AgendaTable.propTypes = {
	data: PropTypes.object
}


export default AgendaTable;