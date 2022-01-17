import { useEffect } from 'react';
import axiosInstance from '../../axios';

export default function Logout() {
	
	useEffect(() => {
		axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;		
		window.location.href = `/login`
	});

	return null

}