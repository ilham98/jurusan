import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
	return (
		<table className='w-full'>
			{ props.children }
		</table>
	)
}

Table.propTypes = {
	children: PropTypes.node
};

export default Table;

