import React from 'react';
import PropTypes from 'prop-types';

function Label(props) {
	return (
		<label className='text-sm block my-1'>
			{ props.children }
		</label>
	)
}

Label.propTypes = {
	children: PropTypes.node
}

export default Label