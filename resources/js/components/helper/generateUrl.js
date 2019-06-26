import { BASE_API_URL } from '@/config';

function generateUrl(url) {
	return `${BASE_API_URL}/${url}`;
}

export default generateUrl;