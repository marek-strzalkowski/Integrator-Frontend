import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams, Link } from 'react-router-dom';

import Post from '../posts/post'

export default function Location() {

    const { id } = useParams();
	const [dataLocation, setData] = useState({ locations: [] });

    useEffect(() => {
		axiosInstance.get(`location/item/${id}/`).then((res) => {
			setData({ locations: res.data });			
		});        
	}, [setData]);

    const handleFollow = (e) => {
        e.preventDefault();	

		axiosInstance.put(`location/follow/${id}/`, {})
        .then((res) => {            
            setData({ locations: res.data })
        });               
    }


    const [dataEvent, setEvents] = useState({ events: [] });
    const [nextEvents, setNextEvents] = useState(null)

    useEffect(() => {
        axiosInstance.get(`events/location/?id=${id}`).then((res) => {
			setEvents({ events: res.data });			
            setNextEvents(res.data.next);
		});        
	}, [setEvents]);

    const handleLoadNextEvents = (e) => {
        e.preventDefault();

        if (nextEvents !== null) {
            axiosInstance.get(nextEvents, {})
            .then((res) => {
                setEvents(dataEvents => ({ events: res.data}));             
                setNextEvents(res.data.next)
            });
        }
    }

    const [dataPost, setPosts] = useState({ posts: [] });
    const [nextUrl, setNextUrl] = useState(null)
    const initialFormData = Object.freeze({
		text: '',
	});
    const [formData, updateFormData] = useState(initialFormData);

    useEffect(() => {
        axiosInstance.get(`posts/location/?id=${id}`).then((res) => {
			setPosts({ posts: res.data.results });	
            setNextUrl(res.data.next);		
		});        
	}, [setPosts]);    

    const handleLoadNext = (e) => {
        e.preventDefault();

        if (nextUrl !== null) {
            axiosInstance.get(nextUrl, {})
            .then((res) => {
                setPosts({...dataPost.posts, posts: dataPost.posts.concat(res.data.results)});                
                setNextUrl(res.data.next)
            });
        }
    }

    const handleChange = (e) => {
		updateFormData({
			...formData,			
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();		

		axiosInstance.post(`post/location/create/?id=${id}`, {
            text: formData.text.trim(),
        })
        .then((res) => {
            setPosts(dataPost => ({ posts: [res.data, ...dataPost.posts]}));     
            document.getElementById('text').value = '';       
        });
	};

	return (
		<React.Fragment>
			<div className='container'>
                <div className='row'>              
                    <div className='col'>
                        <div className='card mt-2 mb-4 bg-dark text-white'>
                            <div className='card-body'>
                                <h3 className='card-title'>{dataLocation.locations.name}</h3>                            

                                <p className='card-text'>Location</p>
                                <p className='card-text'>Followers: {dataLocation.locations.followers_count}</p>                            
                                <p className='card-text'>Do I follow: {dataLocation.locations.is_following ? 'Yes' : 'No'}</p>  
                                
                                <button className={dataLocation.locations.is_following ? 'btn btn-secondary m-1' : 'btn btn-primary m-1'} onClick={handleFollow}>{dataLocation.locations.is_following ? 'UnFollow' : 'Follow'}</button>

                            </div>
                        </div>
                    </div>            
                </div>
            
                <div className='row'>  
                    
                    {dataEvent.events.results && dataEvent.events.results.map((anEvent) => {
                        return (
                            <div className='col'>
                                <div className='card mt-2 mb-4' style={{width:'18rem'}}>                                            
                                    <div className='card-body'>
                                        <h5 className='card-title'>{anEvent.name}</h5>

                                        <p className='card-text'>{anEvent.info}</p>
                                        <p className='card-text'>{anEvent.start}</p>
                                        <button className='btn btn-primary'>Details</button>
                                        <Link to={{pathname: `/event/${anEvent.id}`}} className='stretched-link'></Link>

                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {nextEvents !== null && <button className='btn btn-sm btn-outline-primary mr-3 mt-2 mb-4' onClick={handleLoadNextEvents}>More</button>}
                </div>

                <div className='row'>  
                    <div className='col'>
                        <div className='card mt-2 mb-4 p-3 bg-light'>
                            
                            <form>                     
                                <div class='form-group'>                                
                                    <textarea className='form-control' required id="text" name="text" autoComplete="text" placeholder="Post..." onChange={handleChange} />
                                </div>
                                <button type="submit" class="btn btn-primary mt-4" onClick={handleSubmit}>Post</button>                        
                            </form>

                        </div>
                    </div>
                </div>

                <div className='row'>  
                    <div className='col'>
                    
                        {dataPost.posts && dataPost.posts.map((post) => {
                            return (
                                <Post postItem={post} key={post.id} />
                            );
                        })}
                        
                        {nextUrl !== null && <p><button className='btn btn-sm btn-outline-primary mx-3' onClick={handleLoadNext}>Load more</button></p>}
                    </div>
                </div>

            </div>
		</React.Fragment>
	);

}