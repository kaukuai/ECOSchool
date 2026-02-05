
import React, { useState } from 'react';
import { User, AvatarItem, AvatarConfig } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import AvatarRenderer from '../components/AvatarRenderer';
import { Save, Lock, Shield, Star } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const { t, getAvatarItems, getUserTitle } = useLanguage();
  const allItems = getAvatarItems();
  const userTitle = getUserTitle(user.level);
  
  const [currentConfig, setCurrentConfig] = useState<AvatarConfig>(user.avatarConfig);
  const [activeTab, setActiveTab] = useState<'HAT' | 'OUTFIT' | 'ACCESSORY'>('HAT');

  const handleEquip = (item: AvatarItem) => {
      // Logic to toggle or set item based on category
      const newConfig = { ...currentConfig };
      if (item.type === 'HAT') {
          newConfig.hatId = newConfig.hatId === item.id ? null : item.id;
      } else if (item.type === 'OUTFIT') {
          newConfig.outfitId = newConfig.outfitId === item.id ? null : item.id;
      } else if (item.type === 'ACCESSORY') {
          newConfig.accessoryId = newConfig.accessoryId === item.id ? null : item.id;
      }
      setCurrentConfig(newConfig);
  };

  const handleSave = () => {
      onUpdateUser({
          ...user,
          avatarConfig: currentConfig
      });
      // In a real app, this would show a toast or feedback
  };

  const filteredItems = allItems.filter(item => item.type === activeTab);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
       {/* Header */}
       <div className="bg-white border-2 border-black shadow-hard rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
           {/* Large Avatar Preview */}
           <div className="relative">
               <div className="w-64 h-64 bg-blue-100 rounded-full border-4 border-black overflow-hidden relative">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')] opacity-10"></div>
                   <AvatarRenderer config={currentConfig} size={256} className="mt-4" />
               </div>
               <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 rounded-lg border-2 border-black font-black uppercase tracking-wider whitespace-nowrap shadow-hard-sm">
                   LVL {user.level} {userTitle}
               </div>
           </div>

           {/* Stats & Info */}
           <div className="flex-1 text-center md:text-left space-y-4">
               <h1 className="text-4xl font-display uppercase">{t('profile.title')}</h1>
               <p className="text-gray-600 font-bold max-w-lg">
                   Customize your operational appearance. Unlock new gear by completing specialized missions and sectors.
               </p>
               
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                   <div className="bg-gray-50 p-3 rounded border border-black text-center">
                       <div className="text-xs font-black text-gray-400 uppercase">Items Owned</div>
                       <div className="text-2xl font-display">{user.inventory.length}</div>
                   </div>
                   <div className="bg-gray-50 p-3 rounded border border-black text-center">
                       <div className="text-xs font-black text-gray-400 uppercase">Ranger Rank</div>
                       <div className="text-2xl font-display">A</div>
                   </div>
                   <div className="bg-gray-50 p-3 rounded border border-black text-center">
                       <div className="text-xs font-black text-gray-400 uppercase">Missions</div>
                       <div className="text-2xl font-display">12</div>
                   </div>
               </div>
           </div>
       </div>

       {/* Editor Section */}
       <div className="grid md:grid-cols-4 gap-8">
           {/* Sidebar Tabs */}
           <div className="md:col-span-1 flex flex-col gap-3">
               {(['HAT', 'OUTFIT', 'ACCESSORY'] as const).map(tab => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`p-4 rounded-xl border-2 font-black uppercase text-left transition-all flex items-center justify-between group ${
                         activeTab === tab 
                         ? 'bg-black text-white border-black shadow-hard-sm translate-x-2' 
                         : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                     }`}
                   >
                       {t(`profile.categories.${tab}`)}
                       {activeTab === tab && <Star size={16} className="text-yellow-400 fill-current"/>}
                   </button>
               ))}
               
               <button 
                onClick={handleSave}
                className="mt-8 p-4 bg-green-500 text-white rounded-xl border-2 border-black font-black uppercase tracking-wider hover:bg-green-400 shadow-hard active:translate-y-1 active:shadow-none flex items-center justify-center gap-2"
               >
                   <Save size={20} /> {t('profile.save')}
               </button>
           </div>

           {/* Grid */}
           <div className="md:col-span-3 bg-white border-2 border-black rounded-xl p-6 min-h-[400px]">
               <h3 className="text-xl font-display uppercase mb-6 flex items-center gap-2">
                   {t(`profile.categories.${activeTab}`)} {t('profile.inventory')}
               </h3>
               
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                   {filteredItems.map(item => {
                       const isOwned = user.inventory.includes(item.id);
                       const isEquipped = currentConfig.hatId === item.id || currentConfig.outfitId === item.id || currentConfig.accessoryId === item.id;
                       
                       return (
                           <button
                             key={item.id}
                             disabled={!isOwned}
                             onClick={() => handleEquip(item)}
                             className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center p-4 transition-all group ${
                                 !isOwned 
                                   ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed' 
                                   : isEquipped 
                                     ? 'bg-yellow-100 border-black ring-2 ring-offset-2 ring-yellow-400' 
                                     : 'bg-white border-gray-200 hover:border-black hover:shadow-hard-sm'
                             }`}
                           >
                               <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{item.thumbnail}</div>
                               <div className="text-xs font-bold uppercase text-center leading-tight">{item.name}</div>
                               
                               {!isOwned && (
                                   <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                       <Lock className="text-gray-500" />
                                   </div>
                               )}
                               
                               {isEquipped && (
                                   <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
                               )}
                           </button>
                       );
                   })}
               </div>
           </div>
       </div>
    </div>
  );
};

export default Profile;
