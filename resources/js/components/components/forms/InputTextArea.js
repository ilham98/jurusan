import React from 'react';
import PropTypes from 'prop-types';

function InputText(props) {
	return (
		<textarea {...props} className='px-3 py-2 appearance-none border rounded inline text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
			{ props.children }
		</textarea>
	)

};

InputText.propTypes = {
	children: PropTypes.node
}

export default InputText;
