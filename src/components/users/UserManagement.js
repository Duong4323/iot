// UserManagement.js
import React, { useState } from 'react';
import {
  getUserById,
  getUserByEmail,
//   createUser,
  updatePassword,
  addOwnedHome,
  addMemberHome,
  removeMemberHome,
} from '../services/api';

function UserManagement() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [password, setPassword] = useState('');
  const [homeId, setHomeId] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  // Tìm người dùng theo ID
  const searchUserById = async () => {
    try {
      const user = await getUserById(userId);
      setUserData(user);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Tìm người dùng theo Email
  const searchUserByEmail = async () => {
    try {
      const user = await getUserByEmail(email);
      setUserData(user);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Tạo người dùng mới
//   const createNewUser = async () => {
//     try {
//       const createdUser = await createUser(newUser);
//       setUserData(createdUser);
//       setError('');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

  // Cập nhật mật khẩu
  const changePassword = async () => {
    try {
      const updatedUser = await updatePassword(email, password);
      setUserData(updatedUser);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Thêm ngôi nhà vào danh sách sở hữu
  const addHomeToOwned = async () => {
    try {
      const updatedUser = await addOwnedHome(userId, homeId);
      setUserData(updatedUser);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Thêm ngôi nhà vào danh sách tham gia
  const addHomeToMember = async () => {
    try {
      const updatedUser = await addMemberHome(userId, homeId);
      setUserData(updatedUser);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Xóa ngôi nhà khỏi danh sách tham gia
  const removeHomeFromMember = async () => {
    try {
      const updatedUser = await removeMemberHome(userId, homeId);
      setUserData(updatedUser);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Tìm kiếm người dùng */}
      <div>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={searchUserById}>Search by ID</button>
      </div>
      <div>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={searchUserByEmail}>Search by Email</button>
      </div>

      {/* Hiển thị thông tin người dùng */}
      {userData && (
        <div>
          <h2>User Info</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Owned Homes: {userData.ownedHomes ? userData.ownedHomes.join(', ') : 'None'}</p>
          <p>Member of Homes: {userData.memberOfHomes ? userData.memberOfHomes.join(', ') : 'None'}</p>
        </div>
      )}

      {/* Thêm và xóa ngôi nhà */}
      <div>
        <input
          type="text"
          placeholder="Home ID"
          value={homeId}
          onChange={(e) => setHomeId(e.target.value)}
        />
        <button onClick={addHomeToOwned}>Add to Owned Homes</button>
        <button onClick={addHomeToMember}>Add to Member Homes</button>
        <button onClick={removeHomeFromMember}>Remove from Member Homes</button>
      </div>

      {/* Tạo người dùng */}
      <div>
        {/* <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        /> */}
        {/* <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        /> */}
        {/* <button onClick={createNewUser}>Create User</button> */}
      </div>

      {/* Cập nhật mật khẩu */}
      {/* <div>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={changePassword}>Update Password</button>
      </div> */}

      {/* Hiển thị lỗi nếu có */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UserManagement;
