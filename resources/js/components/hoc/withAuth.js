import React, { useContext } from 'react';
import { AuthContext } from '@/contexts/auth-context';
import { Redirect } from 'react-router-dom';

function withAuth(Component, _role) {
	function _Component() {
		const { authenticated, role } = useContext(AuthContext);
		if(!authenticated) {
			return <Redirect to='/login' />
		}
		if(role !== _role)
			return <Redirect to='/' />
		return (
			<AuthContext.Consumer>
			{ 
				() => {
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