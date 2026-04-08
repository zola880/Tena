import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Utensils, 
  Activity, 
  Dumbbell, 
  Info, 
  RefreshCw, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Heart,
  TrendingUp,
  History,
  Plus,
  Scale,
  Smile
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { useHealth } from '../context/HealthContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { 
    profile, 
    dailyInput, 
    setDailyInput, 
    recommendation, 
    setRecommendation,
    isProfileComplete, 
    progressHistory, 
    addProgressEntry 
  } = useHealth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('plan');
  const [showLogModal, setShowLogModal] = useState(false);
  const [logData, setLogData] = useState({
    weight: profile?.weight || 0,
    mood: 'normal',
    activityCompleted: true,
    mealAdherence: 'full'
  });

  // Auto‑save an empty daily input if none exists for today
  useEffect(() => {
    const hasAnyInput = dailyInput && (
      dailyInput.availableFoods ||
      dailyInput.healthCondition ||
      dailyInput.mood
    );
    if (!hasAnyInput && dailyInput && !dailyInput._id) {
      // Save the current (mostly empty) daily input to create a record
      setDailyInput(dailyInput);
    }
  }, [dailyInput, setDailyInput]);

  if (!isProfileComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-slate-400 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-800">Profile Incomplete</h2>
        <p className="text-slate-600">Please complete your health profile first to get personalized recommendations.</p>
        <Link to="/profile" className="btn-primary inline-flex items-center gap-2">
          Complete Profile
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  const generateRecommendation = async () => {
    if (!profile) return;

    setIsLoading(true);
    setError(null);

    try {
      await setRecommendation();
    } catch (err) {
      console.error(err);
      // Extract the meaningful message from the backend response
      const backendMessage = err.response?.data?.message || err.message;
      setError(backendMessage || 'Failed to generate recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogProgress = () => {
    addProgressEntry({
      ...logData,
      date: new Date().toISOString()
    });
    setShowLogModal(false);
  };

  // Safe check – only render plan if the recommendation has the required fields
  const hasValidRecommendation = recommendation && recommendation.meals && recommendation.activity;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-black text-slate-900">Health Dashboard</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('plan')}
              className={cn(
                "text-sm font-bold pb-2 border-b-2 transition-all",
                activeTab === 'plan' ? "border-ethiopia-green text-ethiopia-green" : "border-transparent text-slate-400"
              )}
            >
              Daily Plan
            </button>
            <button 
              onClick={() => setActiveTab('progress')}
              className={cn(
                "text-sm font-bold pb-2 border-b-2 transition-all",
                activeTab === 'progress' ? "border-ethiopia-green text-ethiopia-green" : "border-transparent text-slate-400"
              )}
            >
              Progress Tracking
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowLogModal(true)}
            className="px-6 py-3 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Log Progress
          </button>
          <button 
            onClick={generateRecommendation}
            disabled={isLoading}
            className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-ethiopia-green/20"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            {recommendation ? "Refresh Plan" : "Generate Plan"}
          </button>
        </div>
      </div>

      {activeTab === 'plan' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Sidebar – unchanged */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2 border-b border-slate-100 pb-4">
                <Calendar className="w-5 h-5 text-ethiopia-green" />
                Today&apos;s Context
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Available Foods</label>
                  <textarea 
                    className="input-field min-h-[100px] text-sm"
                    placeholder="e.g. Injera, Shiro, Eggs, Spinach, Avocado..."
                    value={dailyInput.availableFoods}
                    onChange={(e) => setDailyInput({...dailyInput, availableFoods: e.target.value})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Dumbbell className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Gym Access?</span>
                  </div>
                  <button 
                    onClick={() => setDailyInput({...dailyInput, canGoToGym: !dailyInput.canGoToGym})}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      dailyInput.canGoToGym ? "bg-ethiopia-green" : "bg-slate-300"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      dailyInput.canGoToGym ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Health Condition</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['normal', 'energetic', 'tired', 'sick'].map((cond) => (
                      <button
                        key={cond}
                        onClick={() => setDailyInput({...dailyInput, healthCondition: cond})}
                        className={cn(
                          "py-2 px-2 text-[10px] font-bold rounded-xl border transition-all",
                          dailyInput.healthCondition === cond 
                            ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {cond.charAt(0).toUpperCase() + cond.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Your Mood</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['normal', 'happy', 'stressed', 'low'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setDailyInput({...dailyInput, mood: m})}
                        className={cn(
                          "py-2 px-2 text-[10px] font-bold rounded-xl border transition-all",
                          dailyInput.mood === m 
                            ? "bg-purple-50 border-purple-200 text-purple-700 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Religious Status</label>
                  <div className="grid grid-cols-1 gap-2">
                    {['non-fasting', 'fasting', 'special event'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setDailyInput({...dailyInput, religiousStatus: status})}
                        className={cn(
                          "py-3 px-3 text-xs font-bold rounded-xl border transition-all",
                          dailyInput.religiousStatus === status 
                            ? "bg-ethiopia-yellow/20 border-ethiopia-yellow text-slate-800 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {status === 'fasting' ? '⛪ Fasting' : status === 'special event' ? '🎉 Special Event' : '🍽️ Non-Fasting'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Economic Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['low budget', 'medium', 'high'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setDailyInput({...dailyInput, economicStatus: status})}
                        className={cn(
                          "py-2 px-1 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all",
                          dailyInput.economicStatus === status 
                            ? "bg-green-50 border-green-200 text-green-700 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {status.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Activity Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['busy', 'normal', 'free'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setDailyInput({...dailyInput, activityLevel: level})}
                        className={cn(
                          "py-3 px-1 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all",
                          dailyInput.activityLevel === level 
                            ? "bg-ethiopia-red/10 border-ethiopia-red text-ethiopia-red" 
                            : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="lg:col-span-3 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Output Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {hasValidRecommendation ? (
                <motion.div 
                  key="recommendation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* AI Feedback Section */}
                  {recommendation.feedback && (
                    <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-ethiopia-green/20 rounded-full blur-[100px]" />
                      <div className="relative z-10 flex items-start gap-6">
                        <div className="w-16 h-16 bg-ethiopia-green/20 rounded-2xl flex items-center justify-center shrink-0">
                          <TrendingUp className="text-ethiopia-green w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-white">Progress Insights</h4>
                          <p className="text-slate-300 leading-relaxed">{recommendation.feedback}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Meals Section */}
                  <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="bg-ethiopia-green px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Utensils className="text-white w-6 h-6" />
                        <h3 className="text-white font-bold text-lg">Nutrition Plan</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wider">
                        {dailyInput.religiousStatus}
                      </span>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <MealCard title="Breakfast" content={recommendation.meals.breakfast} icon="☕" />
                      <MealCard title="Lunch" content={recommendation.meals.lunch} icon="🥘" />
                      <MealCard title="Dinner" content={recommendation.meals.dinner} icon="🥣" />
                    </div>
                  </div>

                  {/* Exercise Section */}
                  <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="bg-ethiopia-red px-6 py-4 flex items-center gap-3">
                      <Activity className="text-white w-6 h-6" />
                      <h3 className="text-white font-bold text-lg">Daily Movement</h3>
                    </div>
                    <div className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-ethiopia-red/10 rounded-2xl flex items-center justify-center shrink-0">
                          <Dumbbell className="text-ethiopia-red w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-bold text-slate-800">{recommendation.activity.type}</h4>
                            <span className="px-2 py-0.5 bg-ethiopia-red/10 text-ethiopia-red text-xs font-bold rounded-full">
                              {recommendation.activity.duration}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed text-lg">
                            Tailored for your {dailyInput.healthCondition} condition and {dailyInput.activityLevel} schedule.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Actions */}
                  {recommendation.dailyActions && recommendation.dailyActions.length > 0 && (
                    <div className="glass-card rounded-3xl overflow-hidden">
                      <div className="bg-blue-600 px-6 py-4 flex items-center gap-3">
                        <CheckCircle2 className="text-white w-6 h-6" />
                        <h3 className="text-white font-bold text-lg">Daily Actions</h3>
                      </div>
                      <div className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {recommendation.dailyActions.map((action, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle2 className="text-white w-4 h-4" />
                              </div>
                              <span className="text-sm font-bold text-blue-900">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Health Tip */}
                  {recommendation.tip && (
                    <div className="bg-ethiopia-yellow/20 border-2 border-ethiopia-yellow/30 rounded-3xl p-8 flex items-start gap-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Info className="w-24 h-24 text-ethiopia-yellow" />
                      </div>
                      <div className="w-14 h-14 bg-ethiopia-yellow rounded-2xl flex items-center justify-center shrink-0 shadow-lg relative z-10">
                        <Info className="text-slate-800 w-8 h-8" />
                      </div>
                      <div className="relative z-10">
                        <h4 className="font-black text-slate-900 text-xl mb-2 uppercase tracking-tight">Wisdom for Today</h4>
                        <p className="text-slate-800 text-lg italic leading-relaxed">&quot;{recommendation.tip}&quot;</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 border-4 border-dashed border-slate-200 rounded-[40px] bg-white/50"
                >
                  <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mb-8 animate-pulse">
                    <Heart className="text-slate-300 w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-400 mb-3">Ready to Plan Your Day?</h3>
                  <p className="text-slate-400 max-w-sm text-lg">Tell us what you have available today and we&apos;ll generate your personalized Ethiopian health guide.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // Progress Tab (unchanged – kept as is from your original)
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-8 rounded-[40px] space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                    <Scale className="w-6 h-6 text-ethiopia-green" />
                    Weight Progress
                  </h3>
                  <span className="text-sm font-bold text-slate-400">Last 30 Days</span>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[...progressHistory].reverse()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        domain={['dataMin - 2', 'dataMax + 2']}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        labelFormatter={(str) => new Date(str).toLocaleDateString()}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#009739" 
                        strokeWidth={4} 
                        dot={{ r: 6, fill: '#009739', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card p-8 rounded-[40px] space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  Activity Consistency
                </h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[...progressHistory].reverse().slice(-7)}>
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(str) => new Date(str).toLocaleDateString(undefined, { weekday: 'short' })}
                        stroke="#94a3b8"
                        fontSize={12}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        cursor={{ fill: '#f8fafc' }}
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar 
                        dataKey="activityCompleted" 
                        fill="#2563eb" 
                        radius={[8, 8, 0, 0]} 
                        name="Activity Done"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="glass-card p-8 rounded-[40px] bg-slate-900 text-white space-y-6">
                <h3 className="text-lg font-bold">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <span className="text-slate-400 text-sm">Current Weight</span>
                    <span className="text-xl font-black">{progressHistory[0]?.weight || profile?.weight}kg</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <span className="text-slate-400 text-sm">Consistency</span>
                    <span className="text-xl font-black">
                      {Math.round((progressHistory.filter(p => p.activityCompleted).length / (progressHistory.length || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                    <span className="text-slate-400 text-sm">Days Logged</span>
                    <span className="text-xl font-black">{progressHistory.length}</span>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-[40px] space-y-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <History className="w-5 h-5 text-slate-400" />
                  Recent Logs
                </h3>
                <div className="space-y-4">
                  {progressHistory.slice(0, 5).map((entry, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {new Date(entry.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">{entry.mood} mood</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900">{entry.weight}kg</p>
                        <div className="flex gap-1 justify-end mt-1">
                          <div className={cn("w-2 h-2 rounded-full", entry.activityCompleted ? "bg-green-500" : "bg-red-500")} />
                          <div className={cn("w-2 h-2 rounded-full", entry.mealAdherence === 'full' ? "bg-green-500" : entry.mealAdherence === 'partial' ? "bg-yellow-500" : "bg-red-500")} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Progress Modal – unchanged */}
      <AnimatePresence>
        {showLogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-8 space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-slate-900">Log Daily Progress</h2>
                <button onClick={() => setShowLogModal(false)} className="text-slate-400 hover:text-slate-600">
                  <Plus className="w-6 h-6 rotate-45" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Current Weight (kg)</label>
                  <div className="relative">
                    <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="number" 
                      className="input-field pl-12"
                      value={logData.weight}
                      onChange={(e) => setLogData({...logData, weight: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">How was your mood?</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['happy', 'normal', 'stressed', 'low'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setLogData({...logData, mood: m})}
                        className={cn(
                          "py-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1",
                          logData.mood === m ? "border-ethiopia-green bg-ethiopia-green/5 text-ethiopia-green" : "border-slate-100 text-slate-400"
                        )}
                      >
                        <Smile className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase">{m}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Dumbbell className="text-slate-400 w-5 h-5" />
                    <span className="font-bold text-slate-700">Activity Completed?</span>
                  </div>
                  <button 
                    onClick={() => setLogData({...logData, activityCompleted: !logData.activityCompleted})}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      logData.activityCompleted ? "bg-ethiopia-green" : "bg-slate-300"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                      logData.activityCompleted ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Meal Adherence</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['full', 'partial', 'none'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setLogData({...logData, mealAdherence: level})}
                        className={cn(
                          "py-3 rounded-2xl border-2 transition-all font-bold text-xs uppercase",
                          logData.mealAdherence === level ? "border-ethiopia-green bg-ethiopia-green/5 text-ethiopia-green" : "border-slate-100 text-slate-400"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleLogProgress}
                  className="w-full py-4 bg-ethiopia-green text-white rounded-2xl font-black text-lg shadow-xl shadow-ethiopia-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Save Progress
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MealCard({ title, content, icon }) {
  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
      </div>
      <p className="text-slate-800 font-bold leading-relaxed">{content || 'Not specified'}</p>
    </div>
  );
}