import React from 'react';

function FormGroup(props) {

	const { flex } = props;

	function align() {
		if(props.align === 'right')
			return 'flex justify-end';
	}

	return (
		<div className={ `p-3 ${ align() } flex-${flex}`}>
			{ props.children }
		</div>
	);
}

export default FormGroup;