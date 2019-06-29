import React from 'react';
import PropTypes from 'prop-types';

function Tbody(props) {
	return (
		<tbody className='text-center'>
			{ props.children }
		</tbody>
	)
}

Tbody.propTypes = {
	children: PropTypes.node
};

export default Tbody;

