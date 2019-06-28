import React from 'react';
import PropTypes from 'prop-types';

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
    return (
        <div className="md:flex-4 lg:flex-3 py-10 px-10 agenda text-center">
            <div className="text-2xl my-3 mx-5 px-8 py-3 font-open bg-gray-200 border-blue-500 border-t-4  shadow">Agenda</div>
            <div className="mt-3 bg-white shadow text-white mx-5">
                <AgendaItem judul='Upacara Bendera' tanggal='20-05-2015' />
            </div>
        </div>
    );
}

export default Agenda;