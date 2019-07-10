import React from 'react';
import BeritaItem from '@/components/BeritaItem';
import useAxios from '@/hooks/useAxios';
import { Link } from 'react-router-dom';

function BeritaTerbaru() {

    const { data, loading } = useAxios({ url: 'berita?paginate=3' });

    return (
    	<div className="md:flex-8 lg:flex-9 px-8 py-10 lg:px-8 xl:px-24 xl:py-10 bg-gray-200">
    		<div className="text-2xl my-3 font-open">Berita Terbaru</div>
                <div className='animated fadeInUp'>
                {
                    <div> 
                        {
                            data.data && data.data.map(item => (
                                <BeritaItem
                                    key={ item.id }
                                    id={ item.id }
                                    judul={ item.judul }
                                    isi={ item.isi }
                                />
                            ))  
                        }
                        {
                            !loading && (
                                <div className='flex justify-center'>
                                    <Link 
                                        className='text-white bg-orange-500 px-5 py-2'
                                        to='/berita'
                                    >
                                        Lihat Lebih Banyak Berita
                                    </Link>
                                </div> 
                            )
                        }
                    </div>
                }
            </div>
    	</div>
    );
}

export default BeritaTerbaru;