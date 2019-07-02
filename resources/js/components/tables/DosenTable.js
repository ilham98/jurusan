import React from 'react';
import PropTypes from 'prop-types';
import PaginationButton from '@/components/PaginationButton';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/table';
import { DeleteButton, EditButton } from '@/components/buttons';
import Loading from '@/components/Loading';

function DosenTable(props) {
	const { data, loading } = props;
	const { prevClickHandler, nextClickHandler, fillAndOpenFormModal, deleteClickHandler } = props;
	const { prev_page_url, next_page_url } = data;

	return (
		<div className='border mt-3 bg-white overflow-auto max-w-xs sm:max-w-full'>
			<div className='p-3 flex justify-end'>
				<PaginationButton disabled={ loading || !prev_page_url } type='left' onClick={ prevClickHandler } />
				<PaginationButton disabled={ loading || !next_page_url } type='right' onClick = { nextClickHandler } />
			</div>
			{
				loading ? (
						<Loading />
					) : (
						<Table>
							<Thead>
								<Tr>
									<Th>No</Th>
									<Th>NIDN</Th>
									<Th>Nama</Th>
									<Th>Jabatan Fungsional</Th>
								</Tr>
							</Thead>
							<Tbody>
								{
									data.data && data.data.map((d, index) => (
										<Tr key={ d.nidn } className={ `hover:bg-gray-400 ${index % 2 === 0 && 'bg-gray-300'}` }>
											<Td>{ ((data.current_page - 1) * data.per_page) + (index+1) }</Td>
											<Td>{ d.nidn }</Td>
											<Td>{ d.nama }</Td>
											<Td>{ d.jabatan_fungsional.nama }</Td>
											<Td>
												<EditButton onClick={ () => fillAndOpenFormModal(d) } />
												<DeleteButton onClick={ () => deleteClickHandler(d.nidn) } />
											</Td>
										</Tr>
									))
								}
							</Tbody>
						</Table>
					)
			}
		</div>
	);
}

DosenTable.propTypes = {
	data: PropTypes.object,
	loading: PropTypes.bool,
	prevClickHandler: PropTypes.func,
	nextClickHandler: PropTypes.func,
	deleteClickHandler: PropTypes.func,
	fillAndOpenFormModal: PropTypes.func
}


export default DosenTable;