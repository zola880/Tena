import axios from 'axios';

// ✅ Backend URL with fallback
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

// ================= TOKEN =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= ERROR HANDLING =================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
// ================= AUTH =================

// FIXED: backend already has /api prefix in baseURL
api.register = (data) => api.post('/auth/register', data);

api.login = (email, password) =>
  api.post('/auth/login', { email, password });

// ================= PROFILE =================
api.getProfile = () => api.get('/profile');
api.updateProfile = (data) => api.put('/profile', data);

// ================= DAILY =================
api.getDailyInput = () => api.get('/daily');
api.saveDailyInput = (data) => api.post('/daily', data);

// ================= RECOMMENDATIONS =================
api.generateRecommendation = () => api.post('/recommendations/generate');
api.getLatestRecommendation = () => api.get('/recommendations/latest');
api.getRecommendationHistory = () => api.get('/recommendations/history');

// ================= PROGRESS =================
api.addProgressEntry = (data) => api.post('/progress', data);
api.getProgressEntries = (limit = 30) =>
  api.get(`/progress?limit=${limit}`);

export default api;