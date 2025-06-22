import { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../utils/API_Base_URL';
import '../utils/fonts/fonts.css';

function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Opinion Piece'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Create Post";

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.isGuest) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      setError("User not found. Please log in again.");
      return;
    }

    if (form.content.length < 2000) {
      setError("Post content must be at least 2000 characters.");
      return;
    }

    try {
      const postData = {
        title: form.title,
        content: form.content,
        category: form.category,
        author: `${user.firstName} ${user.lastName}`,
        likes: 0,
        dislikes: 0,
        UserId: user.id
      };

      await axios.post(`${API_BASE_URL}/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      setError("Failed to create post. Please try again.");
    }
  };

  const contentCharCount = form.content.length;
  const charCountColor = contentCharCount >= 2000 ? 'green' : 'red';

  return (
    <div className='CreatePostPage d-flex justify-content-center align-items-center mt-5'>
      <Card className="p-4" style={{ backgroundColor: '#2f2f2f', color: '#f3efe9', border: '3px solid #f3efe9', width: '40rem' }}>
        <h3 className="mb-4 text-center">Create a New Post</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="postTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="postContent" className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label>Content</Form.Label>
              <span style={{ fontSize: '0.9rem', color: charCountColor }}>
                ({contentCharCount}/2000)
              </span>
            </div>
            <Form.Control
              name="content"
              as="textarea"
              rows={10}
              placeholder="Write your post..."
              value={form.content}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="postCategory" className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Select name="category" value={form.category} onChange={handleChange}>
              <option>Opinion Piece</option>
              <option>Research Paper</option>
              <option>Concept Explanation</option>
              <option>Project Log</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          <Button variant="success" type="submit" className="w-100">
            Post
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default CreatePost;
