import React from 'react';
import PropTypes from 'prop-types';

function Td(props) {
	return (
		<td { ...props } className='p-2 whitespace-no-wrap'>
			{ props.children }
		</td>
	)
}

Td.propTypes = {
	children: PropTypes.node
};

export default Td;

