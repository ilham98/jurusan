import React from 'react';
import PropTypes from 'prop-types';

function InputText(props) {
	const { wfull } = props;
	return (
		<textarea {...props} className={ `${wfull ? 'w-full' : ''} px-3 py-2 appearance-none border rounded inline text-gray-700 leading-tight focus:outline-none focus:shadow-outline` }>
			{ props.children }
		</textarea>
	)

};

InputText.propTypes = {
	children: PropTypes.node,
	wfull: PropTypes.bool
}

export default InputText;
