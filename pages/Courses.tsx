import React, { useState } from 'react';
import { Course, CourseStatus, Ability } from '../types';
import { Play, Lock, Star, Zap, Shield, Map as MapIcon, Crosshair, Gift } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const mockAbilities: Ability[] = [
  { id: 'a1', name: 'Ocean Sight', icon: '🌊', description: 'Identify marine pollutants instantly.', requiredCourseId: '2', unlocked: false },
  { id: 'a2', name: 'Urban Ninja', icon: '🏙️', description: '50% faster recycling sorting.', requiredCourseId: '3', unlocked: false },
  { id: 'a3', name: 'Solar Flare', icon: '☀️', description: 'Double XP during daytime missions.', requiredCourseId: '5', unlocked: false },
  { id: 'a4', name: 'Eco Master', icon: '👑', description: 'Access to the secret Ranger Council.', requiredCourseId: '6', unlocked: false },
];

interface CoursesProps {
  onSelectCourse: (course: Course) => void;
}

const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
  const [selectedNode, setSelectedNode] = useState<Course | null>(null);
  const { t, getMockCourses, getAvatarItems } = useLanguage();
  const courses = getMockCourses();
  const avatarItems = getAvatarItems();

  const getRewardItem = (id: string | undefined) => {
    if (!id) return null;
    return avatarItems.find(i => i.id === id);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
      
      {/* LEFT: The World Map */}
      <div className="flex-1 bg-[#1e293b] rounded-3xl border-4 border-black shadow-hard relative overflow-hidden group">
        {/* Map Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{ 
                backgroundImage: `
                  radial-gradient(circle at 10% 20%, rgba(34, 197, 94, 0.4) 0%, transparent 20%),
                  radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 20%),
                  repeating-linear-gradient(45deg, #1e293b 0, #1e293b 10px, #0f172a 10px, #0f172a 20px)
                `
            }}>
        </div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-30 pointer-events-none"></div>

        <div className="absolute top-6 left-6 z-10 bg-black/80 backdrop-blur text-white px-4 py-2 rounded-lg border-2 border-green-500">
           <h2 className="text-xl font-display uppercase flex items-center gap-2">
             <MapIcon size={20} className="text-green-500"/> {t('courses.mapTitle')}
           </h2>
        </div>
        <div className="absolute bottom-6 left-6 z-10 font-mono text-xs text-green-500 animate-pulse">
           &gt;&gt; {t('courses.liveFeed')}
        </div>

        {/* Map Container - Full Scrollable Area */}
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-auto p-10">
           <div className="relative w-full h-full min-h-[500px] min-w-[300px]">
              
              {/* SVG Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {courses.map(course => 
                  course.unlocks.map(targetId => {
                    const target = courses.find(c => c.id === targetId);
                    if (!target) return null;
                    const isUnlocked = course.status === CourseStatus.COMPLETED;
                    
                    return (
                      <line 
                        key={`${course.id}-${targetId}`}
                        x1={`${course.mapX}%`} 
                        y1={`${course.mapY}%`} 
                        x2={`${target.mapX}%`} 
                        y2={`${target.mapY}%`} 
                        stroke={isUnlocked ? "#22c55e" : "#475569"} 
                        strokeWidth="4" 
                        strokeDasharray={isUnlocked ? "0" : "8,4"}
                        className="transition-all duration-1000"
                      />
                    );
                  })
                )}
              </svg>

              {/* Map Nodes */}
              {courses.map(course => (
                <div 
                  key={course.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300"
                  style={{ left: `${course.mapX}%`, top: `${course.mapY}%` }}
                >
                  <button
                    onClick={() => setSelectedNode(course)}
                    className={`
                      relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full border-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all
                      ${course.status === CourseStatus.LOCKED 
                        ? 'bg-slate-800 border-slate-600 grayscale opacity-80' 
                        : course.status === CourseStatus.COMPLETED 
                          ? 'bg-yellow-400 border-white scale-100 hover:scale-110' 
                          : 'bg-green-500 border-white animate-bounce-slow hover:scale-110 shadow-[0_0_30px_rgba(34,197,94,0.6)]'}
                      ${selectedNode?.id === course.id ? 'ring-4 ring-white ring-offset-4 ring-offset-slate-900 scale-125 z-20' : ''}
                    `}
                  >
                    {/* Inner Icon */}
                    {course.status === CourseStatus.LOCKED ? (
                      <Lock size={24} className="text-slate-500" />
                    ) : course.status === CourseStatus.COMPLETED ? (
                      <Star size={32} className="text-black fill-current" />
                    ) : (
                      <Crosshair size={32} className="text-white fill-current ml-1" />
                    )}
                    
                    {/* Current Mission Indicator Pin */}
                    {course.status === CourseStatus.IN_PROGRESS && (
                         <div className="absolute -top-8 -right-4 animate-bounce">
                             <div className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded border-2 border-black shadow-hard-sm">
                                 HERE
                             </div>
                             <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-black border-r-[6px] border-r-transparent absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
                         </div>
                    )}

                    {/* Node Label */}
                    <div className="absolute -bottom-10 whitespace-nowrap bg-black text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded border border-slate-600 shadow-md">
                      {course.title.split(':')[0]}
                    </div>
                  </button>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* RIGHT: Selected Mission & Skills */}
      <div className="lg:w-96 flex flex-col gap-6">
        
        {/* Mission Details Card */}
        <div className="bg-white border-4 border-black rounded-3xl shadow-hard p-6 flex-1 flex flex-col">
          {selectedNode ? (
            <>
               <div className="relative h-32 bg-slate-200 rounded-xl overflow-hidden border-2 border-black mb-4">
                 <img src={selectedNode.thumbnail} className="w-full h-full object-cover" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                   <span className="text-white font-display uppercase tracking-widest text-lg">{selectedNode.title}</span>
                 </div>
               </div>
               
               <div className="flex justify-between items-center mb-4">
                 <span className={`px-2 py-1 rounded text-xs font-black uppercase ${
                    selectedNode.status === CourseStatus.LOCKED ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                 }`}>
                   {t('courses.status')}: {selectedNode.status}
                 </span>
                 <span className="flex items-center gap-1 font-bold text-yellow-600">
                   <Zap size={16} fill="currentColor"/> {selectedNode.pointsReward} XP
                 </span>
               </div>
               
               <p className="text-slate-600 font-bold text-sm mb-6 flex-1">
                 {selectedNode.description}
               </p>

               {/* Reward Item Preview */}
               {selectedNode.itemRewardId && (
                   <div className="bg-yellow-50 border-2 border-yellow-400 p-3 rounded-lg mb-4 flex items-center gap-3">
                       <div className="bg-white p-2 rounded border border-black text-2xl">
                           {getRewardItem(selectedNode.itemRewardId)?.thumbnail || '🎁'}
                       </div>
                       <div>
                           <div className="text-[10px] font-black uppercase text-yellow-600">{t('courses.rewardItem')}</div>
                           <div className="font-bold text-sm">{getRewardItem(selectedNode.itemRewardId)?.name || 'Unknown Gear'}</div>
                       </div>
                   </div>
               )}

               <button
                 onClick={() => onSelectCourse(selectedNode)}
                 disabled={selectedNode.status === CourseStatus.LOCKED}
                 className={`w-full py-4 rounded-xl font-black uppercase text-xl flex items-center justify-center gap-2 border-b-4 transition-all active:translate-y-1 active:border-b-0 ${
                   selectedNode.status === CourseStatus.LOCKED
                     ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                     : 'bg-green-500 text-white border-green-700 hover:bg-green-400 shadow-lg'
                 }`}
               >
                 {selectedNode.status === CourseStatus.LOCKED ? <Lock size={20}/> : <Play size={20} fill="currentColor"/>}
                 {selectedNode.status === CourseStatus.LOCKED ? t('courses.clearanceDenied') : t('courses.startMission')}
               </button>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-4">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border-4 border-slate-200 mb-4">
                   <MapIcon size={32} className="opacity-50"/>
               </div>
               <p className="font-bold text-lg uppercase text-black">{t('courses.awaitingOrders')}</p>
               <p className="text-sm">{t('courses.selectSector')}</p>
            </div>
          )}
        </div>

        {/* Skill Tree / Abilities */}
        <div className="bg-slate-900 border-4 border-black rounded-3xl shadow-hard p-6 text-white">
           <h3 className="font-display text-xl uppercase mb-4 flex items-center gap-2 text-yellow-400">
             <Shield size={20}/> {t('courses.abilities')}
           </h3>
           <div className="space-y-3">
             {mockAbilities.map(ability => {
                const isUnlocked = courses.find(c => c.id === ability.requiredCourseId)?.status === CourseStatus.COMPLETED;
                return (
                  <div key={ability.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 ${isUnlocked ? 'bg-slate-800 border-yellow-500' : 'bg-slate-950 border-slate-800 opacity-50'}`}>
                     <div className="text-2xl">{ability.icon}</div>
                     <div>
                       <div className="font-bold text-sm uppercase flex items-center gap-2">
                         {ability.name}
                         {!isUnlocked && <Lock size={12}/>}
                       </div>
                       <div className="text-[10px] text-slate-400 leading-tight">
                         {isUnlocked ? ability.description : t('courses.unlock')}
                       </div>
                     </div>
                  </div>
                );
             })}
           </div>
        </div>
      </div>

      <style>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Courses;