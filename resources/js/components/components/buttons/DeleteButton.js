import React from 'react';

function DeleteButton(props) {
	return (
		<i className='ml-2 text-red-500 cursor-pointer fas fa-trash' { ...props } />
	);
}

export default DeleteButton;