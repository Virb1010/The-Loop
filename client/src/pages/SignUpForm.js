import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import API_BASE_URL from '../utils/API_Base_URL';

function SignUpForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    profilePic: ''
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/sendOTP`, { email: form.email });
      navigate(`/VerifyOTP`, { state: form });
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group controlId="signupEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="signupFirstName" className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" type="text" placeholder="First name" value={form.firstName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="signupLastName" className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" type="text" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="signupPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="signupConfirmPassword" className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />
      </Form.Group>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <Button variant="success" type="submit" className="w-100">Sign Up</Button>
    </Form>
  );
}

export default SignUpForm;
