import { Link, withRouter } from 'react-router-dom';
import Logo from '../assets/img/logo.webp';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

let Item = ({ location, path, text, handleClose }) => {
  const current_path = location.pathname;
  return (
    <div onClick={ handleClose } className='lg:flex lg:items-stretch lg:justify-end ml-auto'>
      <Link to={ path } className={`${current_path !== path && 'text-gray-600'} flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal no-underline flex items-center hover:bg-grey-dark`}>{ text }</Link>
    </div>
  )
}

Item.propTypes = {
  location: PropTypes.object,
  path: PropTypes.string,
  text: PropTypes.string,
  handleClose: PropTypes.func
}

Item = withRouter(Item);

function Navbar() {
  const [ open, setOpen ] = useState(false);

  return (
    <nav style={{ transition: 'background-color 0.5s' }} className={ `z-50 font-open fixed shadow-md select-none h-20 bg-white top-0 justify-between lg:flex lg:px-20 lg:items-stretch w-full` }>
      <div className='flex flex-no-shrink items-stretch p-3'>  
        <img alt='logo' src={ Logo } className='flex-no-grow flex-no-shrink relative h-12 leading-normal flex items-center' />
        <Link to='/' className='flex-no-grow flex-no-shrink relative ml-3 font-bold leading-normal text-gray-900 no-underline flex items-center hover:bg-grey-dark'>Teknologi <br className='block md:hidden' /> Informasi</Link>
        <button className='block lg:hidden cursor-pointer ml-auto relative w-12 h-12 p-4'>
          <svg onClick={ () => setOpen(true) } className='fill-current text-black' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'/></svg>
        </button> 
      </div>
      <div className={ `justify-end lg:flex ${open ? 'block' : 'hidden'} p-5 justify-end absolute lg:static top-0 left-0 w-full lg:w-auto bg-white h-screen lg:h-auto` }>
        <div className='flex justify-end w-full block lg:hidden'><button className='p-2' onClick={ () => setOpen(false) }><i className='fas fa-times'/></button></div>
        <Item path='/' text='Beranda' />
        <Item path='/profil' text='Profil Jurusan' />
        <Item path='/berita' text='Berita' />
        <Item path='/jadwal' text='Jadwal' />
        <Item path='/modul' text='Modul' />
        <Item path='/login' text='Login' />
      </div>
    </nav>
  )
}

export default withRouter(Navbar);