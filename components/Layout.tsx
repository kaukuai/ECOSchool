
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, ShoppingBag, Target, Menu, LogOut, Globe, Shield, User as UserIcon } from 'lucide-react';
import { User, Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import AvatarRenderer from './AvatarRenderer';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage, getUserTitle } = useLanguage();
  const userTitle = getUserTitle(user.level);

  const navItems = [
    { path: '/', label: t('nav.baseCamp'), icon: LayoutDashboard }, // Dashboard
    { path: '/courses', label: t('nav.missions'), icon: Map }, // Courses
    { path: '/mall', label: t('nav.supplyDepot'), icon: ShoppingBag }, // Mall
    { path: '/events', label: t('nav.specialOps'), icon: Target }, // Events
  ];

  const cycleLanguage = () => {
    const langs = [Language.EN, Language.ZH, Language.JA, Language.KO];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  const getLangLabel = (lang: Language) => {
    switch (lang) {
        case Language.EN: return 'EN';
        case Language.ZH: return '中文';
        case Language.JA: return 'JP';
        case Language.KO: return 'KR';
        default: return 'EN';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Flat Tactical HUD Style */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-72 bg-white text-black transform transition-transform duration-300 ease-in-out border-r-2 border-black
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo / Badge */}
          <div className="h-24 flex items-center px-6 border-b-2 border-black bg-yellow-400">
            <div className="bg-white p-2 rounded border-2 border-black mr-3 shadow-hard-sm">
              <Shield className="text-green-600" size={24} strokeWidth={3} />
            </div>
            <div>
              <span className="block text-xs font-black tracking-widest uppercase text-black">{t('appName')}</span>
              <span className="text-xl font-display text-black tracking-tight">{t('subTitle')}</span>
            </div>
          </div>

          {/* User Status Card */}
          <div className="p-6 bg-blue-50 border-b-2 border-black relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative group">
                <Link to="/profile">
                    <div className="w-14 h-14 rounded-full border-2 border-black overflow-hidden bg-white hover:scale-110 transition-transform">
                        <AvatarRenderer config={user.avatarConfig} size={56} />
                    </div>
                </Link>
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded border-2 border-black">
                  LVL {user.level}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-display text-black truncate">{user.name}</p>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider truncate">{userTitle}</p>
              </div>
            </div>
            {/* XP Bar */}
            <div className="w-full bg-white h-4 rounded-full overflow-hidden border-2 border-black">
              <div className="bg-green-500 h-full w-[75%] border-r-2 border-black relative">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
              </div>
            </div>
            <div className="flex justify-between text-[10px] font-black text-black mt-1">
              <span>XP: 1250</span>
              <span>GOAL: 1500</span>
            </div>
            
            <Link to="/profile" className="absolute top-4 right-4 text-gray-400 hover:text-black">
                <UserIcon size={16} />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold tracking-wide border-2 ${
                    isActive 
                      ? 'bg-green-500 text-white border-black shadow-hard-sm translate-x-1' 
                      : 'bg-white text-gray-500 border-transparent hover:bg-gray-100 hover:text-black hover:border-black'
                  }`}
                >
                  <item.icon size={22} strokeWidth={2.5} className={isActive ? 'animate-bounce' : ''} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer Controls */}
          <div className="p-4 border-t-2 border-black bg-gray-100">
            <div className="flex gap-2">
               <button 
                onClick={cycleLanguage}
                className="flex-1 flex items-center justify-center gap-2 text-xs font-black text-black hover:bg-white border-2 border-transparent hover:border-black p-2 rounded-lg uppercase tracking-wider transition-all"
               >
                 <Globe size={16} /> {getLangLabel(language)}
               </button>
               <button 
                onClick={onLogout}
                className="flex-1 flex items-center justify-center gap-2 text-xs font-black text-red-500 hover:bg-red-50 hover:text-red-600 border-2 border-transparent hover:border-black p-2 rounded-lg uppercase tracking-wider transition-all"
               >
                 <LogOut size={16} /> {t('nav.logout')}
               </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#f0fdf4]">
        {/* Low Poly Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(135deg, #22c55e 25%, transparent 25%), linear-gradient(225deg, #22c55e 25%, transparent 25%), linear-gradient(45deg, #22c55e 25%, transparent 25%), linear-gradient(315deg, #22c55e 25%, transparent 25%)',
                 backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
                 backgroundSize: '20px 20px',
                 backgroundRepeat: 'repeat'
             }}>
        </div>

        {/* Mobile Header */}
        <header className="h-20 bg-yellow-400 border-b-2 border-black flex items-center px-4 justify-between lg:hidden shrink-0 z-10">
          <div className="flex items-center gap-2">
             <div className="bg-white p-1 rounded border-2 border-black shadow-hard-sm">
                <Shield className="text-green-600" size={20} strokeWidth={3} />
            </div>
            <span className="font-display text-xl tracking-wider text-black">{t('appName')}</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-black bg-white rounded border-2 border-black shadow-hard-sm active:translate-y-1 active:shadow-none transition-all">
            <Menu strokeWidth={3} />
          </button>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-8 z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
