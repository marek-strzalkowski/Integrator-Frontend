import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProfilePicture() {
	
    const navigate = useNavigate();
    const { id } = useParams();
    const initialFormData = Object.freeze({
        id: '',
	image: '',
    });
    const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
	axiosInstance.get(`user/editpicture/${id}`).then((res) => {
	    if (res.data.is_me === false) {
                window.location.href = '/';
            }            
            updateFormData({
		...formData,                				                
                currentImage: res.data.image,
	    });		            
	});
    }, [updateFormData]);

    const handleChange = (e) => {
	updateFormData({
		...formData,			
		[e.target.name]: e.target.files,
	});
    };

    const handleSubmit = (e) => {
	e.preventDefault();		
                
	let formDataPicture = new FormData();		
	formDataPicture.append('image', formData.image[0]);
	axiosInstance.put(`user/editpicture/${id}/`, formDataPicture)
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
                            <h1>Edit Picture {formData.first_name}</h1>
                            
                            <form>                                           
                                <div class='form-group'>
                                    <label><img className='rounded-circle bg-light text-white img-thumbnail' src={formData.currentImage} style={{width:'8rem', height:'8rem'}} /></label>                            
                                    <input type="file" accept='image/*' className='form-control' required id="image" name="image" autoComplete="image" onChange={handleChange} />
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
