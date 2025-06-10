import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'
import { Button, Card, Container } from 'react-bootstrap';
import CategoryIconMap from '../utils/modules/CategoryIconMaps';

function Post() {
    let { postId } = useParams();
    const [post, loadPost] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byID/${postId}`).then((response) => {
        loadPost(response.data);
        console.log(response)
        })
    }, [])
    
    return (
        <div className='PostPage'>
            <div className='PostPageTitle'> {post.title} </div>
            
            <div className='PostPageBodyDiv'>
                <Card 
                    className="PostPageSideBar d-flex flex-column p-3"
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

                    <div> 
                        <i className="bi bi-hand-thumbs-up-fill fs-4 me-2" style={{ color: 'green' }}></i>
                        {post.likes}
                    </div>
                    <div>
                        <i className="bi bi-hand-thumbs-down-fill fs-4 me-2" style={{ color: 'red' }}></i>
                        {post.dislikes}
                    </div>
                </Card>

                <div className='PostPageContent'> {post.content} </div>
            </div>
        </div>
    ) 
}

export default Post;