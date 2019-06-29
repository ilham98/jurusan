import React from 'react';
import PropTypes from 'prop-types';

function Th(props) {
	return (
		<th className='py-3 px-2 align-left'>
			{ props.children }
		</th>
	)
}

Th.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
};

export default Th;

