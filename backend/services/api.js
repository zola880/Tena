import axios from 'axios';

const API_BASE_URL = 'https://tena-ic0w.onrender.com/api'; // deployed backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const register = (email, password) => api.post('/auth/register', { email, password });
export const login = (email, password) => api.post('/auth/login', { email, password });

// Profile endpoints
export const getProfile = () => api.get('/profile');
export const updateProfile = (profileData) => api.put('/profile', profileData);

// Daily input endpoints
export const getDailyInput = () => api.get('/daily');
export const saveDailyInput = (data) => api.post('/daily', data);

// Recommendation endpoints
export const generateRecommendation = () => api.post('/recommendations/generate');
export const getLatestRecommendation = () => api.get('/recommendations/latest');
export const getRecommendationHistory = () => api.get('/recommendations/history');

// Progress endpoints
export const addProgressEntry = (data) => api.post('/progress', data);
export const getProgressEntries = (limit = 30) => api.get(`/progress?limit=${limit}`);

export default api;