import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {

	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		name: '',
		start: '',
        end: '',
        info: '',
        location: '',		
        address: '',
	});
	const [formData, updateFormData] = useState(initialFormData);    
    const [data, setData] = useState({ locationOptions: [] });

    useEffect(() => {
		axiosInstance.get(`locations/short/`).then((res) => {
			setData({ locationOptions: res.data });			
		});
	}, [setData]);

	const handleChange = (e) => {
		updateFormData({
			...formData,			
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		axiosInstance.post(`events/create/`, {
            name: formData.name.trim(),
            start: formData.start,
            end: formData.end,
            info: formData.info.trim(),
            location: formData.location,
            address: formData.address.trim(),
        })
        .then((res) => {
            navigate('/');
        });
	};

	return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>  
                    <div className='col'>
                        <div className='card mt-2 mb-4 p-3 bg-light'>
                            <h1>Create Event</h1>

                            <form>
                                <div class='form-group'>
                                    <label>Event name</label>
                                    <input type="name" className='form-control' required id="email" name="name" autoComplete="name" onChange={handleChange} />
                                </div>
                                <div class='form-group'>
                                    <label>Start date and time</label>
                                    <input type="datetime-local" className='form-control' required id="start" name="start" autoComplete="start" onChange={handleChange} />                            
                                </div>                
                                <div class='form-group'>
                                    <label>Finish date and time</label>
                                    <input type="datetime-local" className='form-control' required id="end" name="end" autoComplete="end" onChange={handleChange} />
                                </div>
                                <div class='form-group'>
                                    <label>Info</label>
                                    <textarea className='form-control' required id="info" name="info" autoComplete="info" onChange={handleChange} />
                                </div>
                                <div class='form-group'>
                                    <label>Location</label>
                                    <select className='form-control' required id="location" name="location" autoComplete="location" onChange={handleChange}>
                                        <option>Choose Location</option>
                                        {data.locationOptions.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div class='form-group'>
                                    <label>Address</label>
                                    <textarea className='form-control' required id="address" name="address" autoComplete="address" onChange={handleChange} />
                                </div>
                                <button type="submit" class="btn btn-success mt-4" onClick={handleSubmit}>Create</button>                    
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>            
        </React.Fragment>
	);

}