import React from 'react';

function EditButton(props) {
	return (
		<i className='text-blue-500 cursor-pointer fas fa-edit' { ...props } />
	);
}

export default EditButton;