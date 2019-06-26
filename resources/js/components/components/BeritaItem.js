import React from 'react';
import { Link } from 'react-router-dom';

function Berita({ judul,isi }) { 
    return  (
        	<div className="rounded border-t-4 sm:border-l-4 sm:border-t-0 border-orange-500 bg-white shadow-lg mb-6">
                <div className="flex flex-col-reverse md:flex-row justify-between items-start">
                	<div className="flex-1 w-full px-6 md:py-6 overflow-hidden text-xl">
                		{ judul }
                	</div>
                	<div className="flex-auto flex w-auto xl:w-auto m-6 justify-center xl:justify-end">
                		<div className="text-red-600 font-bold text-sm"><i className="md:hidden fas fa-calendar-alt mr-1"></i> 20 April 2019</div>
                	</div>
                </div>
                <div className="m-6 text-gray-700 leading-relaxed">
                	{ isi } 
                </div>
                <div className="mt-4 py-3 pt-20 px-8 flex justify-end berita-list-item bg-white rounder-br">
                	<Link to='/berita/1' className="absolute bottom-0 right-0 z-10 mx-8 my-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
                      Read More
                    </Link>
                </div>
            </div>
        );
};

export default Berita;