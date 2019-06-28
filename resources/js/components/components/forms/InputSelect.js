import React from 'react';
import PropTypes from 'prop-types';

function InputSelect(props) {
	const { error, width } = props;
	return (
		<select {...props} className={`px-3 py-2 shadow border rounded inline text-gray-700 leading-tight focus:outline-none bg-white focus:shadow-outline ${ error && 'border-red-500' } w-${ width }`}>
			{ props.children }
		</select>
	)
};

InputSelect.propTypes = {
	error: PropTypes.string,
	width: PropTypes.string,
	children: PropTypes.array
}

export default InputSelect;
