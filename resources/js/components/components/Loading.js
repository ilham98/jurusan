import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

function Loading() {
	return (
		<div className='h-48 flex justify-center items-center'>
			<SyncLoader 
			  sizeUnit={"px"}
	          size={15}
	          color={'#3182ce'}
			/>
		</div>
	);
}

export default Loading;