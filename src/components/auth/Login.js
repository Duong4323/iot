import React, { useState } from 'react';
import { login } from '../services/api'; // Import API service
import './auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
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

    // Tài khoản mặc định cho thử nghiệm
    const defaultAccount = {
      email: 'admin@example.com',
      password: 'admin123',
    };

    if (
      formData.email === defaultAccount.email &&
      formData.password === defaultAccount.password
    ) {
      alert('Login successful!');
      localStorage.setItem('token', 'dummy-token'); // Lưu token giả lập
      window.location.href = '/home'; // Chuyển hướng sau đăng nhập thành công
      return;
    }

    try {
      const response = await login(formData); // Sử dụng API thực tế
      console.log(response); // Xử lý phản hồi từ API
      localStorage.setItem('token', response.token); // Lưu token vào localStorage
      alert('Login successful!');
      window.location.href = '/home'; // Chuyển hướng người dùng
    } catch (err) {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
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
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="buttons-container">
          <button type="submit">Login</button>
          <button type="button" onClick={() => window.location.href = '/register'}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
