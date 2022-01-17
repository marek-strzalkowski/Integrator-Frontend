import React from 'react';
import axiosInstance from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function DeleteEvent() {

	const navigate = useNavigate();
    const { id } = useParams();
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		axiosInstance.delete(`events/delete/${id}/`, {
 
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
        .then((res) => {
            navigate(`../events/`);
        });
	};
    
	return (
        <React.Fragment>
            <div className='container'>
                <div className='row'>  
                    <div className='col'>
                        <div className='card mt-2 mb-4 p-3 bg-light' style={{maxWidth:'50rem'}}>
                            <h1>Delete Event</h1>
                            
                            <form>                                                
                                <button type="submit" class="btn btn-danger mt-4" onClick={handleSubmit}>Confirm Delete Event</button>                    
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

}