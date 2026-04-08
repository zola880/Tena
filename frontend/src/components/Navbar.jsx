import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  Heart, 
  User, 
  LayoutDashboard, 
  Info, 
  Home, 
  LogOut, 
  LogIn, 
  Menu, 
  X,
  ChevronDown,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useHealth } from '../context/HealthContext';

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout, user, profile } = useHealth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Navigation items – Profile is NOT shown here (only in dropdown)
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    ...(isAuthenticated ? [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ] : []),
    { path: '/about', icon: Info, label: 'About' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  // Get user initials for avatar
  const userInitials = user?.email ? user.email.charAt(0).toUpperCase() : 'U';

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group transition-all duration-200 hover:scale-105"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-ethiopia-green to-ethiopia-green/80 rounded-xl flex items-center justify-center shadow-lg shadow-ethiopia-green/20">
              <Heart className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent hidden sm:inline">
              Tena-AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-ethiopia-green/10 text-ethiopia-green shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* User Menu (Desktop) */}
            {isAuthenticated ? (
              <div className="relative ml-4">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ethiopia-green to-ethiopia-green/80 flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {userInitials}
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-slate-500 transition-transform duration-200",
                    userDropdownOpen && "rotate-180"
                  )} />
                </button>

                {userDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {user?.email || 'User'}
                        </p>
                        {profile && (
                          <p className="text-xs text-slate-500 mt-1">
                            {profile.goal || 'Health goal not set'}
                          </p>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-4 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-ethiopia-green text-white hover:bg-ethiopia-green/90 transition-all shadow-md hover:shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-2 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "bg-ethiopia-green/10 text-ethiopia-green"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {isAuthenticated ? (
              <>
                <div className="border-t border-slate-100 my-2" />
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {user?.email || 'User'}
                  </p>
                  {profile && (
                    <p className="text-xs text-slate-500 mt-1">
                      {profile.goal || 'Health goal not set'}
                    </p>
                  )}
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="w-5 h-5" />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl text-sm font-medium bg-ethiopia-green text-white hover:bg-ethiopia-green/90 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}