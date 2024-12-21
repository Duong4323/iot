import React, { useState } from 'react';
import { register } from '../services/api';  // Import hàm register từ api.js
import './auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);  // Gọi hàm register từ api.js
      console.log(response);  // In thông tin phản hồi từ server
      alert('Registration successful!');
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="login">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
