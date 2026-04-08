import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token to every request
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

// Response interceptor: handle 401 (unauthorized) by logging out
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

// Auth methods – now includes profile fields
api.register = (email, password, age, gender, weightKg, heightCm, goal, conditions) => 
  api.post('/auth/register', { email, password, age, gender, weightKg, heightCm, goal, conditions });

api.login = (email, password) => api.post('/auth/login', { email, password });

// Profile
api.getProfile = () => api.get('/profile');
api.updateProfile = (data) => api.put('/profile', data);

// Daily input
api.getDailyInput = () => api.get('/daily');
api.saveDailyInput = (data) => api.post('/daily', data);

// Recommendations
api.generateRecommendation = () => api.post('/recommendations/generate');
api.getLatestRecommendation = () => api.get('/recommendations/latest');
api.getRecommendationHistory = () => api.get('/recommendations/history');

// Progress
api.addProgressEntry = (data) => api.post('/progress', data);
api.getProgressEntries = (limit = 30) => api.get(`/progress?limit=${limit}`);

export default api;s