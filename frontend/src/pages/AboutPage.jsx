import { motion } from 'motion/react';
import { 
  Heart, 
  Zap, 
  Cpu, 
  Database, 
  Layout, 
  Utensils, 
  Dumbbell, 
  Coins, 
  CheckCircle2,
  Code,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ethiopia-green/10 border border-ethiopia-green/20 text-ethiopia-green text-sm font-bold uppercase tracking-widest"
        >
          <Sparkles className="w-4 h-4" />
          System Proposal &amp; Overview
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 leading-tight">
          How <span className="text-ethiopia-green">Tena-AI</span> Works
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A comprehensive breakdown of the architecture, logic, and cultural intelligence 
          powering Ethiopia&apos;s first personalized AI health assistant.
        </p>
      </section>

      {/* Core Architecture */}
      <section className="space-y-12">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
          <Cpu className="w-8 h-8 text-ethiopia-green" />
          <h2 className="text-3xl font-display font-bold text-slate-900">Technical Architecture</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TechCard 
            icon={Code}
            title="Frontend Stack"
            description="Built with React 19 and Vite for lightning-fast performance. Converted to JavaScript for simplicity and flexibility."
          />
          <TechCard 
            icon={Zap}
            title="AI Engine"
            description="Powered by Google&apos;s Gemini 3 Flash model, specifically prompted with Ethiopian cultural and nutritional datasets."
          />
          <TechCard 
            icon={Database}
            title="Data Persistence"
            description="Uses browser LocalStorage for profile data, ensuring privacy while maintaining a seamless &apos;always-on&apos; experience."
          />
        </div>
      </section>

      {/* The Intelligence Logic */}
      <section className="bg-slate-900 rounded-[48px] p-12 md:p-20 text-white space-y-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-ethiopia-green/20 rounded-full blur-[120px] -z-0" />
        
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-display font-bold">The Decision Engine</h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Tena-AI doesn&apos;t just give generic advice. It processes multiple layers of context 
            to create a plan that fits your reality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <LogicItem 
            icon={Utensils}
            title="Nutritional Intelligence"
            points={[
              "Religious Fasting: Automatically filters out animal products during Orthodox fasting seasons.",
              "Local Staples: Prioritizes Teff, Shiro, Legumes, and local vegetables over imported goods.",
              "Budget Awareness: Adjusts recipes based on Low, Medium, or High economic status."
            ]}
          />
          <LogicItem 
            icon={Dumbbell}
            title="Physical Adaptation"
            points={[
              "Health State: Suggests recovery/rest when sick, and high-intensity when energetic.",
              "Environment: Switches to equipment-free home workouts if gym access is unavailable.",
              "Schedule: Compresses workouts for 'Busy' days and expands them for 'Free' time."
            ]}
          />
          <LogicItem 
            icon={Heart}
            title="Emotional Wellness"
            points={[
              "Mood Tracking: Adjusts 'Daily Actions' to include stress relief or motivation based on mood.",
              "Holistic Tips: Provides culturally relevant wisdom (Ethiopian proverbs and health tips)."
            ]}
          />
          <LogicItem 
            icon={Coins}
            title="Economic Accessibility"
            points={[
              "Affordability: Ensures 'Low Budget' plans use the most cost-effective local ingredients.",
              "Practicality: Only suggests foods the user explicitly lists as 'available' today."
            ]}
          />
        </div>
      </section>

      {/* Data Flow Diagram (Text-based) */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-display font-bold text-slate-900">The Data Journey</h2>
          <p className="text-slate-500">How your input becomes a health plan in seconds.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          <FlowStep step="1" title="User Input" desc="Profile + Daily Context" />
          <div className="hidden md:block w-12 h-px bg-slate-200" />
          <FlowStep step="2" title="Contextual Prompt" desc="AI Logic Processing" />
          <div className="hidden md:block w-12 h-px bg-slate-200" />
          <FlowStep step="3" title="Gemini Analysis" desc="Real-time Generation" />
          <div className="hidden md:block w-12 h-px bg-slate-200" />
          <FlowStep step="4" title="Structured Output" desc="Personalized Dashboard" />
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
            <Layout className="w-8 h-8 text-ethiopia-red" />
            <h2 className="text-3xl font-display font-bold text-slate-900">Design Philosophy</h2>
          </div>
          <p className="text-slate-600 text-lg leading-relaxed">
            We believe health apps should feel warm and familiar, not clinical. 
            Tena-AI uses a &quot;Modern Ethiopia&quot; aesthetic—combining the vibrant colors 
            of our heritage with clean, accessible digital interfaces.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-ethiopia-green w-5 h-5" />
              <span className="font-medium text-slate-800">High-Contrast Typography for Readability</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-ethiopia-green w-5 h-5" />
              <span className="font-medium text-slate-800">Mobile-First, Touch-Friendly Controls</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-ethiopia-green w-5 h-5" />
              <span className="font-medium text-slate-800">Culturally Relevant Iconography</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 rounded-[48px] p-8 aspect-square flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ethiopia-green/10 via-ethiopia-yellow/10 to-ethiopia-red/10" />
          <div className="relative z-10 text-center space-y-4">
            <div className="w-32 h-32 bg-white rounded-[32px] shadow-2xl flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
              <Heart className="text-ethiopia-green w-16 h-16" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Tena-AI</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Version 2.0 (Tracking Enabled)</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center py-20 bg-ethiopia-green rounded-[48px] text-white space-y-8">
        <h2 className="text-4xl md:text-6xl font-display font-black">Ready to live better?</h2>
        <p className="text-white/80 text-xl max-w-xl mx-auto">
          Experience the power of AI tailored to your Ethiopian life.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-4 bg-white text-ethiopia-green rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform">
            Start Your Journey
          </button>
        </div>
      </section>

      <footer className="text-center text-slate-400 text-sm pb-10">
        &copy; 2026 Tena-AI System Proposal. All rights reserved.
      </footer>
    </div>
  );
}

function TechCard({ icon: Icon, title, description }) {
  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center">
        <Icon className="text-slate-600 w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function LogicItem({ icon: Icon, title, points }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
          <Icon className="text-white w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-ethiopia-green rounded-full mt-1.5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowStep({ step, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center space-y-3 px-6">
      <div className="w-12 h-12 rounded-full bg-ethiopia-green text-white font-black flex items-center justify-center shadow-lg">
        {step}
      </div>
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
}
