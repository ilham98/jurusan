import React from 'react';
import PropTypes from 'prop-types';

function ErrorMessage(props) {
	return (
		<p className='font-md text-red-600'>
			{ props.children }
		</p>
	)
}

ErrorMessage.propTypes = {
	children: PropTypes.node
}

export default ErrorMessage