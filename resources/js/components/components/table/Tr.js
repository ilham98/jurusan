import React from 'react';
import PropTypes from 'prop-types';

function Tr(props) {
	return (
		<tr className={ props.className }>
			{ props.children }
		</tr>
	)
}

Tr.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
};

export default Tr;

