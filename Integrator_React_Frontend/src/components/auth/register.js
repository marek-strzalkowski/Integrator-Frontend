import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
        	firstname: '',
        	lastname: '',
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
		
		axiosInstance.post(`user/register/`, {
		    email: formData.email,
		    user_name: formData.username,
		    first_name: formData.firstname,
		    last_name: formData.lastname,
		    password: formData.password,
		})
		.then((res) => {
		    navigate('/login');
		});
	};

	return (
        <React.Fragment>
            <div className='container'>
                <div className='col'>
                    <h1>Register</h1>
                    
                    <form>
                        <div class='form-group'>
                            <label>Email address</label>
                            <input type="email" className='form-control' required id="email" name="email" autoComplete="email" onChange={handleChange} />
                        </div>
                        <div class='form-group'>
                            <label>Username</label>
                            <input type="text" className='form-control' required id="username" name="username" autoComplete="username" onChange={handleChange} />
                        </div>                
                        <div class='form-group'>
                            <label>First name</label>
                            <input type="text" className='form-control' required id="firstname" name="firstname" autoComplete="firstname" onChange={handleChange} />
                        </div>
                        <div class='form-group'>
                            <label>Last name</label>
                            <input type="text" className='form-control' required id="lastname" name="lastname" autoComplete="lastname" onChange={handleChange} />
                        </div>
                        <div class='form-group'>
                            <label>Password</label>
                            <input type="password" className='form-control' required id="password" name="password" autoComplete="password" onChange={handleChange} />
                        </div>
                        <button type="submit" class="btn btn-primary mt-4" onClick={handleSubmit}>Register</button>                    
                    </form>
                    
                </div>
            </div>
        </React.Fragment>
	);

}
