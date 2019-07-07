import React, { useState, useEffect } from 'react';
import BeritaItem from '@/components/BeritaItem';
import axios from 'axios';
import PaginationButton from '@/components/PaginationButton';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import generateUrl from '@/helper/generateUrl';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function Berita(props) {

    const [ berita, setBerita ] = useState({ data: [] });
    const [ loading, setLoading ] = useState(true);
    const query = queryString.parse(props.location.search);
    const page = query.page ? parseInt(query.page) : 1;

    function fetchBerita(body) {
        setLoading(true);
        axios.get(generateUrl('berita?paginate=5&page='+page), body)
            .then(res => {
                setBerita(res.data);
                setLoading(false);
            }).catch(() => {
                props.history.push('/');
            });
    }

    useEffect(() => {
        fetchBerita();
    }, [page])

    function nextClickHandler() {
        props.history.push('/berita?page='+(page+1));
    }

    function prevClickHandler() {
        props.history.push('/berita?page='+(page-1));
    }

    useEffect(() => {
        document.title = 'Admin | Berita';
        fetchBerita();
        sessionStorage.setItem("draftail:content", null);
    }, [])

    const { prev_page_url, next_page_url } = berita;

    return (
        <div>
            <Navbar />
        	<div className="md:flex-8 mt-20 lg:flex-9 px-8 py-10 lg:px-8 xl:px-24 xl:py-10 bg-gray-200">
        		<div className="text-2xl my-3 font-open">Berita</div>
                {
                    loading ? ( 
                                <Loading />
                            ) : (
                                <div>
                                    <div className='p-3 my-3 flex justify-end'>
                                        <PaginationButton disabled={ loading || !prev_page_url } type='left' onClick={ prevClickHandler } />
                                        <PaginationButton disabled={ loading || !next_page_url } type='right' onClick = { nextClickHandler } />
                                    </div>
                                    <div className='animated fadeInUp'>
                                    {
                                        <div> 
                                            {
                                                berita.data.map(item => (
                                                    <BeritaItem
                                                        key={ item.id }
                                                        id={ item.id }
                                                        judul={ item.judul }
                                                        isi={ item.isi }
                                                    />
                                                ))  
                                            }
                                        </div>
                                    }
                                    </div>
                                </div>
                            )
                }
        	</div>
        </div>
    );
}

Berita.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object
}

export default withRouter(Berita);