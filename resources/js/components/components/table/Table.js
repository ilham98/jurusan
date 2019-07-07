import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
	return (
		<div className='overflow-x-scroll'>
			<table className='w-full'>
				{ props.children }
			</table>
		</div>
	)
}

Table.propTypes = {
	children: PropTypes.node
};

export default Table;

