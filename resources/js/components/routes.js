import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from '@/hoc/withAuth';
import Login from './pages/Auth/Login';

import Home from './pages/Home/Home';
import BeritaSingle from './pages/BeritaSingle/BeritaSingle';
import Jadwal from './pages/Jadwal/Jadwal';
import Modul from './pages/Modul/Modul';

import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminBerita from './pages/Admin/AdminBerita/AdminBerita';
import AdminJadwal from './pages/Admin/AdminJadwal/AdminJadwal';
import AdminAgenda from './pages/Admin/AdminAgenda/AdminAgenda';
import AdminWaktu from './pages/Admin/AdminWaktu/AdminWaktu';
import AdminMataKuliah from './pages/Admin/AdminMataKuliah/AdminMataKuliah';
import AdminDosen from './pages/Admin/AdminDosen/AdminDosen';

import DosenModul from './pages/Dosen/DosenModul/DosenModul';

function Routes() {
	return (
		<Switch>
			<Route path='/login' component={ Login } />

			<Route path='/' exact component={ Home } />
			<Route path='/berita/:id' exact component={ BeritaSingle } />
			<Route path='/jadwal' exact component={ Jadwal } />
			<Route path='/modul' exact component={ Modul } />

			<Route path='/a/dashboard' component={ AdminDashboard } />
			<Route path='/a/berita' component={ AdminBerita } />
			<Route path='/a/jadwal' component={ withAuth(AdminJadwal, 'admin') } />
			<Route path='/a/agenda' component={ withAuth(AdminAgenda, 'admin') } />
			<Route path='/a/waktu' component={ withAuth(AdminWaktu, 'admin') } />
			<Route path='/a/mata-kuliah' component={ withAuth(AdminMataKuliah, 'admin') } />
			<Route path='/a/dosen' component={ withAuth(AdminDosen, 'admin') } />

			<Route path='/t/modul' component={ withAuth(DosenModul, 'dosen') } />
		</Switch>
	);
};

export default Routes;