import React, { useState, useEffect } from 'react';
import {
  createHome,
  getHomeById,
  updateHome,
  deleteHome,
  addMember,
  removeMember,
  fetchHomes,
} from '../services/api';
import './HomeManagement.css';
const HomeManagement = () => {
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [newHomeName, setNewHomeName] = useState('');
  const [newHomeAddress, setNewHomeAddress] = useState('');
  const [memberToAdd, setMemberToAdd] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchHomeId, setSearchHomeId] = useState('');
  const [searchedHome, setSearchedHome] = useState(null);
  const [token, setToken] = useState('');
  
  // Ẩn/hiện thông tin của nhà
  const [isHomeVisible, setIsHomeVisible] = useState({}); // Dùng đối tượng để lưu trạng thái ẩn/hiện của mỗi nhà
  
  // Ẩn/hiện form tạo nhà mới
  const [isCreateHomeVisible, setIsCreateHomeVisible] = useState(false);

  // Ẩn/hiện form cập nhật ngôi nhà
  const [isUpdateVisible, setIsUpdateVisible] = useState(false); // Trạng thái hiển thị form cập nhật

  useEffect(() => {
    const exampleHome = {
      _id: '1',
      name: 'My Dream Home',
      address: '123 Main Street',
      members: [
        { _id: '1', name: 'Alice' },
        { _id: '2', name: 'Bob' },
      ],
    };
    setHomes([exampleHome]);
  }, []);

  // Lấy danh sách ngôi nhà
  const fetchHomesList = async (token) => {
    setIsLoading(true);
    setError('');
    try {
      const homes = await fetchHomes(token);
      setHomes(homes);
    } catch (error) {
      setError('Lỗi khi lấy danh sách ngôi nhà!');
    } finally {
      setIsLoading(false);
    }
  };

  // Tìm kiếm ngôi nhà
  const handleSearchHome = async () => {
    setIsLoading(true);
    setError('');
    try {
      const home = await getHomeById(searchHomeId);
      setSearchedHome(home);
    } catch (error) {
      setError('Lỗi khi tìm ngôi nhà!');
      setSearchedHome(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Tạo ngôi nhà mới
  const handleCreateHome = async () => {
    setIsLoading(true);
    setError('');
    try {
      await createHome({ name: newHomeName, address: newHomeAddress }, token);
      fetchHomesList(token);
      setNewHomeName('');
      setNewHomeAddress('');
      setIsCreateHomeVisible(false); // Ẩn form tạo nhà sau khi tạo thành công
    } catch (error) {
      setError('Lỗi khi tạo ngôi nhà!');
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa ngôi nhà
  const handleDeleteHome = async (homeId) => {
    setIsLoading(true);
    setError('');
    try {
      await deleteHome(homeId, token);
      fetchHomesList(token);
    } catch (error) {
      setError('Lỗi khi xóa ngôi nhà!');
    } finally {
      setIsLoading(false);
    }
  };

  // Thêm thành viên vào nhà
  const handleAddMember = async (homeId) => {
    setIsLoading(true);
    setError('');
    try {
      await addMember(homeId, memberToAdd, token);
      setMemberToAdd('');
      fetchHomesList(token);
    } catch (error) {
      setError('Lỗi khi thêm thành viên!');
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa thành viên khỏi nhà
  const handleRemoveMember = async (homeId, memberId) => {
    setIsLoading(true);
    setError('');
    try {
      await removeMember(homeId, memberId, token);
      fetchHomesList(token);
    } catch (error) {
      setError('Lỗi khi xóa thành viên!');
    } finally {
      setIsLoading(false);
    }
  };

  // Chuyển trạng thái ẩn/hiện thông tin ngôi nhà
  const toggleHomeVisibility = (homeId) => {
    setIsHomeVisible((prevState) => ({
      ...prevState,
      [homeId]: !prevState[homeId],
    }));
  };

  // Cập nhật ngôi nhà
  const handleUpdateHome = async () => {
    setIsLoading(true);
    setError('');
    try {
      await updateHome(selectedHome._id, { name: selectedHome.name, address: selectedHome.address }, token);
      setIsUpdateVisible(false); // Ẩn form sau khi cập nhật
      fetchHomesList(token); // Lấy lại danh sách ngôi nhà sau khi cập nhật
    } catch (error) {
      setError('Lỗi khi cập nhật ngôi nhà!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Quản lý Ngôi Nhà</h1>

      {/* Hiển thị lỗi nếu có */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Tìm kiếm ngôi nhà */}
      <div>
        <h2>Tìm ngôi nhà theo ID</h2>
        <input
          type="text"
          placeholder="Nhập ID ngôi nhà"
          value={searchHomeId}
          onChange={(e) => setSearchHomeId(e.target.value)}
        />
        <button onClick={handleSearchHome}>Tìm kiếm</button>
        {isLoading && <p>Đang tải...</p>}

        {/* Hiển thị thông tin ngôi nhà tìm được */}
        {searchedHome && (
          <div>
            <h3>Thông tin ngôi nhà:</h3>
            <p>Tên ngôi nhà: {searchedHome.name}</p>
            <p>Địa chỉ: {searchedHome.address}</p>
            <p>Danh sách thành viên:</p>
            <ul>
              {searchedHome.members.map((member) => (
                <li key={member._id}>{member.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tạo ngôi nhà mới */}
      <div>
        <button onClick={() => setIsCreateHomeVisible(!isCreateHomeVisible)}>
          {isCreateHomeVisible ? 'Cancel' : 'Thêm nhà'}
        </button>
        {isCreateHomeVisible && (
          <div>
            <input
              type="text"
              placeholder="Tên ngôi nhà"
              value={newHomeName}
              onChange={(e) => setNewHomeName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Địa chỉ ngôi nhà"
              value={newHomeAddress}
              onChange={(e) => setNewHomeAddress(e.target.value)}
            />
            <button onClick={handleCreateHome}>Tạo</button>
          </div>
        )}
      </div>

      {/* Danh sách ngôi nhà */}
      <div>
        <h2>Danh sách ngôi nhà</h2>
        {isLoading ? (
          <p>Đang tải...</p>
        ) : (
          <ul>
            {homes.map((home) => (
              <li key={home._id}>
                <p>{home.name}</p>
                <p>Địa chỉ: {home.address}</p>
                <button onClick={() => {
                  setSelectedHome(home);  // Lưu thông tin ngôi nhà chọn vào selectedHome
                  setIsUpdateVisible(true); // Hiển thị form cập nhật
                }}>
                  Chỉnh sửa
                </button>
                <button onClick={() => handleDeleteHome(home._id)}>Xóa</button>

                {/* Nút ẩn/hiện thông tin ngôi nhà */}
                <button onClick={() => toggleHomeVisibility(home._id)}>
                  {isHomeVisible[home._id] ? 'Ẩn thông tin' : 'Hiển thị thông tin'}
                </button>

                {/* Hiển thị thành viên nếu đã được bật */}
                {isHomeVisible[home._id] && (
                  <div>
                    <h3>Thành viên:</h3>
                    <ul>
                      {home.members.map((member) => (
                        <li key={member._id}>
                          <span>{member.name}</span>
                          <button onClick={() => handleRemoveMember(home._id, member._id)}>
                            Xóa
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Thêm thành viên */}
                    <input
                      type="text"
                      placeholder="ID thành viên"
                      value={memberToAdd}
                      onChange={(e) => setMemberToAdd(e.target.value)}
                    />
                    <button onClick={() => handleAddMember(home._id)}>Thêm thành viên</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cập nhật ngôi nhà */}
      {selectedHome && isUpdateVisible && (
        <div>
          <h2>Cập nhật ngôi nhà</h2>
          <input
            type="text"
            value={selectedHome.name}
            onChange={(e) => setSelectedHome({ ...selectedHome, name: e.target.value })}
          />
          <input
            type="text"
            value={selectedHome.address}
            onChange={(e) => setSelectedHome({ ...selectedHome, address: e.target.value })}
          />
          <button onClick={handleUpdateHome}>Cập nhật</button>
          <button onClick={() => setIsUpdateVisible(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default HomeManagement;
