import React, { useState, useEffect } from 'react';
import {
  verifyDevice,
  connectDevice,
  disconnectDevice,
  getDevicesByHomeId,
  getDeviceById,
} from '../services/api'; // Đường dẫn đến file chứa API

const DeviceManager = () => {
  const [homeId, setHomeId] = useState(''); // ID của ngôi nhà
  const [devices, setDevices] = useState([]); // Danh sách thiết bị
  const [selectedDeviceId, setSelectedDeviceId] = useState(''); // Thiết bị đang chọn
  const [deviceDetails, setDeviceDetails] = useState(null); // Chi tiết thiết bị tìm kiếm
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(''); // Trạng thái lỗi
  const [newDevice, setNewDevice] = useState({ name: '', deviceId: '', image: '' }); // Thông tin thiết bị mới
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false); // Trạng thái hiển thị form thêm thiết bị

  // Mock symbolic devices
  const symbolicDevices = [
    { name: 'Đèn phòng khách', deviceId: '001', state: 'Chưa kết nối', image: 'img1.jpg' },
    { name: 'Cam', deviceId: '002', state: 'Chưa kết nối', image: 'img2.jpg' },
    { name: 'Đèn', deviceId: '003', state: 'Chưa kết nối', image: 'img3.jpg' },
  ];

  // Set initial devices with symbolic devices
  useEffect(() => {
    setDevices(symbolicDevices);
  }, []);

  // Hàm xác thực thiết bị
  const handleVerifyDevice = async (deviceId) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await verifyDevice(deviceId, homeId);
      alert(`Xác thực thành công: ${result.message}`);
      // Optionally, update devices after verifying
    } catch (error) {
      setError(`Lỗi khi xác thực thiết bị: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm kết nối thiết bị
  const handleConnectDevice = async (deviceId) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await connectDevice(deviceId);
      alert(`Kết nối thành công: ${result.message}`);
      // Optionally, update devices after connection
    } catch (error) {
      setError(`Lỗi khi kết nối thiết bị: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm ngắt kết nối thiết bị
  const handleDisconnectDevice = async (deviceId) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await disconnectDevice(deviceId);
      alert(`Ngắt kết nối thành công: ${result.message}`);
      // Optionally, update devices after disconnection
    } catch (error) {
      setError(`Lỗi khi ngắt kết nối thiết bị: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm tìm kiếm thiết bị bằng ID
  const handleSearchDeviceById = async () => {
    setIsLoading(true);
    setError('');
    try {
      const device = await getDeviceById(selectedDeviceId);
      setDeviceDetails(device);
    } catch (error) {
      setError(`Lỗi khi tìm kiếm thiết bị: ${error.message}`);
      setDeviceDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm thêm thiết bị mới
  const handleAddDevice = () => {
    if (!newDevice.name || !newDevice.deviceId || !newDevice.image) {
      setError('Vui lòng nhập đầy đủ thông tin thiết bị và chọn ảnh!');
      return;
    }

    const deviceExists = devices.some((device) => device.deviceId === newDevice.deviceId);
    if (deviceExists) {
      setError('Thiết bị với mã ID này đã tồn tại!');
      return;
    }

    const updatedDevices = [...devices, { ...newDevice, state: 'Chưa kết nối' }];
    setDevices(updatedDevices);
    setNewDevice({ name: '', deviceId: '', image: '' });
    setError('');
  };

  // Handle image selection
  const handleImageSelection = (image) => {
    setNewDevice({ ...newDevice, image });
  };

  return (
    <div>
      <h1>Quản lý thiết bị</h1>

      {/* Nhập homeId */}
      <div>
        <label>
          Nhập Home ID:
          <input
            type="text"
            value={homeId}
            onChange={(e) => setHomeId(e.target.value)}
          />
        </label>
      </div>

      {/* Tìm kiếm thiết bị theo ID */}
      <div>
        <label>
          Tìm kiếm thiết bị theo ID:
          <input
            type="text"
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            style={{ marginRight: '10px' }}
          />
        </label>
        <button onClick={handleSearchDeviceById}>Tìm kiếm</button>
      </div>

      {/* Nút để hiển thị form thêm thiết bị */}
      <div>
        <button onClick={() => setShowAddDeviceForm(!showAddDeviceForm)}>
          {showAddDeviceForm ? 'Cancel' : 'Thêm Thiết Bị'}
        </button>
      </div>

      {/* Thêm thiết bị mới */}
      {showAddDeviceForm && (
        <div style={{ marginTop: '20px' }}>
          <h3>Thêm thiết bị mới:</h3>
          <label>
            Tên thiết bị:
            <input
              type="text"
              value={newDevice.name}
              onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
            />
          </label>
          <br />
          <label>
            Mã thiết bị:
            <input
              type="text"
              value={newDevice.deviceId}
              onChange={(e) => setNewDevice({ ...newDevice, deviceId: e.target.value })}
            />
          </label>
          <br />

          {/* Hiển thị các ảnh để chọn */}
          <div>
            <p>Chọn ảnh cho thiết bị:</p>
            <div style={{ display: 'flex' }}>
              {['img1.jpg', 'img2.jpg', 'img3.jpg'].map((img, index) => (
                <div
                  key={index}
                  style={{
                    marginRight: '10px',
                    cursor: 'pointer',
                    border: newDevice.image === img ? '2px solid blue' : 'none',
                  }}
                  onClick={() => handleImageSelection(img)}
                >
                  <img
                    src={`./imgs/${img}`}  // Update path here to reference images correctly
                    alt={`device ${index + 1}`}
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <br />
          <button onClick={handleAddDevice}>Thêm thiết bị</button>
        </div>
      )}

      {/* Hiển thị chi tiết thiết bị tìm thấy */}
      {deviceDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3>Chi tiết thiết bị:</h3>
          <p><strong>ID:</strong> {deviceDetails.deviceId}</p>
          <p><strong>Tên:</strong> {deviceDetails.name}</p>
          <p><strong>Trạng thái:</strong> {deviceDetails.state}</p>
          <p><strong>Thời gian kết nối:</strong> {new Date(deviceDetails.lastConnected).toLocaleString()}</p>
        </div>
      )}

      {/* Hiển thị lỗi */}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Hiển thị danh sách thiết bị */}
      <div>
        {isLoading ? (
          <p>Đang tải...</p>
        ) : (
          <ul>
            {devices.map((device) => (
              <li key={device.deviceId}>
                <p>ID: {device.deviceId}</p>
                <p>Name: {device.name}</p>
                <p>Trạng thái: {device.state}</p>
                <button onClick={() => handleVerifyDevice(device.deviceId)}>
                  Xác thực
                </button>
                <button onClick={() => handleConnectDevice(device.deviceId)}>
                  Kết nối
                </button>
                <button onClick={() => handleDisconnectDevice(device.deviceId)}>
                  Ngắt kết nối
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeviceManager;
