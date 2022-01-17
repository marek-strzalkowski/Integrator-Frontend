import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEvent() {

	const navigate = useNavigate();
    	const { id } = useParams();
	const initialFormData = Object.freeze({
		id: '',
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

    	useEffect(() => {
		axiosInstance.get(`events/item/${id}/`).then((res) => {
			if (res.data.is_creator === false) {
                		window.location.href = '/';
            		}  
            		updateFormData({
				...formData,
				['name']: res.data.name,
				['start']: res.data.start_raw,
				['end']: res.data.end_raw,
				['info']: res.data.info,
				['location']: res.data.location[0],
				['address']: res.data.address,
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
		
		axiosInstance.put(`events/edit/${id}/`, {
		    name: formData.name.trim(),
		    start: formData.start,
		    end: formData.end,
		    info: formData.info.trim(),
		    location: formData.location,
		    address: formData.address.trim(),
		})
		.then((res) => {
		    navigate(`../event/${id}/`);
		});
	};

    const handleLink = (e) => {
        e.preventDefault()
        window.location.href = `/event/delete/${id}`
    }
    
	return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>  
                    <div className='col'>
                        <div className='card mt-2 mb-4 p-3 bg-light'>
                            <h1>Edit Event</h1>

                            <form>
                                <div class='form-group'>
                                    <label>Event name</label>
                                    <input type="text" className='form-control' required id="email" name="name" value={formData.name} autoComplete="name" onChange={handleChange} />
                                </div>
                                <div class='form-group'>
                                    <label>Start date and time</label>
                                    <input type="datetime-local" className='form-control' required id="start" value={formData.start.slice(0,-1)} name="start" autoComplete="start" onChange={handleChange} />                            
                                </div>                
                                <div class='form-group'>
                                    <label>Finish date and time</label>
                                    <input type="datetime-local" className='form-control' required id="end" value={formData.end.slice(0,-1)} name="end" autoComplete="end" onChange={handleChange} />
                                </div>
                                <div class='form-group'>
                                    <label>Info</label>
                                    <textarea className='form-control' required id="info" name="info" value={formData.info} autoComplete="info" onChange={handleChange} />
                                </div>
                                <div class='form-group'>
                                    <label>Location</label>                            
                                    <select className='form-control' required id="location" name="location"  value={formData.location} autoComplete="location" onChange={handleChange}>
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
                                    <textarea className='form-control' required id="address" name="address" value={formData.address} autoComplete="address" onChange={handleChange} />
                                </div>
                                <button type="submit" class="btn btn-primary mt-4" onClick={handleSubmit}>Change</button>                        
                            </form>
                            
                            <button type="delete" class="btn btn-secondary mt-4" style={{width:'5rem'}} onClick={handleLink}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
	);

}
