
import React from 'react';
import { User, Task, LeaderboardEntry } from '../types';
import { CheckCircle, Circle, Award, Zap, Calendar, Target, Shield, Trophy, TrendingUp, User as UserIcon } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import AvatarRenderer from '../components/AvatarRenderer';
import { Link } from 'react-router-dom';

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah 'Eagle'", points: 5400, avatarConfig: { baseSeed: 'Sarah', hatId: 'hat_2', outfitId: 'outfit_2', accessoryId: null }, isUser: false },
  { rank: 2, name: "Mike 'Bear'", points: 4850, avatarConfig: { baseSeed: 'Mike', hatId: 'hat_1', outfitId: null, accessoryId: 'acc_1' }, isUser: false },
  { rank: 3, name: "Jenny 'Fox'", points: 4200, avatarConfig: { baseSeed: 'Jenny', hatId: null, outfitId: 'outfit_1', accessoryId: null }, isUser: false },
  { rank: 142, name: "Alex Green", points: 1250, avatarConfig: { baseSeed: 'Alex', hatId: 'hat_1', outfitId: 'outfit_1', accessoryId: 'acc_1' }, isUser: true },
  { rank: 143, name: "Tom 'Hawk'", points: 1210, avatarConfig: { baseSeed: 'Tom', hatId: null, outfitId: null, accessoryId: null }, isUser: false },
];

