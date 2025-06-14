import React from 'react';
import axios from "axios";
import {useEffect, useState} from "react"
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import 'bootstrap-icons/font/bootstrap-icons.css';
import CategoryIconMap from '../utils/modules/CategoryIconMaps';
import API_BASE_URL from '../utils/API_Base_URL'

function Home() {
    const [postList, setPostList] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_BASE_URL}/posts`).then((response) => {
            setPostList(response.data);
        })
    }, [])

    return (
        <div className="HomePage"> 
            {postList.map((value) => {
                console.log("Rendering Post Card:", value);
                return (
                    <Card
                        className="d-flex align-items-center justify-content-between p-3 rounded mt-4"
                        style={{height: '24rem', width: '48rem', cursor: 'pointer', backgroundColor: '#2f2f2f', color: '#f3efe9', border: '3px solid #f3efe9' }}
                        onClick={() => {Navigate(`/Post/${value.id}`)}}
                    >
                        <div className='HomePageCardFooter'>
                            <Card.Title> {value.title} </Card.Title>
                            <img 
                                src={CategoryIconMap[value.category]} 
                                alt={value.category + " Icon"} 
                                width={105} 
                                height={105} 
                            />  
                        </div>

                        <Card.Text>
                            {value.content.length >= 250
                            ? `${value.content.slice(0, 250)}...`
                            : value.content}
                        </Card.Text>
                        
                        <hr style={{
                            width: '100%',
                            borderTop: '1px solid #f3efe9',
                            opacity: 1,
                            marginTop: '1rem',
                            marginBottom: '1rem'
                        }} />
                        
                        <div className='HomePageCardFooter'>
                            <Card.Title> {value.author} </Card.Title>
                            <div>
                                <i className="bi bi-hand-thumbs-up-fill fs-3 mx-3" style={{ color: 'green' }}></i>
                                {value.likes}
                                <i className="bi bi-hand-thumbs-down-fill fs-3 mx-3" style={{ color: 'red' }}></i>
                                {value.dislikes}
                            </div>
                        </div>
                    </Card>
                )
            })} 
        </div>
    );
}

export default Home;