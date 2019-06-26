import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';

function BeritaSingle() {

	useEffect(() => {
		document.title = 'mantap gan';
	});

    return (
    	<div>
			<Navbar />
			<div className="md:flex mt-20">
				<div className='py-10 px-10 sm:px-32 lg:px-64'>
					<div className="px-10 shadow bg-white  py-10 sm:py-10 sm:px-20">
						<div className="flex flex-col-reverse xl:flex-row justify-between items-start">
							<div className="flex-initial my-2 mx-3 text-gray-900 text-xl font-open">
								Polnes Juara 1 bla bla Polnes Juara 1 bla bla Polnes Juara 1 bla bla
							</div>
							<div className='flex w-full xl:w-auto flex-auto justify-center xl:justify-end'>
								<div className='my-2 mx-3 text-sm bg-red-500 whitespace-no-wrap px-3 text-white font-bold rounded-full py-1'>20 April 2018</div>
							</div>
						</div>
						<div className='my-2 mx-3 leading-relaxed text-gray-800 border-l-5 border-blue-500'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
						</div>
					</div>
		      	</div>
			</div>
      	</div>
    );
}

export default BeritaSingle;
