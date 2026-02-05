import React from 'react';
import { User } from '../types';
import { ShoppingBag, Zap, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MallProps {
  user: User;
}

const Mall: React.FC<MallProps> = ({ user }) => {
  const { t, getMockItems } = useLanguage();
  const items = getMockItems();

  return (
    <div className="space-y-6">
      {/* Shop Header */}
      <div className="bg-slate-800 rounded-lg p-8 text-white relative overflow-hidden border-2 border-slate-700">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-widest flex items-center gap-3">
              <Package className="text-yellow-500" size={32} /> {t('mall.title')}
            </h2>
            <p className="text-slate-400 mt-2 font-mono text-sm max-w-lg">
              {t('mall.desc')}
            </p>
          </div>
          <div className="bg-slate-900/80 backdrop-blur px-6 py-4 rounded-lg border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <span className="text-slate-400 text-xs uppercase tracking-wider font-bold block mb-1">{t('mall.credits')}</span>
            <span className="text-3xl font-black text-yellow-400 flex items-center gap-2">
              <Zap fill="currentColor" size={24} /> {user.points} <span className="text-lg text-yellow-600">XP</span>
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden group hover:border-green-500 transition-colors">
            <div className="aspect-square overflow-hidden relative bg-slate-100">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
              {item.stock < 10 && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase tracking-wider">
                  {t('mall.critical')}
                </span>
              )}
            </div>
            <div className="p-4 bg-slate-50">
              <h3 className="font-bold text-slate-800 mb-1 truncate uppercase text-sm">{item.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-slate-600 font-bold flex items-center gap-1 text-sm bg-slate-200 px-2 py-1 rounded">
                  <Zap size={12} className="text-yellow-600" fill="currentColor" /> {item.cost}
                </span>
                <button 
                  disabled={user.points < item.cost}
                  className={`p-2 rounded transition-colors ${
                    user.points >= item.cost 
                      ? 'bg-green-600 text-white hover:bg-green-700 shadow-md' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mall;