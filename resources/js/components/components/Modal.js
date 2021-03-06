import React from 'react';
import ReactDom from 'react-dom';

const modalRoot = document.getElementById('root-modal');

function Modal(props) {
	const handleClick = e => {
		if(e.target.id === 'modal-wrapper') {
			props.handleClose();
		}
	};

	if(!props.isOpen)
		return <span />;

	return ReactDom.createPortal(
		<div className={ `${!props.isOpen ? 'hidden' : 'a'} overflow-auto` }>
			<div onClick={ handleClick  } id='modal-wrapper' className='fixed h-full  w-full top-0 left-0 flex justify-center items-center' style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}>
				<div className='rounded m-10 border-blue-500 border-b-4 bg-gray-200 animated fadeInUp faster overflow-auto' style={{ minWidth: 300, maxHeight: '90vh'  }}>
					<div className='py-3 px-10 text-center bg-blue-500 text-white shadow font-bold'>
						{ props.title }
					</div>
					<div className='p-3 overflow-auto'>
						{ props.children }
					</div>
				</div>
			</div>
		</div>,
		modalRoot
	);
}

export default Modal;