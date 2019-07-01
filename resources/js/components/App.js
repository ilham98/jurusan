import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import 'animate.css/animate.min.css';
import './AppOutput.css';
import 'rc-time-picker/assets/index.css';
import './custom.css';
import { initialState, AuthContext } from '@/contexts/auth-context';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Cookies from 'js-cookie';

function App() {
	const [ auth, setAuth ] = useState(initialState);
	const signin = data => {
		setAuth(a => ({ ...a, ...data, authenticated: true }));
	}
	const signout = () => {
		Cookies.remove('role');
		Cookies.remove('access_token');
		Cookies.remove('authenticated');
		setAuth({ authenticated: false });	
	}
    return (
    	<AuthContext.Provider value={{ ...auth, signin, signout }}>
	    	<BrowserRouter>
	    		<Routes />
	      	</BrowserRouter>
      	</AuthContext.Provider>
    );
}

export default App;
