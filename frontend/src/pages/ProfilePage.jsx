import { useState, useEffect } from 'react';
import { User, Save, CheckCircle2, Scale, Ruler, Target, AlertCircle } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { cn } from '../lib/utils';
import api from '../lib/api'; // ✅ Import api for direct calls

export default function ProfilePage() {
  const { profile, setProfile } = useHealth();
  
  const [formData, setFormData] = useState({
    age: 25,
    gender: 'male',
    weight: 70,
    height: 170,
    goal: 'maintain health',
    conditions: '',
  });
  
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Fetch profile from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Try context first, fallback to direct API call
        if (profile) {
          setFormData(profile);
        } else {
          const res = await api.getProfile();
          setFormData(res.data);
          setProfile?.(res.data); // update context if available
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
        setError('Could not load profile. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [profile, setProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // ✅ Save to backend
      const res = await api.updateProfile(formData);
      
      // ✅ Update local state + context
      setProfile?.(res.data);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Loading state
  if (isLoading && !profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-ethiopia-green/30 border-t-ethiopia-green rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Your Health Profile</h1>
        <p className="text-slate-500">This information helps us tailor recommendations to your body and goals.</p>
      </div>

      {/* ✅ Error Banner */}
      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 rounded-2xl text-red-700 text-sm border border-red-100">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-[32px] p-8 text-center space-y-6 sticky top-24">
            <div className="w-24 h-24 bg-ethiopia-green/10 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <User className="text-ethiopia-green w-12 h-12" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {formData.gender === 'male' ? 'Gash' : 'Emebet'} {formData.age}
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mt-1">{formData.goal}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Scale className="w-4 h-4 text-slate-400 mx-auto mb-2" />
                <div className="text-xl font-black text-slate-800">{formData.weight}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Weight (kg)</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Ruler className="w-4 h-4 text-slate-400 mx-auto mb-2" />
                <div className="text-xl font-black text-slate-800">{formData.height}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Height (cm)</div>
              </div>
            </div>

            <div className="pt-4">
               <div className="p-4 bg-ethiopia-green/5 rounded-2xl border border-ethiopia-green/10 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-ethiopia-green" />
                  <span className="text-xs font-bold text-ethiopia-green uppercase">Current Goal</span>
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  {formData.goal === 'lose weight' ? 'Focusing on calorie deficit and high-fiber local foods like Shiro.' : 
                   formData.goal === 'gain muscle' ? 'Prioritizing protein-rich foods like Doro Wat and legumes.' : 
                   'Maintaining a balanced diet with traditional Ethiopian staples.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card rounded-[32px] p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                <input 
                  type="number" 
                  className="input-field py-3 text-lg font-bold" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                <select 
                  className="input-field py-3 text-lg font-bold"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                <input 
                  type="number" 
                  className="input-field py-3 text-lg font-bold" 
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Height (cm)</label>
                <input 
                  type="number" 
                  className="input-field py-3 text-lg font-bold" 
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Primary Health Goal</label>
              <div className="grid grid-cols-1 gap-3">
                {['lose weight', 'gain muscle', 'maintain health'].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setFormData({...formData, goal})}
                    className={cn(
                      "py-4 px-6 text-lg font-bold rounded-2xl border text-left flex items-center justify-between transition-all",
                      formData.goal === goal 
                        ? "bg-ethiopia-green/10 border-ethiopia-green text-ethiopia-green shadow-sm" 
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {goal.charAt(0).toUpperCase() + goal.slice(1)}
                    {formData.goal === goal && <CheckCircle2 className="w-6 h-6" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Health Conditions (Optional)</label>
              <textarea 
                className="input-field min-h-[100px] py-4 text-lg" 
                placeholder="e.g. Diabetes, Hypertension, Gluten Sensitivity..."
                value={formData.conditions}
                onChange={(e) => setFormData({...formData, conditions: e.target.value})}
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-4 text-xl flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSaved ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Profile Updated!
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}