const activityData = [
  { name: 'Mon', hours: 1.2 },
  { name: 'Tue', hours: 0.8 },
  { name: 'Wed', hours: 2.5 },
  { name: 'Thu', hours: 1.5 },
  { name: 'Fri', hours: 0 },
  { name: 'Sat', hours: 3.0 },
  { name: 'Sun', hours: 2.2 },
];

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const { t, getMockTasks, getUserTitle } = useLanguage();
  const tasks = getMockTasks();
  const userTitle = getUserTitle(user.level);

  return (
    <div className="space-y-8 pb-12">
      {/* Mascot Welcome Section */}
      <div className="bg-yellow-400 border-2 border-black shadow-hard rounded-xl p-6 relative mt-4 overflow-visible">
         <div className="absolute -top-12 right-6 w-24 h-24 hidden md:block animate-float">
             {/* Simple SVG Robot Head for decoration */}
             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <rect x="20" y="25" width="60" height="50" rx="10" fill="white" stroke="black" strokeWidth="4" />
                <rect x="28" y="35" width="44" height="25" rx="5" fill="#22c55e" stroke="black" strokeWidth="3" />
                <circle cx="40" cy="47" r="3" fill="black" />
                <circle cx="60" cy="47" r="3" fill="black" />
                <line x1="50" y1="10" x2="50" y2="25" stroke="black" strokeWidth="4" />
                <circle cx="50" cy="10" r="5" fill="#f43f5e" stroke="black" strokeWidth="3" />
             </svg>
         </div>
         <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-display uppercase tracking-wider text-black">
              {t('dashboard.welcome')} <span className="text-white text-shadow-black">{t('dashboard.ranger')} {user.name}!</span>
            </h1>
            <p className="font-bold text-black/70">
              {t('dashboard.message')}
            </p>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Tasks */}
        <div className="lg:col-span-2 space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* XP Card */}
                <div className="bg-white border-2 border-black shadow-hard rounded-xl p-5 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 bg-green-100 w-24 h-24 rounded-full border-2 border-black group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1 text-black font-black uppercase text-xs tracking-wider">
                            <Zap size={16} fill="black" /> {t('dashboard.xp')}
                        </div>
                        <h2 className="text-4xl font-display text-black">{user.points}</h2>
                        <div className="w-full bg-black h-3 rounded-full mt-3 overflow-hidden border border-black p-0.5">
                            <div className="bg-green-500 h-full w-[70%] rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Rank Card - Interactive Link to Profile */}
                <Link to="/profile" className="bg-purple-500 border-2 border-black shadow-hard rounded-xl p-5 text-white relative overflow-hidden group hover:-translate-y-1 transition-transform">
                     <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1 font-black uppercase text-xs tracking-wider text-purple-100">
                            <Shield size={16} fill="white" /> {t('dashboard.rank')}
                        </div>
                        <h2 className="text-2xl font-display leading-none mt-2">{userTitle}</h2>
                        <div className="text-sm font-bold opacity-80 mt-1">{t('dashboard.level')} {user.level}</div>
                        <div className="mt-2 text-[10px] font-black uppercase bg-white/20 inline-block px-2 py-1 rounded">
                            {t('dashboard.nextRank')}: {user.level < 5 ? 'Field Investigator' : 'Nature Guardian'}
                        </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110">
                        <AvatarRenderer config={user.avatarConfig} size={100} />
                    </div>
                </Link>

                {/* Streak Card */}
                <div className="bg-orange-400 border-2 border-black shadow-hard rounded-xl p-5 text-black">
                    <div className="flex items-center gap-2 mb-1 font-black uppercase text-xs tracking-wider opacity-70">
                        <Calendar size={16} fill="black" /> {t('dashboard.streak')}
                    </div>
                    <div className="flex items-baseline gap-1">
                        <h2 className="text-4xl font-display">12</h2>
                        <span className="font-bold text-sm">{t('dashboard.days')}</span>
                    </div>
                    <div className="text-xs font-bold mt-2 bg-white/30 p-1 rounded inline-block">
                        Fire Warrior 🔥
                    </div>
                </div>
            </div>

            {/* Daily Ops (Tasks) */}
            <div className="bg-white border-2 border-black shadow-hard rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-2xl uppercase flex items-center gap-3">
                        <Target className="text-red-500" strokeWidth={3} /> {t('dashboard.dailyOps')}
                    </h3>
                </div>
                <div className="space-y-4">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-yellow-50 transition-all cursor-pointer group">
                            <div className="flex items-center gap-4">
                                {task.completed ? 
                                    <div className="bg-green-500 text-white rounded-full p-1 border-2 border-black">
                                        <CheckCircle size={20} strokeWidth={3} />
                                    </div> : 
                                    <div className="bg-white text-gray-300 rounded-full p-1 border-2 border-gray-300 group-hover:border-black">
                                        <Circle size={20} strokeWidth={3} />
                                    </div>
                                }
                                <span className={`font-bold ${task.completed ? 'text-gray-400 line-through decoration-2' : 'text-black'}`}>
                                    {task.title}
                                </span>
                            </div>
                            <span className="font-black text-sm text-black bg-yellow-400 px-3 py-1 rounded border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                                +{task.reward} XP
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Activity Chart */}
            <div className="bg-white border-2 border-black shadow-hard rounded-xl p-6">
                 <h3 className="font-display text-xl uppercase mb-4 flex items-center gap-2">
                    <TrendingUp /> {t('dashboard.activityLog')}
                 </h3>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 12, fontWeight: 'bold'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 12, fontWeight: 'bold'}} />
                        <Tooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{ borderRadius: '8px', border: '2px solid black', boxShadow: '4px 4px 0 0 black', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                            {activityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 5 ? '#22c55e' : '#94a3b8'} stroke="black" strokeWidth={2} />
                            ))}
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="lg:col-span-1">
            <div className="bg-blue-600 border-2 border-black shadow-hard rounded-xl overflow-hidden flex flex-col h-full">
                <div className="bg-blue-500 p-6 border-b-2 border-black">
                    <h3 className="text-white font-display text-2xl uppercase flex items-center gap-2 text-shadow-black">
                        <Trophy className="text-yellow-300" strokeWidth={3} /> {t('dashboard.topRangers')}
                    </h3>
                    <p className="text-blue-100 text-sm font-bold mt-2">
                        {t('dashboard.compete')}
                    </p>
                </div>
                <div className="flex-1 bg-white p-4 overflow-y-auto max-h-[500px]">
                    <div className="space-y-3">
                        {leaderboardData.map((entry, index) => (
                            <div key={index} className={`flex items-center justify-between p-3 rounded-xl border-2 ${entry.isUser ? 'bg-yellow-100 border-black shadow-hard-sm scale-[1.02]' : 'bg-gray-50 border-transparent hover:border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`
                                        w-8 h-8 flex items-center justify-center font-display text-lg
                                        ${entry.rank === 1 ? 'text-yellow-500' : 
                                          entry.rank === 2 ? 'text-gray-400' :
                                          entry.rank === 3 ? 'text-orange-600' : 'text-black'}
                                    `}>
                                        {entry.rank <= 3 ? <Trophy size={20} fill="currentColor" strokeWidth={2} /> : `#${entry.rank}`}
                                    </div>
                                    <div className="w-10 h-10 rounded-full border-2 border-black bg-white overflow-hidden">
                                        <AvatarRenderer config={entry.avatarConfig} size={40} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-black leading-tight">{entry.name}</div>
                                        {entry.isUser && <div className="text-[10px] uppercase font-black text-blue-600">{t('dashboard.you')}</div>}
                                    </div>
                                </div>
                                <div className="font-display text-black">{entry.points}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-blue-50 border-t-2 border-black text-center">
                    <button className="text-blue-600 font-black text-sm uppercase hover:underline">{t('dashboard.viewAll')}</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
