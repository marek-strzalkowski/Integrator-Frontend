import React, { useState}  from 'react';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';

export default function Events(props) {

    const [dataEvents, setEvents] = useState(props.events.results)
    const [nextUrl, setNextUrl] = useState(props.events.next)
    
    const handleLoadNext = (e) => {
        e.preventDefault()

        if (nextUrl !== null) {
            axiosInstance.get(nextUrl, {})
            .then((res) => {
                setEvents(dataEvents.concat(res.data.results));                
                setNextUrl(res.data.next)
            });
        }
    }

	if (!dataEvents || dataEvents.length === 0) return <p>Can not find any events, sorry</p>;
	return (
	<React.Fragment>
	    <div className='row'>  

                {dataEvents.map((anEvent) => {                
                    return (
                        <div className='col' key={anEvent.id}>
                            <div className='card mt-2 mb-4' style={{width:'20rem'}}>                                            
                                <div className='card-body'>
                                    <h4 className='card-title'>{anEvent.name}</h4>

                                    <p className='card-text'>{anEvent.info}</p>
                                    <p className='card-text'>{anEvent.start}</p>
                                    <button className='btn btn-primary'>Details</button>
                                    <Link to={{pathname: `/event/${anEvent.id}`}} className='stretched-link'></Link>

                                </div>
                            </div>
                        </div>
                    );
                })}   
                         
            </div>

            {nextUrl !== null && <p><button className='btn btn-outline-primary' onClick={handleLoadNext}>Load next</button></p>}
	</React.Fragment>
	);

};
