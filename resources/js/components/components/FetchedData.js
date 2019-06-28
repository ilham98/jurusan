import React from 'react';
import Loading from '@/components/Loading';
import PropTypes from 'prop-types';

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

FetchedData.propTypes = {
	loading: PropTypes.bool,
	error: PropTypes.bool,
	children: PropTypes.array
}

export default FetchedData;