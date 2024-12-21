// src/components/ControlAndImageManager.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { changeTime, changeMode } from '../services/api';
import './imageManager.css';

const ImageManager = ({ deviceId }) => {
  // State cho phần Control Settings
  const [mode, setMode] = useState('auto');
  const [timeout, setTimeout] = useState('');
  const [status, setStatus] = useState('');

  // State cho phần Image Manager
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [uploadTime, setUploadTime] = useState('');

  // Fetch danh sách hình ảnh từ API
  const fetchImages = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/detectionwarning/images/${deviceId}`);
      setImages(response.data);
    } catch (err) {
      setError('Failed to load images');
    }
  };

  // Fetch images khi component được mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Xử lý thay đổi khi người dùng chọn file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Xử lý upload hình ảnh
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const startTime = Date.now();
      await axios.post(`http://localhost:3001/detectionwarning/upload/${deviceId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const endTime = Date.now();
      setUploadTime(`${((endTime - startTime) / 1000).toFixed(2)} seconds`);

      setSuccessMessage('Image uploaded successfully!');
      setFile(null); // Clear file input
      setError(''); // Clear error message
      fetchImages(); // Refresh the image list after upload
    } catch (err) {
      setError('Error uploading the image');
    }
  };

  // Xử lý thay đổi thời gian
  const handleTimeChange = async () => {
    try {
      setStatus('Changing time...');
      await changeTime(deviceId, timeout);
      setStatus('Time changed successfully!');
    } catch (error) {
      setStatus('Error changing time.');
    }
  };

  // Xử lý thay đổi chế độ
  const handleModeChange = async () => {
    try {
      setStatus('Changing mode...');
      await changeMode(deviceId, mode);
      setStatus('Mode changed successfully!');
    } catch (error) {
      setStatus('Error changing mode.');
    }
  };

  // Gọi cả hai API khi người dùng nhấn "Apply"
  const handleSubmit = () => {
    handleTimeChange();
    handleModeChange();
  };

  return (
    <div className="control-and-image-manager">
      {/* Control Settings Section */}
      <div className="control-settings">
        <h1>Cảnh báo xâm nhập {deviceId}</h1>

        <div>
          <label>Time Out (seconds): </label>
          <input
            type="number"
            value={timeout}
            onChange={(e) => setTimeout(e.target.value)}
            placeholder="Set timeout (in seconds)"
          />
        </div>

        <div>
          <label>Mode: </label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        <button onClick={handleSubmit}>Apply</button>
        <p>{status}</p>
      </div>

      {/* Image Manager Section */}
      <div className="image-manager">
        {/* <h2>Danh sách</h2>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {uploadTime && <p className="upload-time">Upload Time: {uploadTime}</p>}


        <div className="upload-section">
          <h3>Upload New Image</h3>
          <form onSubmit={handleUpload}>
            <input type="file" onChange={handleFileChange} required />
            <button type="submit">Upload</button>
          </form>
        </div> */}

        {/* Danh sách hình ảnh */}
        <div className="image-list">
          <h3>Danh sách phát hiện xâm nhập</h3>
          {images.length === 0 ? (
            <p>No images found.</p>
          ) : (
            <ul>
              {images.map((image) => (
                <li key={image._id}>
                  <img src={image.url} alt="Uploaded" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
