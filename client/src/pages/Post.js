import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap';
import CategoryIconMap from '../utils/modules/CategoryIconMaps';
import API_BASE_URL from '../utils/API_Base_URL'

function Post() {
    let { postId } = useParams();
    const [post, loadPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`${API_BASE_URL}/posts/byID/${postId}`).then((response) => {
            loadPost(response.data);
            document.title = `${response.data.title}`
        })

        axios.get(`${API_BASE_URL}/comments/posts/${postId}`).then((response) => {
            setComments(response.data);
        });

    }, [])
    
    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.post(
                `${API_BASE_URL}/comments/posts/${postId}`,
                { content: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setComments(prev => [...prev, response.data]);
            setNewComment("");
        } catch (err) {
            console.error("Failed to post comment:", err);
        }
    };

    return (
        <div className='PostPage'>
            <div className='PostPageTitle'> {post.title} </div>
            
            <div className='PostPageBodyDiv'>
                <Card 
                    className="PostPageSideBar p-3"
                    style={{ backgroundColor: '#2f2f2f', color: '#f3efe9' }}>
                    
                    <div className="w-100 text-center">
                        <Button 
                            variant="outline-light"  
                            style={{ fontSize: '1.2rem' }} 
                            onClick={() => window.history.back()}
                        >
                            Return to Home Screen
                        </Button>
                    </div>
                    
                    <div>
                        {post.category}
                        {CategoryIconMap[post.category] && (
                            <img
                            src={CategoryIconMap[post.category]}
                            alt={`${post.category} icon`}
                            width={50}
                            height={50}
                            />
                        )}
                    </div>
                    
                    {post.author}
                    
                    {/* <div className="d-flex gap-4 align-items-center"> */}
                    <div className="d-flex gap-4 justify-content-center mt-3">
                        <div>
                            <i className="bi bi-hand-thumbs-up-fill fs-4 me-2" style={{ color: 'green' }}></i>
                            {post.likes}
                        </div>
                        <div>
                            <i className="bi bi-hand-thumbs-down-fill fs-4 me-2" style={{ color: 'red' }}></i>
                            {post.dislikes}
                        </div>
                    </div>
                </Card>

                <div className='PostPageContent'>
                    {post.content}

                    <div className='PostPageComments mt-4'>
                    <h4>Leave a Comment</h4>
                    <textarea
                        className="form-control mb-2"
                        rows="3"
                        placeholder="Write your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="text-end">
                        <Button variant="primary" onClick={handleSubmitComment}>
                            Post Comment
                        </Button>
                    </div>


                    <hr />

                    <h5>Comments</h5>
                    {comments.length === 0 && <p>No comments yet.</p>}

                    {comments.map((comment, index) => (
                        <Card key={index} className="mb-3 p-3">
                            <div><strong>{comment.author}</strong> • {new Date(comment.createdAt).toLocaleString()}</div>
                            <div>{comment.content}</div>
                            <div className="d-flex gap-3 mt-2">
                                <span> <i className="bi bi-hand-thumbs-up-fill fs-4 me-2" style={{ color: 'green' }}></i> {comment.likes}</span>
                                <span> <i className="bi bi-hand-thumbs-down-fill fs-4 me-2" style={{ color: 'red' }}></i> {comment.dislikes}</span>
                            </div>
                        </Card>
                    ))}
                </div>
                </div>

                

            </div>
        </div>
    ) 
}

export default Post;