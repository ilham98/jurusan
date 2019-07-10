import React from 'react';
import PropTypes from 'prop-types';

function InputSelect(props) {
	const { error, width } = props;
	return (
		<select {...props} 
			className={`px-3 py-2 border border-gray-300 rounded block w-full sm:w-auto text-gray-700 leading-tight focus:outline-none bg-white focus:shadow-outline ${ error && 'border-red-500' } w-${ width }`}
		>
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
