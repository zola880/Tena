import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const HealthContext = createContext(undefined);

export function HealthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [profile, setProfileState] = useState(null);
  const [dailyInput, setDailyInputState] = useState({
    availableFoods: '',
    canGoToGym: false,
    religiousStatus: 'non-fasting',
    activityLevel: 'normal',
    healthCondition: 'normal',
    mood: 'normal',
    economicStatus: 'medium',
  });
  const [recommendation, setRecommendationState] = useState(null); // state variable is 'recommendation'
  const [progressHistory, setProgressHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set up axios authorization header
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      loadUserData();
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setLoading(false);
    }
  }, [token]);

  const loadUserData = async () => {
    try {
      const [profileRes, dailyRes, recRes, progressRes] = await Promise.all([
        api.getProfile().catch(() => ({ data: null })),
        api.getDailyInput().catch(() => ({ data: null })),
        api.getLatestRecommendation().catch(() => ({ data: null })),
        api.getProgressEntries().catch(() => ({ data: [] })),
      ]);

      if (profileRes.data) setProfileState(profileRes.data);
      if (dailyRes.data) setDailyInputState(prev => ({ ...prev, ...dailyRes.data }));
      if (recRes.data) setRecommendationState(recRes.data);
      if (progressRes.data) setProgressHistory(progressRes.data);
    } catch (err) {
      console.error('Failed to load user data', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    const response = await api.register(
      userData.email,
      userData.password,
      userData.age,
      userData.gender,
      userData.weightKg,
      userData.heightCm,
      userData.goal,
      userData.conditions
    );
    const { token: newToken, userId } = response.data;
    setToken(newToken);
    setUser({ id: userId, email: userData.email });
    return response.data;
  };

  const login = async (email, password) => {
    const response = await api.login(email, password);
    const { token: newToken, userId } = response.data;
    setToken(newToken);
    setUser({ id: userId, email });
    return response.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setProfileState(null);
    setRecommendationState(null);
    setProgressHistory([]);
    setDailyInputState({
      availableFoods: '',
      canGoToGym: false,
      religiousStatus: 'non-fasting',
      activityLevel: 'normal',
      healthCondition: 'normal',
      mood: 'normal',
      economicStatus: 'medium',
    });
  };

  const setProfile = async (newProfile) => {
    const res = await api.updateProfile(newProfile);
    setProfileState(res.data);
  };

  const setDailyInput = async (newInput) => {
    setDailyInputState(newInput);
    await api.saveDailyInput(newInput);
  };

  const generateRecommendation = async () => {
    const res = await api.generateRecommendation();
    setRecommendationState(res.data);
    return res.data;
  };

  const addProgressEntry = async (entry) => {
    const res = await api.addProgressEntry(entry);
    setProgressHistory(prev => [res.data, ...prev].slice(0, 30));
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    profile,
    setProfile,
    dailyInput,
    setDailyInput,
    recommendation,           // ✅ state variable (not recommendationState)
    setRecommendation: generateRecommendation,  // ✅ function to generate new plan
    progressHistory,
    addProgressEntry,
    isProfileComplete: !!profile,
    register,
    login,
    logout,
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}