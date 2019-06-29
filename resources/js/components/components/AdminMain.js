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

	function toggle() {
		setOpen(o => !o);
	}

	const { signout } = useContext(AuthContext);
	return (
		<div className='flex'>
			<div className={ `bg-white shadow-lg ${ !open && 'hidden' } h-screen ${ !open ? 'md:block' : 'md:hidden' } fixed md:static flex-1 w-full`} style={{ minWidth: 250 }}>
				<div className='my-5 mx-10'>
					Welcome Admin
				</div>
				<div className='flex flex-col'>
					<Item name='Dashboard' to='/a/dashboard' icon='fas fa-tachometer-alt'/>
					<Item name='Berita' to='/a/berita' icon='fas fa-newspaper'/>
					<Item name='Jadwal' to='/a/jadwal' icon='fas fa-calendar' />
					<Item name='Agenda' to='/a/agenda' icon='fas fa-calendar' />
					<Item name='Visi & Misi' to='/a/visi-misi' icon='fas fa-calendar' />
					<div className='flex justify-center mt-5'>
						<button onClick={ () => signout() } className='border rounded border-orange-500 text-orange-600 px-2 py-1'>
							Logout <i className='fas fa-sign-out-alt' />
						</button>
					</div>
				</div>
			</div>
			<div className='flex-4'>
				<div><button><i className='p-3 fas fa-bars' onClick={ toggle } /></button></div>
				<div className='bg-gray-300 shadow'>
					<div className='text-2xl px-5 py-3 bg-blue-400 text-white'>{ props.title }</div>
					<div className='bg-gray-100 p-2 md:px-10 md:py-10' style={{ height: 'calc(100vh - 100px)', overflowY: 'scroll' }}>
						{ props.children }
					</div>
				</div>
			</div>
		</div>
	);
}

AdminMain.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired
}

export default AdminMain;