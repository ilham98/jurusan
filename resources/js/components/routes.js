import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from '@/hoc/withAuth';
import Login from './pages/Auth/Login';

import Home from './pages/Home/Home';
import Berita from './pages/Berita/Berita';
import BeritaSingle from './pages/BeritaSingle/BeritaSingle';
import Jadwal from './pages/Jadwal/Jadwal';
import Modul from './pages/Modul/Modul';

import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import ListBerita from './pages/Admin/AdminBerita/ListBerita/ListBerita';
import TambahBerita from './pages/Admin/AdminBerita/TambahBerita/TambahBerita';
import EditBerita from './pages/Admin/AdminBerita/EditBerita/EditBerita';
import AdminJadwal from './pages/Admin/AdminJadwal/AdminJadwal';
import AdminAgenda from './pages/Admin/AdminAgenda/AdminAgenda';
import AdminWaktu from './pages/Admin/AdminWaktu/AdminWaktu';
import AdminMataKuliah from './pages/Admin/AdminMataKuliah/AdminMataKuliah';
import AdminDosen from './pages/Admin/AdminDosen/AdminDosen';
import AdminProfil from './pages/Admin/AdminProfil/AdminProfil';
import AdminEditProfil from './pages/Admin/AdminProfil/AdminEditProfil';

import DosenModul from './pages/Dosen/DosenModul/DosenModul';

function Routes() {
	return (
		<Switch>
			<Route path='/login' component={ Login } />

			<Route path='/' exact component={ Home } />
			<Route path='/berita' exact component={ Berita } />
			<Route path='/berita/:id' exact component={ BeritaSingle } />
			<Route path='/jadwal' exact component={ Jadwal } />
			<Route path='/modul' exact component={ Modul } />

			<Route path='/a/dashboard' component={ AdminDashboard } />
			<Route path='/a/berita' exact component={ ListBerita } />
			<Route path='/a/berita/tambah' component={ TambahBerita } />

			<Route path='/a/berita/:id/edit' component={ EditBerita } />

			<Route path='/a/jadwal' component={ withAuth(AdminJadwal, 'admin') } />
			<Route path='/a/agenda' component={ withAuth(AdminAgenda, 'admin') } />
			<Route path='/a/waktu' component={ withAuth(AdminWaktu, 'admin') } />
			<Route path='/a/mata-kuliah' component={ withAuth(AdminMataKuliah, 'admin') } />
			<Route path='/a/dosen' component={ withAuth(AdminDosen, 'admin') } />
			<Route path='/a/profil' exact component={ withAuth(AdminProfil, 'admin') } />
			<Route path='/a/profil/edit' component={ withAuth(AdminEditProfil, 'admin') } />
			<Route path='/t/modul' component={ withAuth(DosenModul, 'dosen') } />
		</Switch>
	);
};

export default Routes;