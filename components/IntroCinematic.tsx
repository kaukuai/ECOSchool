
import React, { useEffect, useState } from 'react';
import { Shield, Zap, AlertTriangle, Crosshair, Users, Globe, Play, Lock, Fingerprint } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface IntroCinematicProps {
  mode: 'STORY' | 'LOGIN';
  onComplete: () => void;
}

const IntroCinematic: React.FC<IntroCinematicProps> = ({ mode, onComplete }) => {
  const [phase, setPhase] = useState(0);
  const { t } = useLanguage();

  // Story Mode Sequence
  useEffect(() => {
    if (mode === 'LOGIN') {
      // Faster sequence for login
      const timer1 = setTimeout(() => setPhase(1), 800);  // Scan
      const timer2 = setTimeout(() => setPhase(2), 2000); // Verify
      const timer3 = setTimeout(() => setPhase(3), 3500); // Access
      return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
    } else {
      // Full Story Cinematic
      // 0: Initial Void
      const timer1 = setTimeout(() => setPhase(1), 500);   // Earth Appear
      const timer2 = setTimeout(() => setPhase(2), 4000);  // Crisis/Alarm
      const timer3 = setTimeout(() => setPhase(3), 8000);  // Summoning/Scan
      const timer4 = setTimeout(() => setPhase(4), 11000); // Heroes Assemble
      const timer5 = setTimeout(() => setPhase(5), 15000); // Final CTA
      
      return () => { 
        clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); 
        clearTimeout(timer4); clearTimeout(timer5); 
      };
    }
  }, [mode]);

  // --- RENDER HELPERS ---

  // The Holographic Earth
  const RenderEarth = ({ status }: { status: 'NORMAL' | 'CRITICAL' | 'SCANNING' }) => (
    <div className={`relative w-64 h-64 md:w-96 md:h-96 transition-all duration-1000 ${phase === 1 ? 'scale-100 opacity-100' : 'scale-110'}`}>
      {/* Globe Container */}
      <div className={`w-full h-full rounded-full overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 ${status === 'CRITICAL' ? 'border-red-500 shadow-red-900/50 animate-shake' : 'border-blue-500 shadow-blue-500/30'}`}>
        
        {/* Map Texture (CSS Animation) */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1024px-Equirectangular_projection_SW.jpg)',
            backgroundSize: '200% 100%',
            animation: 'earth-spin 20s linear infinite',
            filter: status === 'CRITICAL' ? 'sepia(1) hue-rotate(-50deg) saturate(3) contrast(1.2)' : 'sepia(1) hue-rotate(180deg) saturate(2) contrast(1.2)'
          }}
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-50 mix-blend-overlay"></div>
        
        {/* Atmosphere Glow */}
        <div className={`absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] ${status === 'CRITICAL' ? 'bg-red-500/20' : 'bg-blue-500/20'}`}></div>

        {/* Crisis Markers */}
        {status === 'CRITICAL' && (
          <>
            <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-red-500 rounded-full animate-ping delay-75"></div>
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-ping delay-150"></div>
          </>
        )}

        {/* Scanning Line */}
        {status === 'SCANNING' && (
           <div className="absolute top-0 bottom-0 w-1 bg-green-400 shadow-[0_0_20px_#4ade80] opacity-80 animate-scan"></div>
        )}
      </div>

      {/* Orbital Rings */}
      <div className={`absolute -inset-10 border border-dashed rounded-full opacity-30 animate-spin-slow ${status === 'CRITICAL' ? 'border-red-500' : 'border-blue-400'}`}></div>
      <div className={`absolute -inset-20 border border-dotted rounded-full opacity-20 animate-reverse-spin ${status === 'CRITICAL' ? 'border-red-500' : 'border-blue-400'}`}></div>
    </div>
  );

  // --- LOGIN MODE ---
  if (mode === 'LOGIN') {
    if (phase === 3) {
      setTimeout(onComplete, 1000); // Auto close
      return (
        <div className="fixed inset-0 z-[100] bg-green-500 flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="bg-white p-10 rounded-3xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] text-center transform scale-100 transition-all">
             <div className="inline-block p-4 border-4 border-green-500 rounded-full mb-6 bg-green-100">
               <Shield size={64} className="text-green-600" strokeWidth={3} />
             </div>
             <h1 className="text-4xl font-display uppercase text-black mb-2">{t('intro.identity')}</h1>
             <p className="text-xl font-bold text-gray-500">{t('intro.welcomeBack')}</p>
           </div>
        </div>
      );
    }
    return (
      <div className="fixed inset-0 z-[100] bg-black text-blue-500 font-mono flex flex-col items-center justify-center">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
         <Fingerprint size={80} className="animate-pulse mb-8 text-blue-400" />
         <div className="text-xl font-bold tracking-widest uppercase mb-2">
            {phase === 0 ? t('intro.accessing') : phase === 1 ? t('intro.verifying') : t('intro.match')}
         </div>
         <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
            <div className="h-full bg-blue-500 animate-[width_2s_ease-out_forwards]" style={{width: phase > 0 ? '100%' : '0%'}}></div>
         </div>
      </div>
    );
  }

  // --- STORY MODE ---

  // Skip if done
  if (phase === 6) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white overflow-hidden font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black"></div>
      
      {/* Starfield / Particles */}
      <div className="absolute inset-0 opacity-40 animate-pulse" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")'}}></div>
      
      {/* Content Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6 z-10">
        
        {/* PHASE 1: The Blue Planet */}
        {phase === 1 && (
           <div className="animate-in fade-in zoom-in duration-1000 flex flex-col items-center">
              <RenderEarth status="NORMAL" />
              <div className="mt-12 text-center">
                <h2 className="text-blue-400 font-mono tracking-[0.5em] text-sm mb-2 opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">SECTOR 001</h2>
                <h1 className="text-5xl md:text-7xl font-display uppercase text-white tracking-wider opacity-0 animate-[slideUp_1s_ease-out_1.5s_forwards]">
                  Planet Earth
                </h1>
              </div>
           </div>
        )}

        {/* PHASE 2: The Crisis */}
        {phase === 2 && (
           <div className="flex flex-col items-center w-full">
              <RenderEarth status="CRITICAL" />
              <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none mix-blend-overlay"></div>
              
              {/* Warning Overlays */}
              <div className="absolute top-20 left-10 md:left-20 bg-red-600 text-white px-4 py-2 font-black font-mono border-2 border-white rotate-[-5deg] animate-[bounce_0.5s_infinite]">
                 WARNING: ECO-COLLAPSE
              </div>
              <div className="absolute bottom-40 right-10 md:right-32 bg-yellow-500 text-black px-4 py-2 font-black font-mono border-2 border-black rotate-[3deg] animate-pulse">
                 biodiversity: 12%
              </div>

              <div className="mt-12 text-center z-20">
                <h1 className="text-6xl md:text-8xl font-black uppercase text-red-500 tracking-tighter glitch-text mb-4">
                  {t('intro.sos')}
                </h1>
                <p className="text-2xl font-bold uppercase text-white bg-red-900/80 px-6 py-2 border-y-2 border-red-500">
                  {t('intro.dying')}
                </p>
              </div>
           </div>
        )}

        {/* PHASE 3: The Summon */}
        {phase === 3 && (
           <div className="flex flex-col items-center w-full">
              <RenderEarth status="SCANNING" />
              <div className="mt-12 text-center">
                 <div className="flex items-center justify-center gap-4 mb-4 text-green-400 animate-pulse">
                    <Globe size={32} />
                    <span className="font-mono text-xl tracking-widest">{t('intro.scanning')}</span>
                 </div>
                 <h1 className="text-5xl md:text-6xl font-display uppercase text-white leading-tight">
                    {t('intro.recruiting')} <br />
                    <span className="text-green-500 text-shadow-green">Guardians</span>
                 </h1>
              </div>
              
              {/* Ping Effects on Map */}
              <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-1/3 left-1/4 w-32 h-32 border-2 border-green-500 rounded-full animate-ping opacity-50"></div>
                 <div className="absolute bottom-1/3 right-1/3 w-40 h-40 border-2 border-green-500 rounded-full animate-ping delay-500 opacity-50"></div>
              </div>
           </div>
        )}

        {/* PHASE 4: The Squad (Anime Intro Style) */}
        {phase === 4 && (
            <div className="w-full max-w-5xl relative h-full flex flex-col justify-center">
                 <h2 className="text-center text-4xl font-display uppercase text-yellow-400 mb-12 animate-bounce">
                    Heroes Found
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    
                    {/* Character 1 */}
                    <div className="bg-blue-600 border-4 border-black rounded-xl p-1 shadow-[8px_8px_0_0_#000] transform translate-y-20 opacity-0 animate-[slideUp_0.5s_ease-out_forwards]">
                       <div className="bg-blue-800 h-40 md:h-64 relative overflow-hidden flex items-end justify-center">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Scientist&clothing=blazerAndShirt&accessories=prescription02" className="w-40 h-40 drop-shadow-xl" alt="Scientist" />
                           <div className="absolute top-2 left-2 bg-black text-white text-xs font-black px-2 py-1 uppercase">Intel</div>
                       </div>
                       <div className="bg-white p-3 text-black">
                          <h3 className="font-display text-xl uppercase">Dr. Terra</h3>
                          <p className="text-xs font-bold text-gray-500">Eco-Scientist</p>
                       </div>
                    </div>

                    {/* Character 2 */}
                    <div className="bg-green-600 border-4 border-black rounded-xl p-1 shadow-[8px_8px_0_0_#000] transform translate-y-20 opacity-0 animate-[slideUp_0.5s_ease-out_0.3s_forwards]">
                       <div className="bg-green-800 h-48 md:h-72 relative overflow-hidden flex items-end justify-center">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ranger&clothing=hoodie&accessories=eyepatch" className="w-48 h-48 drop-shadow-xl" alt="Ranger" />
                           <div className="absolute top-2 left-2 bg-black text-white text-xs font-black px-2 py-1 uppercase">Scout</div>
                       </div>
                       <div className="bg-white p-3 text-black">
                          <h3 className="font-display text-2xl uppercase">Ranger X</h3>
                          <p className="text-xs font-bold text-gray-500">Field Operative</p>
                       </div>
                    </div>

                    {/* Character 3 */}
                    <div className="bg-purple-600 border-4 border-black rounded-xl p-1 shadow-[8px_8px_0_0_#000] transform translate-y-20 opacity-0 animate-[slideUp_0.5s_ease-out_0.6s_forwards]">
                       <div className="bg-purple-800 h-40 md:h-64 relative overflow-hidden flex items-end justify-center">
                           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Engineer&clothing=overall&top=winterHat03" className="w-40 h-40 drop-shadow-xl" alt="Engineer" />
                           <div className="absolute top-2 left-2 bg-black text-white text-xs font-black px-2 py-1 uppercase">Tech</div>
                       </div>
                       <div className="bg-white p-3 text-black">
                          <h3 className="font-display text-xl uppercase">Gizmo</h3>
                          <p className="text-xs font-bold text-gray-500">Tech Specialist</p>
                       </div>
                    </div>
                 </div>
            </div>
        )}

        {/* PHASE 5: The Call */}
        {phase === 5 && (
           <div className="flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 max-w-2xl">
              <div className="relative mb-8">
                 <div className="absolute inset-0 bg-green-500 blur-xl opacity-50 animate-pulse"></div>
                 <div className="bg-white p-6 rounded-full border-4 border-black relative z-10">
                    <Crosshair size={64} className="text-black" strokeWidth={3} />
                 </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-display uppercase mb-6 leading-none text-white text-shadow-black">
                 {t('intro.question')}
              </h1>
              
              <p className="text-xl text-green-400 font-mono mb-10 max-w-lg">
                 The squad is waiting for you. <br/> Join the fight to save our future.
              </p>

              <button 
                onClick={onComplete}
                className="group relative bg-green-500 hover:bg-green-400 text-black text-2xl font-black uppercase tracking-widest px-12 py-6 rounded-xl border-4 border-black shadow-[8px_8px_0_0_#fff] hover:shadow-[12px_12px_0_0_#fff] hover:-translate-y-1 transition-all"
              >
                <span className="flex items-center gap-4">
                  <Play fill="black" size={24} /> {t('intro.enter')}
                </span>
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 border-2 border-black rotate-12 animate-pulse">
                   MISSION READY
                </div>
              </button>
           </div>
        )}

      </div>

      {/* Skip Button */}
      <div className="absolute bottom-8 right-8 z-50">
        <button 
            onClick={onComplete}
            className="text-gray-500 hover:text-white font-mono text-xs uppercase tracking-widest border-b border-transparent hover:border-white transition-all"
        >
            [ Skip Intro ]
        </button>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes earth-spin {
          from { background-position: 0% 0%; }
          to { background-position: 200% 0%; }
        }
        @keyframes scan {
          0% { left: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: spin 30s linear infinite reverse;
        }
        .glitch-text {
           text-shadow: 3px 3px 0 #ff0000, -3px -3px 0 #0000ff;
           animation: shake 2s infinite;
        }
        .text-shadow-green {
            text-shadow: 2px 2px 0px #22c55e;
        }
        .text-shadow-black {
            text-shadow: 4px 4px 0px #000;
        }
      `}</style>
    </div>
  );
};

export default IntroCinematic;
    