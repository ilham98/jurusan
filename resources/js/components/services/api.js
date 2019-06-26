import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://jurusan-api.herokuapp.com/api/v1' : 'http://127.0.0.1:8000/api/v1';

const api = {
	berita: {
		index: ({ paginate = 10 }) => axios.get(`${BASE_URL}/berita?paginate=${ paginate }`),
		store: body => axios.post(`${BASE_URL}/berita`, body),
	},
	jadwal: {
		index: ({ tahun_angkatan, semester, tahun, kelas }) => axios.get(`${BASE_URL}/jadwal?tahun_angkatan=${tahun_angkatan}&semester=${semester}&tahun=${tahun}&kelas=${kelas}`),
		store: body => axios.post(`${BASE_URL}/jadwal`, body),
		destroy: id => axios.delete(`${BASE_URL}/jadwal/${id}`)
	},
	hari: {
		jadwal: {
			index: ({ tahun_angkatan, semester, tahun, kelas }) => axios.get(`${BASE_URL}/hari/jadwal?tahun_angkatan=${tahun_angkatan}&semester=${semester}&tahun=${tahun}&kelas=${kelas}`)
		}
	}
};

export default api;