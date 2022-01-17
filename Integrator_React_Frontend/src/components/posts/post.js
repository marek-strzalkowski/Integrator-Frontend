import React, {useState, useEffect} from 'react';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';

export default function Post (props) {

    const { postItem } = props;
    const [PostData, setPost] = useState({post : postItem})
    const id = PostData.post.id

    const handleLike = (e) => {
        e.preventDefault();

		axiosInstance.put(`post/like/${id}/`, {})
        .then((res) => {    
            setPost({ post: res.data });    
        });               
    }

    const [dataComments, setComments] = useState({ comments: [] });
    const initialFormData = Object.freeze({
		comment: '',
	});
    const [formData, updateFormData] = useState(initialFormData);
    
	useEffect(() => {
		axiosInstance.get(`post/comments/?id=${id}`).then((res) => {
			setComments({ comments: res.data });			
		});        
	}, [setComments]);
    
    const handleChange = (e) => {
		updateFormData({
			...formData,			
			[e.target.name]: e.target.value,
		});
	};

    const handleSubmit = (e) => {
        e.preventDefault();		

		axiosInstance.post(`post/comment/${id}/`, {
            text: formData.comment.trim(),
        })
        .then((res) => {                
            setComments(dataComments => ({ comments: [...dataComments.comments, res.data]}));     
            document.getElementById(`comment${id}`).value = '';
        });               
    }

    if (!PostData.post || PostData.post.length === 0) return <p>Error!</p>;
	return (
		<React.Fragment>
			<div className='col'>
                <div className='card mt-2 mb-4' style={{maxWidth:'50rem', minWidth:'20rem'}}>                                            
                    <div className='card-body'>
                        <p className='card-text'><Link to={{ pathname: `/profile/${PostData.post.creator.id}` }}>{PostData.post.creator.first_name} {PostData.post.creator.last_name}</Link> <small className='text-secondary ml-2'>{PostData.post.timestamp}</small></p>
                        
                        <h5 className='card-title'>{PostData.post.text}</h5>

                        <p className='card-text'>Likes: {PostData.post.likes}</p>                            
                        <button className={PostData.post.is_like ? 'btn btn-secondary m-1' : 'btn btn-primary m-1'} onClick={handleLike}>{PostData.post.is_like ? 'Unlike' : 'Like'}</button>

                        {dataComments.comments && dataComments.comments.map((comment) => {
                            return (<div className='card mt-4 mb-2 bg-light' key={comment.id}>                                            
                                <div className='card-body'>                            
                                    <p className='card-text'><Link to={{ pathname: `/profile/${comment.creator.id}` }}>{comment.creator.first_name} {comment.creator.last_name}</Link> <small className='text-secondary ml-2'>{comment.timestamp}</small></p>
                                    <p className='card-text'>{comment.text}</p>                                                        
                                </div>
                            </div>)
                        })}

                        <form>                     
                            <div class='form-group mt-4'>                                
                                <input type='text' className='form-control' required id={"comment" + id} name="comment" autoComplete="comment" placeholder="Comment..." onChange={handleChange} />
                            </div>
                            <button type="submit" class="btn btn-secondary mt-2 btn-sm" onClick={handleSubmit}>Comment</button>                        
                        </form>

                    </div>
                </div>
            </div>            
		</React.Fragment>
	);

};