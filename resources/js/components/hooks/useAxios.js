import { useState, useEffect } from 'react';
import axios, { CancelToken } from 'axios';
import { BASE_API_URL } from '@/config';

function useAxios({ url, method, body = {}, onSuccess = () => console.log('success'), onFail = () => console.log('failed') }) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const source = CancelToken.source();
	function refetch() {
		Object.assign(body, { cancelToken: source.token });
		let a = axios.get;
		switch(method) {
			case 'get':
				a = axios.get;
				break;
			case 'post':
				a = axios.post;
				break;
			default: a = axios.get;
		}
		setError(false);
		setLoading(true);
		a('/api/v1/'+url, body)
				.then(res => {
				setData(res.data);
				setLoading(false);
				setError(false);
			}).catch(thrown => {
				if(axios.isCancel(thrown)) {
				} else {
					setData([]);
					setError(true);
					setLoading(false);
				}
			});
	}

	useEffect(() => {
		refetch();
		return () => {
				source.cancel();
			}

	}, []);

	return { data, loading, error, refetch};
}

export default useAxios;