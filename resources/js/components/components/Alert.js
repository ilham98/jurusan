import React, { useEffect } from 'react';

function Alert(props) {
	
	useEffect(() => {
		
	});

	if(!props.open)
		return null;
	return (
		<div className={ `${!props.open ? 'hidden' : 'a'} overflow-auto` }>
			<div>
				Success
			</div>
		</div>
	);
}

export default Alert;