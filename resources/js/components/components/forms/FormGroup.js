import React from 'react';
import PropTypes from 'prop-types'

function FormGroup(props) {

	const { flex } = props;

	function align() {
		if(props.align === 'right')
			return 'flex justify-end';
	}

	return (
		<div className={ `p-2 sm:p-3 ${ align() }`}>
			{ props.children }
		</div>
	);
}

FormGroup.propTypes = {
	flex: PropTypes.string,
	align: PropTypes.string,
	children: PropTypes.node	
}

export default FormGroup;