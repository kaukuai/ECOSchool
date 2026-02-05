import React from 'react';
import { Ticket, Calendar, Gift, Crosshair } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Events: React.FC = () => {
  const { t, getMockEvents } = useLanguage();
  const events = getMockEvents();

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 text-center max-w-3xl mx-auto py-10 px-4 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-widest">
          <Crosshair className="inline-block mr-2 text-red-500" /> {t('events.title')}
        </h2>
        <p className="text-slate-400 font-mono text-sm">
          {t('events.desc')}
        </p>
      </div>

      <div className="space-y-12">
        {events.map(event => (
          <div key={event.id} className={`bg-white rounded-lg overflow-hidden shadow-lg border border-slate-200 grid md:grid-cols-2 group ${event.status === 'ENDED' ? 'opacity-60 grayscale' : 'hover:border-green-500 transition-colors'}`}>
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-0 left-0 bg-black/50 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="border-2 border-white/50 p-4 w-[90%] h-[90%] flex items-center justify-center">
                    <span className="text-white font-black uppercase tracking-widest text-xl">Top Secret</span>
                 </div>
              </div>
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur text-xs font-bold px-3 py-1 uppercase tracking-wide border border-white/10">
                {event.status === 'ACTIVE' ? <span className="text-green-400 animate-pulse">● {t('events.active')}</span> : <span className="text-red-400">{t('events.closed')}</span>}
              </div>
            </div>
            
            <div className="p-8 flex flex-col justify-center bg-slate-50 relative">
               {/* Decorative background number */}
              <div className="absolute top-4 right-4 text-9xl font-black text-slate-200/50 pointer-events-none -z-0">0{event.id}</div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-800 mb-3 uppercase leading-none">{event.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed font-mono text-sm border-l-2 border-slate-300 pl-4">
                  {event.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-700 bg-white p-3 rounded shadow-sm border border-slate-100">
                    <Gift className="text-purple-500" size={18} />
                    <span className="font-bold text-xs uppercase tracking-wide text-slate-400">{t('events.targetReward')}</span>
                    <span className="font-bold">{event.grandPrize}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 bg-white p-3 rounded shadow-sm border border-slate-100">
                    <Calendar className="text-blue-500" size={18} />
                    <span className="font-bold text-xs uppercase tracking-wide text-slate-400">{t('events.deadline')}</span>
                    <span className="font-mono">{event.endDate}</span>
                  </div>
                </div>

                <button 
                  disabled={event.status === 'ENDED'}
                  className={`w-full py-4 rounded font-black text-lg flex items-center justify-center gap-2 uppercase tracking-widest transition-all active:scale-95 ${
                    event.status === 'ACTIVE' 
                    ? 'bg-slate-900 text-white hover:bg-green-600 shadow-lg' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Ticket size={20} />
                  {event.status === 'ACTIVE' ? t('events.join') : t('events.completed')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;