import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ChangePassword from './components/auth/ChangePassword';
import ImageManager from './components/detectionwarning/ImageManager';
import DeviceManagement from './components/devices/DeviceManagement';
import HomeManagement from './components/home/HomeManagement';
import UserManagement from './components/users/UserManagement';
import Gas from './components/Gaswarning/Gas';
import RoomManagement from './components/room/RoomManagement';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Kiểm tra token trong localStorage
    setIsLoggedIn(!!token); // Xác định trạng thái đăng nhập
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khi đăng xuất
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <Header onLogout={handleLogout} />} {/* Hiển thị Header nếu đã đăng nhập */}
      <div className="content">
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/change-password"
            element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />}
          />
          <Route
            path="/home"
            element={isLoggedIn ? <RoomManagement /> : <Navigate to="/login" />}
          />
          <Route
            path="/image"
            element={isLoggedIn ? <ImageManager /> : <Navigate to="/login" />}
          />
          <Route
            path="/device"
            element={isLoggedIn ? <DeviceManagement /> : <Navigate to="/login" />}
          />
          <Route
            path="/homes"
            element={isLoggedIn ? <HomeManagement /> : <Navigate to="/login" />}
          />
          <Route
            path="/users"
            element={isLoggedIn ? <UserManagement /> : <Navigate to="/login" />}
          />
          <Route
            path="/gas"
            element={isLoggedIn ? <Gas /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
