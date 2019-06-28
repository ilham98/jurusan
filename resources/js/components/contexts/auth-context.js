import { createContext } from 'react';
import Cookies from 'js-cookie';

export const initialState = {
	authenticated: parseInt(Cookies.get('authenticated')) === 1 ? true : false,
	role: Cookies.get('role'),
	nidn: Cookies.get('user_id')
}

export const AuthContext = createContext();