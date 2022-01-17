import React, { useState } from 'react';
import axiosInstance from '../../axios';

export default function Login() {
	
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();		
		
		axiosInstance.post(`token/`, {
			email: formData.email,
			password: formData.password,
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access);
			localStorage.setItem('refresh_token', res.data.refresh);
			axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');				
			window.location.href = `/`
		});			
	};

	return (
	    	<React.Fragment>
        	    <div className='container'>
               		<div className='col' style={{maxWidth:'30rem'}}>
			    <h1>Login</h1>

			    <form>
				<div class='form-group'>
				    <label>Email address</label>
				    <input type="email" className='form-control' required id="email" name="email" autoComplete="email" onChange={handleChange} />
				</div>                        
				<div class='form-group'>
				    <label>Password</label>
				    <input type="password" className='form-control' required id="password" name="password" autoComplete="password" onChange={handleChange} />
				</div>
				<button type="submit" class="btn btn-primary mt-4" onClick={handleSubmit}>Login</button>                    
			    </form>
					
			</div>
		    </div>
	    	</React.Fragment>
	);

}
