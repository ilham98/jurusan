import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import generateUrl from '@/helper/generateUrl';
import moment from 'moment';

function AgendaItem({ judul, tanggal }) {
    return (
        <div className='bg-gray-200 w-full py-3 text-gray-900'>
            <div>{ judul }</div>
            <div className='text-sm'>{ tanggal }</div>
        </div>
    );
}

AgendaItem.propTypes = {
    judul: PropTypes.string,
    tanggal: PropTypes.string
}

function Agenda() {
    const [ loading, setLoading ] = useState(true);
    const [ agenda, setAgenda ] = useState([]);

     function convertDate(t) {
        return moment(t).locale('id').format("Do MMMM YYYY"); 
    }

    function fetchAgenda() {
        axios.get(generateUrl('agenda?paginate=3'))
            .then(res => {
                setAgenda(res.data.data);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchAgenda()
    }, []);

    return (
        <div className="md:flex-4 lg:flex-3 py-10 px-10 agenda text-center">
            <div className="text-2xl my-3 mx-5 px-8 py-3 font-open bg-gray-200 border-blue-500 border-t-4  shadow">Agenda</div>
            <div className="mt-3 bg-white shadow text-white mx-5">
                {

                    !loading && (
                        <Fragment>
                            {
                                agenda.map(a => (
                                    <AgendaItem key={ a.id } judul={ a.nama } tanggal={ convertDate(a.tanggal) } /> 
                                ))
                            }
                        </Fragment>
                    )
                }
            </div>
        </div>
    );
}

export default Agenda;