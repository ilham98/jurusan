import React from 'react';
import PropTypes from 'prop-types';
import PaginationButton from '@/components/PaginationButton';
import { Table, Thead, Tbody, Tr, Th, Td } from '@/components/table';
import { DeleteButton, EditButton } from '@/components/buttons';
import generateUrl from '@/helper/generateUrl';
import Loading from '@/components/Loading';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';

function BeritaTable(props) {
	const { data, loading } = props;
	const { prevClickHandler, nextClickHandler, fetchBerita } = props;
	const { prev_page_url, next_page_url } = data;

	function deleteClickHandler(id) {
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.value) {
		  	axios.delete(generateUrl('berita/'+id))
			.then(() => {
				fetchBerita();
				Swal.fire(
			      'Deleted!',
			      'Your file has been deleted.',
			      'success'
			    )
			})
		  }
		})

	}

	function convertDate(t) {
		return moment(t).locale('id').calendar();
	}

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
									<Th>Judul</Th>
									<Th>Tanggal Dibuat</Th>
								</Tr>
							</Thead>
							<Tbody>
								{
									data.data && data.data.map((d, index) => (
										<Tr key={ d.id } className={ `hover:bg-gray-400 ${index % 2 === 0 && 'bg-gray-300'}` }>
											<Td>{ ((data.current_page - 1) * data.per_page) + (index+1) }</Td>
											<Td>{ d.judul }</Td>
											<Td>{ convertDate(d.created_at) }</Td>
											<Td>
												<Link to={ '/a/berita/'+d.id+'/edit' }>
													<EditButton />
												</Link>
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

BeritaTable.propTypes = {
	data: PropTypes.object,
	loading: PropTypes.bool,
	prevClickHandler: PropTypes.func,
	nextClickHandler: PropTypes.func,
	deleteClickHandler: PropTypes.func,
	fillAndOpenFormModal: PropTypes.func,
	fetchBerita: PropTypes.func
}


export default BeritaTable;