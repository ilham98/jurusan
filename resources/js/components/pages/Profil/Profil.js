import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import generateUrl from '@/helper/generateUrl';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function Card(props) {

    const { title, body } = props;

    return (
        <div className='p-3 my-3 shadow bg-white'>
            <div className='px-5 text-white py-1 bg-blue-500 rounded inline-block text-white'>{ title }</div>
            <div className={ `${ title === 'Visi' ? 'mx-1' : 'mx-5' } my-3` } dangerouslySetInnerHTML={{ __html: body }} />
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string
}
 
function Profil(props) {

    const [ profil, setProfil ] = useState({ data: [] });
    const [ loading, setLoading ] = useState(true);

    function fetchProfil() {
        setLoading(true);
        axios.get(generateUrl('profil'))
            .then(res => {
                setProfil(res.data);
                setLoading(false);
            }).catch(() => {
                
            });
    }

    useEffect(() => {
        fetchProfil();
    }, [profil.data])

    return (
        <div>
            <Navbar />
        	<div className="md:flex-8 mt-20 lg:flex-9 px-8 py-1 lg:px-8 xl:px-64 xl:py-10 bg-gray-200">
        		<div className="text-2xl my-3 font-open">Profil Jurusan</div>
                {
                    loading ? ( 
                                <Loading />
                            ) : (
                                <div className='sm:flex flex-col items-start'>
                                    <Card title='Visi' body={ profil.visi } />
                                    <Card title='Misi' body={ profil.misi } />
                                </div>
                            )
                }
        	</div>
        </div>
    );
}

export default withRouter(Profil);