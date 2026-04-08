import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { useHealth } from '../context/HealthContext';
import { cn } from '../lib/utils';

export default function HomePage() {
  const { isProfileComplete } = useHealth();

  return (
    <div className="space-y-28 pb-28 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-20 lg:pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ethiopia-green/10 border border-ethiopia-green/20 text-ethiopia-green text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Globe className="w-4 h-4" />
              <span>Made for Ethiopia</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 leading-[1.2] tracking-tight">
              Your Health, <br />
              <span className="text-ethiopia-green bg-gradient-to-r from-ethiopia-green to-emerald-600 bg-clip-text text-transparent">The Ethiopian Way.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              Tena-AI is your personalized health companion that understands our culture,
              our food, and our traditions. Get daily plans tailored to your lifestyle.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link
                to={isProfileComplete ? "/dashboard" : "/profile"}
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                {isProfileComplete ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl border-2 border-slate-200 bg-white/60 backdrop-blur-sm hover:bg-white hover:border-slate-300 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-ethiopia-green/30 via-ethiopia-yellow/20 to-ethiopia-red/20 rounded-full blur-3xl -z-10 scale-150" />
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=800&fit=crop"
                alt="Healthy Ethiopian Food"
                className="rounded-3xl shadow-2xl border-4 border-white/50 ring-1 ring-slate-200/50 object-cover w-full max-w-md lg:max-w-lg hover:scale-[1.02] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 glass-card p-5 rounded-2xl shadow-xl max-w-xs backdrop-blur-md bg-white/80 border border-white/40 animate-bounce-slow">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-ethiopia-yellow to-amber-400 rounded-xl flex items-center justify-center shadow-md">
                    <Zap className="text-slate-800 w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-lg">Fasting Mode</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">Switch to plant-based plans during religious fasting seasons.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-5 mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-900 tracking-tight">Why Tena-AI?</h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">We&apos;ve built this specifically for the Ethiopian context, considering our unique dietary habits and lifestyle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <FeatureCard
            icon={Heart}
            title="Culturally Aware"
            description="Recommendations include Injera, Shiro, and other local staples you actually have in your kitchen."
            color="bg-gradient-to-br from-ethiopia-green to-emerald-700"
            delay={0.1}
          />
          <FeatureCard
            icon={Shield}
            title="Religious Integration"
            description="Seamlessly handles fasting and non-fasting periods according to Ethiopian traditions."
            color="bg-gradient-to-br from-ethiopia-yellow to-amber-600"
            delay={0.2}
          />
          <FeatureCard
            icon={Zap}
            title="AI Powered"
            description="Uses advanced Gemini AI to calculate the best nutritional balance for your specific body type."
            color="bg-gradient-to-br from-ethiopia-red to-rose-700"
            delay={0.3}
          />
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-ethiopia-green/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-ethiopia-red/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-14 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight">Join thousands of healthy Ethiopians.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Stat label="Active Users" value="10k+" />
            <Stat label="Meal Plans" value="50k+" />
            <Stat label="Local Foods" value="100+" />
            <Stat label="Health Tips" value="1k+" />
          </div>
          <Link
            to="/profile"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200"
    >
      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110", color)}>
        <Icon className="text-white w-7 h-7" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-ethiopia-green transition-colors">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="space-y-2">
      <div className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">{value}</div>
      <div className="text-slate-300 text-sm font-semibold uppercase tracking-wider">{label}</div>
    </div>
  );
}