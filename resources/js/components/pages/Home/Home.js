import React, { useEffect } from 'react';
import BeritaTerbaru from './BeritaTerbaru';
import Agenda from './Agenda';
import Navbar from '@/components/Navbar';

function Home() {

	useEffect(() => {
		document.title = 'Home';
	});

    return (
    	<div>
    		<Navbar />
			<div className="md:flex mt-20">
				<BeritaTerbaru />
				<Agenda />
			</div>
      	</div>
    );
}

export default Home;
