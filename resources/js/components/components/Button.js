import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
	let color = 'white';
	let bgColor = 'blue-500';
	let bgColorHovered = 'blue-600';
	switch(props.color) {
		case 'primary':
			color = 'white';
			bgColor = 'blue-500'; 
			bgColorHovered = 'blue-600';
			break;
		case 'secondary':
			color = 'white';
			bgColor = 'orange-500'; 
			bgColorHovered = 'orange-600';
			break;
		default:
			color = 'white';
			bgColor = 'blue-500';
			bgColorHovered = 'blue-600';
	} 
	return (
		<button { ...props } className={ `bg-${ bgColor } mx-2 block hover:bg-${ bgColorHovered } text-${ color } py-2 px-4 rounded ${ props.disabled && 'cursor-not-allowed' }` }>
		  { props.text }
		</button>
	);
};

Button.propTypes = {
	color: PropTypes.string,
	text: PropTypes.string,
	disabled: PropTypes.bool
}

export default Button;