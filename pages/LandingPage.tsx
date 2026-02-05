import React from 'react';
import { Play, Target, Shield, Award, ChevronRight, AlertTriangle, Crosshair, Zap } from 'lucide-react';
import { Course, CourseStatus, Language } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingPageProps {
  onLogin: () => void;
  onPreviewCourse: (course: Course) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onPreviewCourse }) => {
  const { t, language, setLanguage } = useLanguage();
  
  // Dynamic mock data for preview (simplified for landing page usage)
  const getPreviewCourses = () => {
    const isZh = language === Language.ZH;
    const isJa = language === Language.JA;
    const isKo = language === Language.KO;

    return [
      {
        id: 'p1',
        title: isZh ? '任務：海洋防禦' : isJa ? 'ミッション: 海洋防衛' : isKo ? '미션: 해양 방어' : 'Mission: Ocean Defense',
        description: isZh ? '第七區（太平洋）情況危急。立即調查塑膠聚集區。' : isJa ? 'セクター7（太平洋）は危機的状況。プラスチック集積地帯を直ちに調査せよ。' : isKo ? '섹터 7(태평양)이 위급합니다. 플라스틱 축적 구역을 즉시 조사하십시오.' : 'Sector 7 (Pacific) is critical. Investigate the plastic accumulation zones immediately.',
        thumbnail: 'https://picsum.photos/400/250?random=101',
        duration: '5m',
        pointsReward: 50,
        status: CourseStatus.IN_PROGRESS,
        category: 'Marine Ops',
        mapX: 0,
        mapY: 0,
        unlocks: []
      },
      {
        id: 'p2',
        title: isZh ? '行動：零廢棄' : isJa ? '作戦: ウェイスト・ゼロ' : isKo ? '작전: 폐기물 제로' : 'Operation: Waste Zero',
        description: isZh ? '滲透戰術：使用高級分類將家庭垃圾產量減少 50%。' : isJa ? '浸透戦術: 高度な分別を使用して家庭ごみの排出量を50%削減する。' : isKo ? '침투 전술: 고급 분리 수거를 사용하여 가정 폐기물 배출량을 50% 줄이십시오.' : 'Infiltration tactic: Reduce household waste output by 50% using advanced sorting.',
        thumbnail: 'https://picsum.photos/400/250?random=102',
        duration: '8m',
        pointsReward: 50,
        status: CourseStatus.IN_PROGRESS,
        category: 'Urban Tactics',
        mapX: 0,
        mapY: 0,
        unlocks: []
      },
      {
        id: 'p3',
        title: isZh ? '情報：蜂群思維' : isJa ? 'インテル: ハイブマインド' : isKo ? '정보: 하이브 마인드' : 'Intel: The Hive Mind',
        description: isZh ? '授粉無人機分析。了解蜜蜂在全球穩定中的關鍵作用。' : isJa ? '受粉ドローン分析。世界の安定におけるミツバチの重要な役割を理解する。' : isKo ? '수분 드론 분석. 세계 안정에서 꿀벌의 중요한 역할 이해.' : 'Pollinator drone analysis. Understanding the critical role of bees in global stability.',
        thumbnail: 'https://picsum.photos/400/250?random=103',
        duration: '6m',
        pointsReward: 50,
        status: CourseStatus.IN_PROGRESS,
        category: 'Bio-Intel',
        mapX: 0,
        mapY: 0,
        unlocks: []
      }
    ];
  };

  const previewCourses = getPreviewCourses();

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b-4 border-black h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-lg border-2 border-black shadow-hard-sm">
              <Shield size={24} strokeWidth={3} className="text-white" />
            </div>
            <span className="text-2xl font-display text-black uppercase tracking-tight">Eco<span className="text-green-600">Rangers</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={onLogin}
              className="hidden md:block font-bold uppercase text-sm tracking-widest hover:text-green-600 px-4 py-2 border-2 border-transparent hover:border-black rounded transition-all"
            >
              {t('hero.ctaLogin')}
            </button>
            <button 
              onClick={onLogin}
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2 rounded-lg font-black uppercase tracking-wider transition-all border-2 border-black shadow-hard active:translate-y-1 active:shadow-none"
            >
              {t('hero.ctaEnlist')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Low Poly Landscape */}
      <section className="pt-32 pb-20 px-4 relative bg-[#dcfce7] overflow-hidden">
        {/* Geometric Mountains/Shapes Background */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-green-500 clip-poly-bottom z-10 border-t-4 border-black"></div>
        <div className="absolute bottom-0 right-0 w-3/4 h-48 bg-green-600 clip-jagged z-0 opacity-80"></div>
        
        {/* Floating Clouds (Geometric) */}
        <div className="absolute top-32 left-10 w-32 h-16 bg-white rounded-full border-2 border-black shadow-hard opacity-80 animate-float"></div>
        <div className="absolute top-48 right-20 w-24 h-12 bg-white rounded-full border-2 border-black shadow-hard-sm opacity-60 animate-bounce" style={{animationDuration: '4s'}}></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded border-2 border-black font-black text-xs uppercase mb-6 shadow-hard-sm rotate-1">
              <AlertTriangle size={16} strokeWidth={3} />
              <span>{t('hero.alert')}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-display text-black leading-[0.9] mb-6 drop-shadow-sm">
              {t('hero.title1')} <span className="text-green-500 text-shadow-black">{t('hero.title2')}</span><br />
              {t('hero.title3')} <br />
              <span className="text-blue-500 text-shadow-black">{t('hero.title4')}</span>
            </h1>
            <p className="text-xl text-slate-800 mb-8 max-w-lg font-bold">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onLogin}
                className="bg-green-500 text-white px-8 py-4 rounded-xl font-black text-xl uppercase tracking-widest border-4 border-black shadow-hard hover:bg-green-400 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <Crosshair size={28} strokeWidth={3} />
                {t('hero.ctaStart')}
              </button>
              <a 
                href="#briefing"
                className="bg-white text-black px-8 py-4 rounded-xl font-black text-xl border-4 border-black shadow-hard hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 uppercase"
              >
                <Play size={28} strokeWidth={3} /> {t('hero.ctaWatch')}
              </a>
            </div>
          </div>
          
          <div className="relative flex justify-center">
             {/* Mascot / Hero Image Container */}
            <div className="relative w-full max-w-md aspect-square">
               {/* Decorative Shapes behind */}
               <div className="absolute inset-0 bg-yellow-400 rounded-full border-4 border-black scale-90 animate-pulse"></div>
               <div className="absolute inset-0 bg-blue-400 clip-jagged opacity-50 scale-110"></div>
               
               {/* Main Image styled as a sticker */}
               <div className="absolute inset-0 z-10 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Ranger in field" 
                    className="w-full h-full object-cover rounded-3xl border-4 border-black shadow-hard-lg"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute -top-6 -right-6 bg-white border-4 border-black p-4 rounded-full shadow-hard animate-bounce">
                     <Award size={40} className="text-yellow-500" strokeWidth={3} />
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 bg-purple-500 border-4 border-black px-6 py-2 rounded-xl shadow-hard text-white font-black uppercase text-xl rotate-[-5deg]">
                     Win Trip!
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Phases - Flat Cards */}
      <section id="briefing" className="py-20 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display text-black uppercase mb-4">
              {t('briefing.orders')}
            </h2>
            <p className="text-xl font-bold text-gray-500">
              {t('briefing.ordersSub')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
                { icon: Target, color: 'bg-blue-400', title: t('briefing.phase1Title'), text: t('briefing.phase1Text') },
                { icon: Zap, color: 'bg-yellow-400', title: t('briefing.phase2Title'), text: t('briefing.phase2Text') },
                { icon: Award, color: 'bg-purple-400', title: t('briefing.phase3Title'), text: t('briefing.phase3Text') }
            ].map((phase, idx) => (
                <div key={idx} className="bg-white p-8 border-4 border-black rounded-2xl shadow-hard hover:-translate-y-2 transition-transform relative">
                    <div className={`w-20 h-20 ${phase.color} rounded-full flex items-center justify-center border-4 border-black absolute -top-10 left-1/2 transform -translate-x-1/2`}>
                        <phase.icon size={40} className="text-black" strokeWidth={2.5} />
                    </div>
                    <div className="mt-8 text-center">
                        <div className="text-6xl font-display text-gray-100 absolute top-4 right-4 -z-10">{idx + 1}</div>
                        <h3 className="text-3xl font-display text-black mb-3 uppercase">{phase.title}</h3>
                        <p className="text-lg font-bold text-gray-600 leading-snug">
                            {phase.text}
                        </p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Select (Preview) */}
      <section className="py-20 px-4 bg-gray-50 border-t-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="bg-black text-white px-3 py-1 inline-block font-black uppercase text-xs mb-2 transform -rotate-2">Public Access</div>
              <h2 className="text-4xl font-display text-black uppercase">Active Missions</h2>
            </div>
            <button onClick={onLogin} className="hidden md:flex items-center gap-2 text-black font-black uppercase text-lg border-b-4 border-green-500 hover:border-black transition-colors">
              Access All Files <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {previewCourses.map((course) => (
              <div 
                key={course.id} 
                onClick={() => onPreviewCourse(course)}
                className="group cursor-pointer bg-white border-4 border-black rounded-xl overflow-hidden shadow-hard hover:shadow-hard-lg transition-all hover:-translate-y-1 relative"
              >
                <div className="relative h-48 bg-gray-200 border-b-4 border-black">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 p-4 rounded-full border-4 border-black opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                      <Play size={32} fill="black" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-yellow-400 text-black border-2 border-black px-2 py-0.5 font-bold text-xs uppercase">
                    Free Trial
                  </div>
                </div>
                
                <div className="p-6 bg-white">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-xs uppercase bg-gray-200 px-2 py-1 rounded border border-black">{course.category}</span>
                    <span className="text-green-600 font-black flex items-center gap-1"><Zap size={16} fill="currentColor"/> +{course.pointsReward} XP</span>
                  </div>
                  <h3 className="font-display text-2xl text-black mb-2 uppercase leading-none">{course.title}</h3>
                  <p className="text-sm font-bold text-gray-500 line-clamp-2">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment / Pricing */}
      <section className="py-20 bg-green-500 border-t-4 border-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-display text-white text-shadow-black mb-8 uppercase">
            Join the Squad
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Solo Operative */}
            <div className="bg-white border-4 border-black p-8 shadow-hard rounded-2xl relative">
              <h3 className="text-3xl font-display text-black mb-2 uppercase rotate-[-2deg]">Lone Wolf</h3>
              <p className="text-gray-500 font-bold mb-6">For the solo hero.</p>
              <div className="text-5xl font-display text-black mb-6">$9<span className="text-xl font-bold text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {['Unlimited Access', 'Shop Rights', '1x Lottery Ticket'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold text-gray-700">
                        <div className="w-4 h-4 bg-black rounded-sm"></div> {item}
                    </li>
                ))}
              </ul>
              <button onClick={onLogin} className="w-full py-4 bg-gray-200 text-black font-black uppercase tracking-widest hover:bg-black hover:text-white border-4 border-transparent hover:border-white transition-all rounded-lg">
                Go Solo
              </button>
            </div>

            {/* Squad Plan */}
            <div className="bg-yellow-400 border-4 border-black p-8 shadow-hard-lg rounded-2xl relative transform scale-105 z-10">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white border-4 border-black px-4 py-2 font-black uppercase tracking-wider rotate-3 whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="text-3xl font-display text-black mb-2 uppercase rotate-[-2deg]">Squad Leader</h3>
              <p className="text-black/70 font-bold mb-6">Up to 5 Rangers.</p>
              <div className="text-5xl font-display text-black mb-6">$19<span className="text-xl font-bold text-black/50">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {['Everything in Solo', 'Squad Dashboard', '5x Lottery Tickets'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-black text-black">
                        <div className="w-4 h-4 bg-white border-2 border-black rounded-sm"></div> {item}
                    </li>
                ))}
              </ul>
              <button onClick={onLogin} className="w-full py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-white hover:text-black border-4 border-transparent hover:border-black transition-all rounded-lg">
                Create Squad
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 text-white font-bold border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="text-green-500" size={32} />
            <span className="font-display text-2xl uppercase">EcoRangers HQ</span>
          </div>
          <div className="text-gray-400">
            &copy; 2023 EcoAcademy. Game on.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;