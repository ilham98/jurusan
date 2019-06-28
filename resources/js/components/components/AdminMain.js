import React, { useContext, useState } from 'react';
import { AuthContext } from '@/contexts/auth-context';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

let Item = ({ name, to, location, icon }) => {
	const path = location.pathname;
	return (
		<Link className={ `text-gray-800 ${ to === path && 'text-gray-900 font-bold border-b-2 bg-orange-300 border-orange-500' } py-2 px-10 mt-1` } to={ to }>{ name } <i className={ `text-gray-700 ml-2 ${ to === path && 'text-orange-700' } ${icon}` }></i></Link>
	);
};

Item.propTypes = {
	name: PropTypes.string,
	to: PropTypes.string,
	location: PropTypes.object,
	icon: PropTypes.string
};

Item = withRouter(Item);

function AdminMain(props) {

	const [open, setOpen] = useState(false);

	const { signout } = useContext(AuthContext);
	return (
		<div className='flex'>
			<div className='bg-white hidden md:block h-screen fixed md:static flex-1 w-full' style={{ minWidth: 250 }}>
				<div className='my-5 mx-10'>
					Welcome Admin
				</div>
				<div className='flex flex-col'>
					<Item name='Dashboard' to='/a/dashboard' icon='fas fa-tachometer-alt'/>
					<Item name='Berita' to='/a/berita' icon='fas fa-newspaper'/>
					<Item name='Jadwal' to='/a/jadwal' icon='fas fa-calendar' />
					<button onClick={ () => signout() }>Logout</button>
				</div>
			</div>
			<div className={ `flex-4 ${ open && 'mantap' }` }>
				<div><button><i className='p-3 fas fa-bars' onClick={ () => setOpen(true) } /></button></div>
				<div className='p-5 bg-gray-300 shadow-lg agenda shadow-lg'>
					<div className='text-2xl p-10 bg-blue-500 text-white'>{ props.title }</div>
					<div className='bg-white px-10 py-10' style={{ maxHeight: '75vh', overflowY: 'scroll' }}>
						{ props.children }
					</div>
				</div>
			</div>
		</div>
	);
}

AdminMain.propTypes = {
	title: PropTypes.string,
	children: PropTypes.array
}

export default AdminMain;