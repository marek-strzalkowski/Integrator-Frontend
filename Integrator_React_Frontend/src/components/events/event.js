import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams, Link } from 'react-router-dom';

import Post from '../posts/post'

export default function Event() {

    const { id } = useParams();    
    const [data, setData] = useState({ events: [] });
        
    useEffect(() => {
	axiosInstance.get(`events/item/${id}/`).then((res) => {
		setData({ events: res.data });			
	});
    }, [setData]);

    const handleLink = (e) => {
        e.preventDefault();
        window.location.href = `/event/edit/${data.events.id}`
    }

    const handleGoing = (e) => {
        e.preventDefault();		
        
	axiosInstance.put(`event/going/${id}/`, {})
        .then((res) => {            
            setData({ events: res.data })
        });               
    }
    

    const [dataPost, setPosts] = useState({ posts: [] });
    const [nextUrl, setNextUrl] = useState(null)
    const initialFormData = Object.freeze({
	text: '',
    });
    const [formData, updateFormData] = useState(initialFormData);
    
    useEffect(() => {
        axiosInstance.get(`posts/event/?id=${id}`).then((res) => {
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

	axiosInstance.post(`post/event/create/?id=${id}`, {
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
                        <div className='card mt-2 mb-4'>
                            <div className='card-body bg-light'>                                
                                <h3 className='card-title'>{data.events.name}</h3>

                                <p className='card-text'>{data.events.info}</p>
                                <p className='card-text'>{data.events.start}</p>
                                <p className='card-text'>Location: <Link to={{pathname: `/location/${data.events.location && data.events.location.slice(0,1)}`}}>{data.events.location && data.events.location.slice(1,2)}</Link></p>
                                <p className='card-text'>Am I going: {data.events.is_going ? 'Yes' : 'No'}</p>

                                <button className={data.events.is_going ? 'btn btn-secondary m-1' : 'btn btn-primary m-1'} onClick={handleGoing}>{data.events.is_going ? 'Leave' : 'Go'}</button>
                                {data.events.is_creator && <button className='btn btn-primary m-1' onClick={handleLink}>Edit</button>}

                            </div>
                        </div>
                    </div>            
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
