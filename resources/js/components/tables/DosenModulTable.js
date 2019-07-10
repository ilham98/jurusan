import React from 'react';
import PropTypes from 'prop-types';
import PaginationButton from '@/components/PaginationButton';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/table';
import { DeleteButton, EditButton } from '@/components/buttons';
import Loading from '@/components/Loading';

function ModulTable(props) {
	const { data, loading } = props;
	const { prevClickHandler, nextClickHandler, fillAndOpenFormModal, deleteClickHandler } = props;
	const { prev_page_url, next_page_url } = data;

	return (
		<div className='border mt-3 bg-white'>
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
									<Th>Judul</Th>
									<Th>Download</Th>
									<Th>Option</Th>
								</Tr>
							</Thead>
							<Tbody>
								{
									data.data && data.data.map((d, index) => (
										<Tr key={ d.id } className={ `hover:bg-gray-400 ${index % 2 === 0 && 'bg-gray-300'}` }>
											<Td>{ ((data.current_page - 1) * data.per_page) + (index+1) }</Td>
											<Td>{ d.judul }</Td>
											<Td><span className='inline-block px-3 font-bold text-yellow-800 rounded-full py-1 text-sm bg-yellow-200'>Download</span></Td>
											<Td>
												<DeleteButton onClick={ () => deleteClickHandler(d.id) } />
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

ModulTable
.propTypes = {
	data: PropTypes.object,
	loading: PropTypes.bool,
	prevClickHandler: PropTypes.func,
	nextClickHandler: PropTypes.func,
	deleteClickHandler: PropTypes.func,
	fillAndOpenFormModal: PropTypes.func
}


export default ModulTable
;