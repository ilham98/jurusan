import React from 'react';
import BeritaItem from '@/components/BeritaItem';
import useAxios from '@/hooks/useAxios';
import ErrorBoundary from '@/components/ErrorBoundary';
import FetchedData from '@/components/FetchedData';

function BeritaTerbaru() {

    const { data, loading, error } = useAxios({ url: 'berita?paginate=3' });

    return (
    	<div className="md:flex-8 lg:flex-9 px-8 py-10 lg:px-8 xl:px-24 xl:py-10 bg-gray-200">
    		<div className="text-2xl my-3 font-open">Berita</div>
            {
                <FetchedData error={ error } loading={ loading }>
                    <div className='animated fadeInUp'> 
                        {
                            data.data && data.data.map(item => (
                                <BeritaItem
                                    key={ item.id }
                                    judul={ item.judul }
                                    isi={ item.isi }
                                />
                            ))  
                        }
                    </div>
                </FetchedData>
            }   
    	</div>
    );
}

export default BeritaTerbaru;