import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';
import { Heart, Mail, Lock, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'male',
    weightKg: '',
    heightCm: '',
    goal: 'maintain health',
    conditions: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useHealth(); // this now expects the full profile data
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!formData.age || !formData.weightKg || !formData.heightCm) {
      setError('Please fill in all required profile fields');
      return;
    }

    setIsLoading(true);
    try {
      // Pass all data to the register function
      await register({
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age),
        gender: formData.gender,
        weightKg: parseFloat(formData.weightKg),
        heightCm: parseInt(formData.heightCm),
        goal: formData.goal,
        conditions: formData.conditions,
      });
      navigate('/dashboard'); // profile is already complete
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-ethiopia-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-ethiopia-green/20">
            <Heart className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-black text-slate-900">Join Tena-AI</h1>
          <p className="text-slate-500 mt-2">Create your account and health profile</p>
        </div>

        <div className="glass-card rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <hr className="my-4 border-slate-200" />

            {/* Profile Fields */}
            <h3 className="text-lg font-bold text-slate-800">Your Health Profile</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Age</label>
                <input
                  type="number"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 25"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Weight (kg)</label>
                <input
                  type="number"
                  name="weightKg"
                  required
                  value={formData.weightKg}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 70"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Height (cm)</label>
                <input
                  type="number"
                  name="heightCm"
                  required
                  value={formData.heightCm}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g., 170"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Health Goal</label>
              <select name="goal" value={formData.goal} onChange={handleChange} className="input-field">
                <option value="lose weight">Lose weight</option>
                <option value="gain muscle">Gain muscle</option>
                <option value="maintain health">Maintain health</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Health Conditions (optional)</label>
              <textarea
                name="conditions"
                value={formData.conditions}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Diabetes, Hypertension, ..."
                rows="2"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create Account & Profile'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-ethiopia-green font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}