import React from 'react';
import PropTypes from 'prop-types'

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

FormGroup.propTypes = {
	flex: PropTypes.string,
	align: PropTypes.string,
	children: PropTypes.object	
}

export default FormGroup;