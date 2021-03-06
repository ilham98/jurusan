import React from 'react';
import PropTypes from 'prop-types';

function PaginationButton(props) {
	const { type, disabled } = props;
	return (
		<button { ...props } className={ `${ disabled && 'cursor-not-allowed' } ${ type === 'left' && 'mr-2'} hover:bg-green-300 text-green-800 h-8 w-8 rounded-full text-sm bg-green-200` }><i className={ `fas fa-arrow-${ type === 'right' ? 'right' : 'left' }` } /></button>
	)
}

PaginationButton.propTypes = {
	type: PropTypes.string,
	disabled: PropTypes.bool
}

export default PaginationButton;