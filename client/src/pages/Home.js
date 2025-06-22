import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import 'bootstrap-icons/font/bootstrap-icons.css';
import CategoryIconMap from '../utils/modules/CategoryIconMaps';
import API_BASE_URL from '../utils/API_Base_URL';

function Home() {
    const [postList, setPostList] = useState([]);
    const [sortBy, setSortBy] = useState("newest");
    const Navigate = useNavigate();

    useEffect(() => {
        document.title = "Home";
        fetchPosts();
    }, [sortBy]);

    const fetchPosts = () => {
        axios.get(`${API_BASE_URL}/posts`).then((response) => {
            let sorted = [...response.data];

            switch (sortBy) {
                case "oldest":
                    sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    break;
                case "newest":
                    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                case "liked":
                    sorted.sort((a, b) => b.likes - a.likes);
                    break;
                case "controversial":
                    sorted.sort((a, b) => (b.dislikes - a.dislikes));
                    break;
                case "category":
                    sorted.sort((a, b) => a.category.localeCompare(b.category));
                    break;
                default:
                    break;
            }

            setPostList(sorted);
        });
    };

    return (
        <div className="HomePage">
            <div className="d-flex justify-content-end w-100 px-5 mt-4">
                <Dropdown className="ms-auto">
                    <Dropdown.Toggle
                        variant="dark"
                        style={{ backgroundColor: '#2f2f2f', border: 'none', color: '#f3efe9' }}
                    >
                        <i className="bi bi-sort-down me-2"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSortBy("oldest")}>Oldest - Newest</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy("newest")}>Newest - Oldest</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy("liked")}>Most Liked</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy("controversial")}>Most Controversial</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy("category")}>Category</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>


            {postList.map((value) => {
                return (
                    <div key={value.id} className="position-relative">
                        <Card
                            className="d-flex align-items-center justify-content-between p-3 rounded mt-4 mx-auto"
                            style={{ height: '24rem', width: '48rem', cursor: 'pointer', backgroundColor: '#2f2f2f', color: '#f3efe9', border: '3px solid #f3efe9' }}
                            onClick={() => Navigate(`/Post/${value.id}`)}
                        >
                            <Card.Body className="w-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="fs-4 fw-bold">{value.title}</div>
                                    {CategoryIconMap[value.category] && (
                                        <img
                                            src={CategoryIconMap[value.category]}
                                            alt={`${value.category} icon`}
                                            width={30}
                                            height={30}
                                        />
                                    )}
                                </div>
                                <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '10rem' }}>
                                    {value.content.slice(0, 300)}{value.content.length > 300 ? '...' : ''}
                                </Card.Text>
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <div>{value.author}</div>
                                    <div className="d-flex gap-4">
                                        <span><i className="bi bi-hand-thumbs-up-fill me-1" style={{ color: 'green' }}></i>{value.likes}</span>
                                        <span><i className="bi bi-hand-thumbs-down-fill me-1" style={{ color: 'red' }}></i>{value.dislikes}</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
