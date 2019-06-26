import React, { Fragment, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '@/contexts/auth-context';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function withAuth(Component, _role) {
	function _Component(props) {
		const initialMount = useRef(true);
		const { authenticated, role, signin } = useContext(AuthContext);
		if(!authenticated) {
			return <Redirect to='/login' />
		}
		if(role !== _role)
			return <Redirect to='/' />
		return (
			<AuthContext.Consumer>
			{ 
				value => {
					return(
						<Component />
					)
				}
			}
			</AuthContext.Consumer>
		)
	}

	return _Component;
}

export default withAuth;