import React from 'react';
import { Link } from 'react-router-dom';

export default function Locations(props) {

	const { locations } = props;	    
	
    	if (!locations || locations.length === 0) return <p>Can not find any locations, sorry</p>;
	return (
	<React.Fragment>
	    <div className='row'>  
            
                {locations.map((location) => {                
                    return (
                        <div className='col'>
                            <div className='card mt-2 mb-4 bg-dark text-white' style={{width:'25rem'}}>                                            
                                <div className='card-body'>
                                    <h5 className='card-title'>{location.name}</h5>

                                    <p className='card-text'>Location</p>
                                    <button className='btn btn-primary'>Details</button>
                                    <Link to={{pathname: `/location/${location.id}`}} className='stretched-link'></Link>
                                    
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>            
	</React.Fragment>
	);

};
