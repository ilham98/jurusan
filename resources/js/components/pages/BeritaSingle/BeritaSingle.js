import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import generateUrl from '@/helper/generateUrl';
import moment from 'moment';
import Loading from '@/components/Loading';
import PropTypes from 'prop-types';

function BeritaSingle(props) {

	const [ berita, setBerita ] = useState({});
	const [ loading, setLoading ] = useState(true);

	function fetchBerita() {
		const id = props.match.params.id;
		setLoading(true);
		axios.get(generateUrl('berita/'+id))
			.then(res => {
				setBerita(res.data);
				setLoading(false);
			})
	}

	function convertDate(t) {
		return moment(t).locale('id').calendar();
	}

	useEffect(() => {
		document.title = 'mantap gan';
		fetchBerita();
	}, []);

    return (
    	<div>
			<Navbar />
			<div className="mt-20">
				{
					loading ? (
						<Loading />
					) : (
						<div className='py-2 px-2 sm:py-10 sm:px-32 lg:px-64 w-full'>
							<div className="px-5 shadow bg-white  py-5 sm:py-10 sm:px-20">
								<div className="flex flex-col-reverse xl:flex-row justify-between items-start">
									<div className="flex-initial my-2 mx-3 text-gray-900 text-xl font-open">
										{ berita.judul }
									</div>
									<div className='flex w-full xl:w-auto flex-auto justify-center xl:justify-end'>
										<div className='my-2 mx-3 text-sm bg-red-500 whitespace-no-wrap px-3 text-white font-bold rounded-full py-1'>{ convertDate(berita.created_at) }</div>
									</div>
								</div>
								<div className='my-2 mx-3 leading-relaxed text-gray-800 border-l-5 border-blue-500' dangerouslySetInnerHTML={{ __html: berita.isi }} />
							</div>
				      	</div>
					)
				}
			</div>
      	</div>
    );
}

BeritaSingle.propTypes = {
	match: PropTypes.object
}

export default BeritaSingle;
