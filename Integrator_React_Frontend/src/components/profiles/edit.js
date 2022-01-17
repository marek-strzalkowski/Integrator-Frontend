import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProfile() {

    const navigate = useNavigate();
    const { id } = useParams();
    const initialFormData = Object.freeze({
        id: '',
	about: '',
        location: '',		
    });
    const [formData, updateFormData] = useState(initialFormData);
    const [data, setData] = useState({ locationOptions: [] });

    useEffect(() => {
	axiosInstance.get(`locations/short/`).then((res) => {
		setData({ locationOptions: res.data });			
	});
    }, [setData]);

    useEffect(() => {
	axiosInstance.get(`user/edit/${id}`).then((res) => {
	    if (res.data.is_me === false) {
                window.location.href = '/';
            }            
            updateFormData({
		...formData,                
		['about']: res.data.about,
                ['location']: res.data.location,
	    });		            
	});
    }, [updateFormData]);

    const handleChange = (e) => {
	updateFormData({
		...formData,			
		[e.target.name]: e.target.value,
	});
    };

    const handleSubmit = (e) => {
	e.preventDefault();		

	axiosInstance.put(`user/edit/${id}/`, {
            about: formData.about.trim(),
            location: formData.location,
        })
        .then((res) => {
            navigate(`../profile/${id}/`);
        });
    };

	return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>  
                    <div className='col'>
                        <div className='card mt-2 mb-4 p-3 bg-light'>
                            <h1>Edit Profile {formData.first_name}</h1>

                            <form>                                           
                                <div class='form-group'>
                                    <label>About</label>
                                    <textarea className='form-control' id="about" name="about" value={formData.about} autoComplete="about" onChange={handleChange} />
                                </div>
                                <div class='form-group'>
                                    <label>Location</label>                            
                                    <select className='form-control' id="location" name="location"  value={formData.location} autoComplete="location" onChange={handleChange}>
                                        <option>Choose Location</option>
                                        {data.locationOptions.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>                        
                                <button type="submit" class="btn btn-primary mt-4" onClick={handleSubmit}>Change</button>                        
                            </form>                    
                            
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
	);

}
