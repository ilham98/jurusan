import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';
import Loading from '@/components/Loading';
import InputSelect from '@/components/forms/InputSelect';
import InputText from '@/components/forms/InputText';
import FormGroup from '@/components/forms/FormGroup';
import Button from '@/components/Button';

function Modul() {

	const [modul, setModul] = useState({});
	const [mataKuliah, setMataKuliah] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState({});
	const [page, setPage] = useState(1);

	function fetchModul() {
		setLoading(true);
		axios.get(generateUrl('modul?page='+page+'&filter='+JSON.stringify(filter)))
			.then(({data}) => {
				setModul(data);
				setLoading(false);
			});
	}

	useEffect(() => {
		axios.get(generateUrl('mata-kuliah'))
			.then(({data}) => {
				setMataKuliah(data);
			});
		fetchModul(page);
	}, []);

	useEffect(() => {
		setPage(1);
		fetchModul();
	}, [filter])

	useEffect(() => {
		fetchModul();
	}, [page])

	function changeHandler(e) {
		e.persist();
		setFilter(f => ({...f, [e.target.name]: e.target.value}));
	}

    return (
    	<div>
			<Navbar />
			<div className='mt-24 px-5 md:px-64'>
				<div className='flex flex-wrap'>
					<FormGroup>
						<InputSelect name='mata_kuliah_id' onChange={ changeHandler } >
							<option value=''>Seluruh Mata Kuliah</option>
							{
								mataKuliah.map(mk => (
									<option value={ mk.id } key={ mk.id }>{ mk.nama }</option>
								))
							}
						</InputSelect>
					</FormGroup>
					<FormGroup>
					<InputText name='judul' onChange={ changeHandler } />
					</FormGroup>
					<FormGroup>
					{
						<div>
							{
								modul.prev_page_url && <Button disabled={ loading } onClick={ () => setPage(p => p-1) } text='Prev' />
							}
							{
								modul.next_page_url && <Button disabled={ loading } onClick={ () => setPage(p => p+1) } text='Next' />
							}
							
						</div>
					}
					</FormGroup>
				</div>
			</div>
			<div className="sm:flex px-5 md:px-20 flex-wrap justify-center mt-5"> 
			{
				loading ? <Loading /> : (
						<React.Fragment>
							<div className="md:px-20 flex animated fadeInUp faster items-center justify-center m-2 shadow bg-white py-5">
								<div className="flex-initial text-center my-2 mx-3 text-gray-900 text-xl font-open">
									{ (modul.data ? modul.data.length > 0 : false) ? 'Modul' : 'Tidak ada modul yang ditemukan' } 
								</div>
							</div>
							{
								modul.data && modul.data.map(m => (
									<div key={ m.id } style={{ maxWidth: 400 }} className="px-10 animated fadeInUp faster m-2 shadow bg-white py-5 relative">
										<div className="flex flex-initial justify-between text-gray-900">
											<div>{ m.judul }</div>
											<div className='ml-3'>
												<a target='_blank' className='absolute' style={{ top: 5, right: 10 }} href={ m.modul_url }>
													<i className='text-orange-500 hover:bg-orange-300 hover:text-orange-600 p-2 rounded-full fas fa-arrow-down' />
												</a>
											</div>
										</div>
										<div className='text-sm text-gray-700 mt-3'>Mata Kuliah: <span className='font-semibold'>{ m.mata_kuliah.nama }</span></div>
										<div className='text-sm text-gray-700 mt-1'>Diupload Oleh: <span className='font-semibold'>{ m.dosen.nama }</span></div>
									</div>
								))
							}
							
						</React.Fragment>
					)
			}
			</div>
		</div>
    );
}

export default Modul;
