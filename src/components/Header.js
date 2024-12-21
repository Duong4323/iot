import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSun, FaTint } from 'react-icons/fa';
import './Header.css';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout handler from App.js
    navigate('/login');
  };

  return (
    <header>
      <div className="header-top">
        <span className="icon-text">
          <FaSun className="icon1" /> :25°C
        </span>
        <span className="icon-text">
          <FaTint className="icon2" /> :60%
        </span>
      </div>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/home" className="nav-button">Home</Link>
          </li>
          <li>
            <Link to="/image" className="nav-button">Cảnh báo xâm nhập</Link>
          </li>
          <li>
            <Link to="/device" className="nav-button">Thiết bị</Link>
          </li>
          <li>
            <Link to="/homes" className="nav-button">Quản lý nhà</Link>
          </li>
          <li>
            <Link to="/users" className="nav-button">Người dùng</Link>
          </li>
          <li>
            <Link to="/gas" className="nav-button">Cảnh báo khí gas</Link>
          </li>
          <li>
            <Link to="/change-password" className="nav-button">Đổi mật khẩu</Link>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
