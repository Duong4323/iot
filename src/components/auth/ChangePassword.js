import React, { useState } from 'react';
import { changePassword } from '../services/api';  // Import hàm changePassword từ api.js
import './auth.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Giả sử bạn có token được lưu trong localStorage (hoặc state)
  const token = localStorage.getItem('access_token');  // Hoặc lấy token từ context/store nếu cần

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
      const response = await changePassword(formData, token);  // Gọi hàm changePassword từ api.js
      setSuccessMessage('Password changed successfully!');
      console.log(response);  // Xử lý phản hồi từ server nếu cần
    } catch (err) {
      setError('An error occurred while changing the password. Please try again.');
      console.error(err);  // Xử lý lỗi
    }
  };

  return (
    <div className="login">
      <h2>Change Password</h2>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p className="error-message">{error}</p>}

      {/* Hiển thị thông báo thành công nếu thay đổi mật khẩu thành công */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
