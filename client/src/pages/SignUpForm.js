import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function SignUpForm() {
  const [form, setForm] = useState({ email: '', firstName: '', lastName: '', password: '', profilePic: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/auth/signup', form);
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
      <Button variant="success" type="submit" className="w-100">Sign Up</Button>
    </Form>
  );
}
