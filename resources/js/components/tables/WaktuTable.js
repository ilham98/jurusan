import React from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/table';
import { DeleteButton, EditButton } from '@/components/buttons';
import Loading from '@/components/Loading';

function WaktuTable(props) {
	const { data, loading } = props;
	const { fillAndOpenFormModal, deleteClickHandler } = props;

	return (
		<div className='border mt-3 bg-white overflow-auto max-w-xs sm:max-w-full'>
			{
				loading ? (
						<Loading />
					) : (
						<Table>
							<Thead>
								<Tr>
									<Th>No</Th>
									<Th>Hari</Th>
									<Th>Mulai</Th>
									<Th>Selesai</Th>
									<Th>Option</Th>
								</Tr>
							</Thead>
							<Tbody>
								{
									data && data.map((d, index) => (
										<Tr key={ d.id } className={ `hover:bg-gray-400 ${index % 2 === 0 && 'bg-gray-300'}` }>
											<Td>{ index+1 }</Td>
											<Td>{ d.hari.nama }</Td>
											<Td>{ d.mulai }</Td>
											<Td>{ d.selesai }</Td>
											<Td>
												<EditButton onClick={ () => fillAndOpenFormModal(d) } />
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

WaktuTable.propTypes = {
	data: PropTypes.array,
	loading: PropTypes.bool,
	fillAndOpenFormModal: PropTypes.func,
	deleteClickHandler: PropTypes.func
}


export default WaktuTable;