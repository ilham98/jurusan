import React from 'react';
import PropTypes from 'prop-types';

function Td(props) {
	return (
		<td className='p-2'>
			{ props.children }
		</td>
	)
}

Td.propTypes = {
	children: PropTypes.node
};

export default Td;

