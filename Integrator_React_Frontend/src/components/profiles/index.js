import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams, Link } from 'react-router-dom';

export default function Profile() {

    const { id } = useParams();
    const [dataProfile, setData] = useState({ profile: [] });

    useEffect(() => {
	axiosInstance.get(`user/profile/${id}/`).then((res) => {
		setData({ profile: res.data });			
	});        
    }, [setData]);

    const handleLink = (e) => {
        e.preventDefault();        
        window.location.href = `/profile/edit/${id}/`
    }

	return (
	<React.Fragment>
	    <div className='container'>
                <div className='row'>              
                    <div className='col'>
                        <div className='card mt-2 mb-4 bg-primary text-white'>
                            <div className='card-body'>
                                <h3 className='card-title'>{dataProfile.profile.first_name} {dataProfile.profile.last_name}</h3>   

                                <p className='card-text'>
                                    {dataProfile.profile.is_me ? <a href={`/profile/editpicture/${id}/`}>
                                        <img className='rounded-circle bg-light text-white img-thumbnail' src={dataProfile.profile.image} style={{width:'8rem', height:'8rem'}} />
                                    </a> : <img className='rounded-circle bg-light text-white img-thumbnail' src={dataProfile.profile.image} style={{width:'8rem', height:'8rem'}} />}
                                </p>       
                                <p className='card-text'>{dataProfile.profile.location && 'Location ' + dataProfile.profile.location[1]}</p>
                                <p className='card-text'>{dataProfile.profile.about}</p>             

                                {dataProfile.profile.is_me && <button className='btn btn-light m-1' onClick={handleLink}>Edit</button>}                            
                            </div>
                        </div>
                    </div>            
                </div>            
            </div>
	</React.Fragment>
	);

}
