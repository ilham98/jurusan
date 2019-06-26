import React from 'react';
import Loading from '@/components/Loading';

function FetchedData(props) {
	const { loading, error, children } = props;
	return (
		loading ?
	    <Loading /> :
	        (
	            error ? (
	                <div>Something Went Wrong :(</div>
	            ) : children
	        )
	)
}

export default FetchedData;