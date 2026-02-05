
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Mall from './pages/Mall';
import Events from './pages/Events';
import Profile from './pages/Profile';
import AiTutor from './components/AiTutor';
import IntroCinematic from './components/IntroCinematic';
import { User, Course } from './types';
import { X, PlayCircle, Terminal, CheckCircle } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Mock User Data with Avatar Config
const mockUserInitial: User = {
  id: 'u1',
  name: 'Alex Green',
  // Removed static avatar URL, replaced with config
  avatarConfig: {
      baseSeed: 'Alex',
      hatId: 'hat_1',
      outfitId: 'outfit_1',
      accessoryId: 'acc_1'
  },
  points: 1250,
  level: 5,
  subscriptionType: 'FAMILY',
  dailyLogin: true,
  unlockedAbilities: ['a1'],
  inventory: ['hat_1', 'outfit_1', 'acc_1'] // Start with some items
};

// Course Player Modal Component - Styled as Mission Terminal
const CoursePlayerModal: React.FC<{ course: Course; onClose: () => void; isLoggedIn: boolean }> = ({ course, onClose, isLoggedIn }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-4xl rounded-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-slate-700 relative">
        {/* HUD Decoration */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-500/50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-500/50 pointer-events-none"></div>

        {/* Header */}
        <div className="bg-slate-950 text-white p-4 flex justify-between items-center shrink-0 border-b border-slate-800">
          <h3 className="font-bold text-lg flex items-center gap-3 uppercase tracking-wider font-mono">
            <Terminal size={18} className="text-green-500" />
            Mission File: <span className="text-green-400">{course.title}</span>
          </h3>
          <button onClick={onClose} className="hover:bg-red-900/30 text-slate-400 hover:text-red-400 p-2 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-black relative">
           {/* Scanlines effect */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>

           {!showQuiz ? (
             <div className="relative aspect-video bg-slate-900 flex items-center justify-center group h-full">
               {/* Mock Video Player */}
               <img src={course.thumbnail} className="w-full h-full object-cover opacity-40" alt="Video" />
               <div className="absolute inset-0 flex items-center justify-center z-20">
                 <button 
                   onClick={() => setShowQuiz(true)} // Simulate finishing video
                   className="bg-green-600/20 hover:bg-green-600/40 backdrop-blur border border-green-500/50 text-green-400 hover:text-white px-8 py-4 rounded-sm flex items-center gap-4 transition-all transform hover:scale-105 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                 >
                   <PlayCircle size={40} />
                   <span className="font-black text-xl uppercase tracking-widest">Execute Intel</span>
                 </button>
               </div>
               <p className="absolute bottom-6 left-6 text-green-500/60 font-mono text-xs z-20 animate-pulse">
                 >> SYSTEM READY. AWAITING INPUT.
               </p>
             </div>
           ) : (
             <div className="h-full bg-slate-900 p-8 flex flex-col items-center justify-center text-center z-20 relative">
               <div className="bg-green-500/10 p-6 rounded-full mb-6 border border-green-500/30 animate-pulse shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                 <CheckCircle size={64} className="text-green-500" />
               </div>
               
               {isLoggedIn ? (
                 <>
                   <h2 className="text-3xl font-black text-white mb-2 uppercase italic">Intel Acquired</h2>
                   <p className="text-slate-400 mb-8 max-w-md font-mono text-sm">
                     Training module complete. Proceed to Skill Check to verify retention and claim {course.pointsReward} XP.
                   </p>
                   <button className="bg-green-600 text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-green-500 transition-colors shadow-lg shadow-green-900/50">
                     Begin Skill Check
                   </button>
                 </>
               ) : (
                 <>
                   <h2 className="text-3xl font-black text-white mb-2 uppercase italic">Preview Terminated</h2>
                   <p className="text-slate-400 mb-8 max-w-md font-mono text-sm">
                     Full mission data is encrypted. Enlist as a Ranger to access the complete database and earn gear.
                   </p>
                   <button className="bg-green-600 text-white px-10 py-4 rounded-sm font-black uppercase tracking-widest hover:bg-green-500 transition-colors shadow-lg shadow-green-900/50">
                     {t('hero.ctaEnlist')}
                   </button>
                 </>
               )}
               
               <button onClick={() => setShowQuiz(false)} className="mt-6 text-slate-500 text-xs font-mono hover:text-green-400 hover:underline">
                 REPLAY_INTEL_VIDEO.exe
               </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Wrapper for AI Context
const ContentWithAi: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const getContextLabel = () => {
    switch(location.pathname) {
      case '/': return t('nav.baseCamp');
      case '/courses': return t('nav.missions');
      case '/mall': return t('nav.supplyDepot');
      case '/events': return t('nav.specialOps');
      case '/profile': return t('nav.profile');
      default: return 'Eco-Ranger HQ';
    }
  };

  return (
    <>
      {children}
      <AiTutor context={getContextLabel()} />
    </>
  );
};

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [hasSeenStoryIntro, setHasSeenStoryIntro] = useState(false);
  const [showLoginCinematic, setShowLoginCinematic] = useState(false);
  const [user, setUser] = useState<User>(mockUserInitial);

  const handleLogin = () => {
    setShowLoginCinematic(true);
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginCinematic(false);
  };

  return (
    <Router>
      {!hasSeenStoryIntro && (
         <IntroCinematic mode="STORY" onComplete={() => setHasSeenStoryIntro(true)} />
      )}

      {!isAuthenticated ? (
        <>
          <LandingPage 
            onLogin={handleLogin} 
            onPreviewCourse={setActiveCourse}
          />
          {activeCourse && (
            <CoursePlayerModal 
              course={activeCourse} 
              onClose={() => setActiveCourse(null)} 
              isLoggedIn={false}
            />
          )}
        </>
      ) : (
        <>
          {showLoginCinematic && (
            <IntroCinematic mode="LOGIN" onComplete={() => setShowLoginCinematic(false)} />
          )}

          <Layout user={user} onLogout={handleLogout}>
            <ContentWithAi>
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/courses" element={<Courses onSelectCourse={setActiveCourse} />} />
                <Route path="/mall" element={<Mall user={user} />} />
                <Route path="/events" element={<Events />} />
                <Route path="/profile" element={<Profile user={user} onUpdateUser={setUser} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ContentWithAi>
            
            {activeCourse && (
              <CoursePlayerModal 
                course={activeCourse} 
                onClose={() => setActiveCourse(null)} 
                isLoggedIn={true}
              />
            )}
          </Layout>
        </>
      )}
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
