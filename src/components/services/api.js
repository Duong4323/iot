import axios from 'axios';

// Định nghĩa URL backend
const API_URL = 'http://localhost:3001/auth';  // URL của NestJS API
const DETECTION_API_URL = 'http://localhost:3001/detectionwarning'; // URL của API khác
const DEVICE_API_URL = 'http://localhost:3001/device'; // URL của API Device
const HOME_API_URL = 'http://localhost:3001/home';  // URL của API Home

// Đăng ký người dùng
export const register = async (registerData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, registerData);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Đăng nhập người dùng
export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data; // Chứa access_token
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Thay đổi mật khẩu
export const changePassword = async (changePasswordData, token) => {
  try {
    const response = await axios.patch(
      `${API_URL}/change-password`,
      changePasswordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Tải ảnh lên (từ file ảnh, cùng với deviceId)
export const uploadImage = async (file, deviceId) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await axios.post(
      `${DETECTION_API_URL}/upload/${deviceId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Lấy tất cả ảnh theo deviceId
export const getImagesByDeviceId = async (deviceId) => {
  try {
    const response = await axios.get(`${DETECTION_API_URL}/images/${deviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Thay đổi thời gian sáng đèn
export const changeTime = async (deviceId, timeout) => {
  try {
    const response = await axios.post(
      `${DETECTION_API_URL}/changetime/${deviceId}`,
      { timeout }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Thay đổi chế độ hoạt động (auto/manual)
export const changeMode = async (deviceId, mode) => {
  try {
    const response = await axios.post(
      `${DETECTION_API_URL}/changemode/${deviceId}`,
      { mode }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Xác thực thiết bị
export const verifyDevice = async (deviceId, homeId) => {
  try {
    const response = await axios.post(`${DEVICE_API_URL}/verify/${deviceId}`, { homeId });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Kết nối thiết bị
export const connectDevice = async (deviceId) => {
  try {
    const response = await axios.post(`${DEVICE_API_URL}/${deviceId}/connect`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Ngắt kết nối thiết bị
export const disconnectDevice = async (deviceId) => {
  try {
    const response = await axios.post(`${DEVICE_API_URL}/${deviceId}/disconnect`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Lấy danh sách tất cả thiết bị theo homeId
export const getDevicesByHomeId = async (homeId) => {
  try {
    const response = await axios.get(`${DEVICE_API_URL}/home/${homeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Lấy thông tin thiết bị theo deviceId
export const getDeviceById = async (deviceId) => {
  try {
    const response = await axios.get(`${DEVICE_API_URL}/${deviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// ** Các API liên quan đến Home (Ngôi nhà) **

// Lấy tất cả homes của người dùng
export const getHomes = async (token) => {
  try {
    const response = await axios.get(`${HOME_API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Tạo ngôi nhà mới
export const createHome = async (homeData, token) => {
  try {
    const response = await axios.post(`${HOME_API_URL}/create`, homeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Cập nhật thông tin ngôi nhà
export const updateHome = async (homeId, homeData, token) => {
  try {
    const response = await axios.put(`${HOME_API_URL}/update/${homeId}`, homeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Xóa ngôi nhà
export const deleteHome = async (homeId, token) => {
  try {
    const response = await axios.delete(`${HOME_API_URL}/delete/${homeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Thêm thành viên vào ngôi nhà
export const addMemberToHome = async (homeId, memberId, token) => {
  try {
    const response = await axios.post(
      `${HOME_API_URL}/${homeId}/members/${memberId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};

// Xóa thành viên khỏi ngôi nhà
export const removeMemberFromHome = async (homeId, memberId, token) => {
  try {
    const response = await axios.delete(
      `${HOME_API_URL}/${homeId}/members/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};
// Lấy thông tin ngôi nhà theo homeId
export const getHomeById = async (homeId, token) => {
  try {
    const response = await axios.get(`${HOME_API_URL}/${homeId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Đảm bảo token hợp lệ
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'Đã xảy ra lỗi!');
  }
};
export const fetchHomes = async (token) => {
  try {
    const response = await axios.get(`${HOME_API_URL}/homes`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
      },
    });
    return response.data; // Assuming the response data contains the list of homes
  } catch (error) {
    throw new Error('Error fetching homes');
  }
};
export const addMember = async (homeId, memberId, token) => {
  try {
    const response = await axios.post(
      `${HOME_API_URL}/homes/${homeId}/members`, // Assuming this is the endpoint to add members to a home
      { memberId }, // The body of the request, assuming the API accepts memberId to add
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token for authentication
        },
      }
    );
    return response.data; // Assuming the API response contains the updated home data
  } catch (error) {
    throw new Error('Error adding member to the home');
  }
};
export const removeMember = async (homeId, memberId, token) => {
  try {
    const response = await axios.delete(
      `${HOME_API_URL}/homes/${homeId}/members/${memberId}`, // Assuming this is the endpoint to remove a member
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token for authentication
        },
      }
    );
    return response.data; // Assuming the API response contains the updated home data
  } catch (error) {
    throw new Error('Error removing member from the home');
  }
};
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/email/${email}`);
    return response.data;
  } catch (error) {
    throw new Error('User not found');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

export const updatePassword = async (email, password) => {
  try {
    const response = await axios.put(`${API_URL}/password`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Failed to update password');
  }
};

export const addOwnedHome = async (userId, homeId) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/owned-homes`, { homeId });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add owned home');
  }
};

export const addMemberHome = async (userId, homeId) => {
  try {
    const response = await axios.post(`${API_URL}/${userId}/member-homes`, { homeId });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add member home');
  }
};

export const removeMemberHome = async (userId, homeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}/member-homes/${homeId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove member home');
  }
};
