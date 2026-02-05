
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Course, CourseStatus, RewardItem, Event, Task, AvatarItem, User } from '../types';

// Translation Dictionary
const translations = {
  [Language.EN]: {
    appName: "Eco-Rangers",
    subTitle: "HQ Terminal",
    titles: {
      1: "Novice Scout",
      5: "Field Investigator",
      10: "Nature Guardian",
      15: "Senior Researcher",
      20: "Eco-Master"
    },
    nav: {
      baseCamp: "Base Camp",
      missions: "Missions",
      supplyDepot: "Supply Depot",
      specialOps: "Special Ops",
      profile: "Locker Room",
      logout: "Abort"
    },
    hero: {
      alert: "Priority Alert: Earth Needs You!",
      title1: "PLAY",
      title2: "GAMES.",
      title3: "SAVE THE",
      title4: "PLANET.",
      subtitle: "Join the Eco-Rangers squad. Train in missions, earn XP, and win real rewards while protecting the environment.",
      ctaStart: "Start Mission",
      ctaWatch: "Watch Intel",
      ctaEnlist: "Enlist Now",
      ctaLogin: "Ranger Login"
    },
    briefing: {
      orders: "Your Orders",
      ordersSub: "Three steps to becoming a Legendary Ranger.",
      phase1Title: "Train",
      phase1Text: "Watch short, fun videos to learn about the threats.",
      phase2Title: "Act",
      phase2Text: "Complete quizzes and real-world tasks to earn XP.",
      phase3Title: "Win",
      phase3Text: "Use XP to buy gear or enter the lottery for trips."
    },
    dashboard: {
      welcome: "Welcome back,",
      ranger: "Ranger",
      message: "Eco-Bot 3000 here! The forest needs you. Complete your daily ops!",
      xp: "Experience",
      rank: "Current Rank",
      level: "Level",
      streak: "Streak",
      days: "Days",
      dailyOps: "Daily Missions",
      activityLog: "Activity Log",
      topRangers: "Top Rangers",
      compete: "Compete globally! Reset in 4 days.",
      viewAll: "View Full Rankings",
      you: "You",
      nextRank: "Next Rank"
    },
    profile: {
      title: "Ranger Locker Room",
      editAppearance: "Edit Appearance",
      inventory: "Gear Inventory",
      equipped: "Equipped",
      locked: "Locked",
      categories: {
        HAT: "Headgear",
        OUTFIT: "Uniform",
        ACCESSORY: "Tech"
      },
      save: "Save Loadout"
    },
    courses: {
      mapTitle: "Tactical Map",
      liveFeed: "LIVE SATELLITE FEED ACTIVE",
      status: "Status",
      clearanceDenied: "Clearance Denied",
      startMission: "Start Mission",
      awaitingOrders: "Awaiting Orders",
      selectSector: "Select a sector on the tactical map to view mission parameters.",
      abilities: "Ranger Abilities",
      unlock: "Complete sector to unlock.",
      rewardItem: "Unlocks Gear:"
    },
    mall: {
      title: "Supply Depot",
      desc: "Requisition eco-gear using your earned XP. All items are verified sustainable.",
      credits: "Available Credits",
      critical: "Critical Stock",
      cost: "Cost"
    },
    events: {
      title: "Special Ops",
      desc: "High-priority targets. Win exclusive expeditions and gear.",
      active: "Active Operation",
      closed: "Mission Closed",
      targetReward: "Target Reward:",
      deadline: "Deadline:",
      join: "Join Op",
      completed: "Op Completed"
    },
    intro: {
      scanning: "SCANNING SECTOR: EARTH...",
      bio: "ANALYZING BIOSPHERE...",
      critical: "CRITICAL FAILURE",
      co2: "CO2 LEVELS...",
      unsafe: "EXCEEDING SAFETY LIMITS",
      biodiversity: "BIODIVERSITY...",
      collapsing: "COLLAPSING",
      sos: "SOS SIGNAL",
      dying: "Our Home is Dying",
      recruiting: "Recruiting Guardians",
      question: "Do you have what it takes to save the world?",
      skip: "Skip Sequence",
      accessing: "ACCESSING SECURE TERMINAL...",
      verifying: "VERIFYING DNA SEQUENCE...",
      match: "MATCH FOUND: RANGER CLASS A",
      granted: "ACCESS GRANTED",
      identity: "Identity Confirmed",
      enter: "Enter Base Camp",
      welcomeBack: "Welcome back, Ranger. The Eco-grid is online."
    }
  },
  [Language.ZH]: {
    appName: "生態遊騎兵",
    subTitle: "總部終端",
    titles: {
      1: "新手偵查員",
      5: "野外調查員",
      10: "自然守護者",
      15: "資深研究員",
      20: "生態大師"
    },
    nav: {
      baseCamp: "大本營",
      missions: "任務地圖",
      supplyDepot: "補給站",
      specialOps: "特別行動",
      profile: "更衣室",
      logout: "登出"
    },
    hero: {
      alert: "緊急警報：地球需要你！",
      title1: "玩",
      title2: "遊戲，",
      title3: "拯救",
      title4: "地球。",
      subtitle: "加入生態遊騎兵小隊。通過任務訓練，賺取 XP，在保護環境的同時贏得真實獎勵。",
      ctaStart: "開始任務",
      ctaWatch: "觀看情報",
      ctaEnlist: "立即入伍",
      ctaLogin: "遊騎兵登入"
    },
    briefing: {
      orders: "你的指令",
      ordersSub: "成為傳奇遊騎兵的三個步驟。",
      phase1Title: "訓練",
      phase1Text: "觀看有趣的短片，了解環境威脅。",
      phase2Title: "行動",
      phase2Text: "完成測驗和現實生活中的任務以賺取 XP。",
      phase3Title: "獲勝",
      phase3Text: "使用 XP 購買裝備或參加抽獎贏得旅行。"
    },
    dashboard: {
      welcome: "歡迎回來，",
      ranger: "遊騎兵",
      message: "Eco-Bot 3000 報告！森林需要你。完成你的每日行動！",
      xp: "經驗值",
      rank: "當前軍階",
      level: "等級",
      streak: "連勝紀錄",
      days: "天",
      dailyOps: "每日任務",
      activityLog: "活動日誌",
      topRangers: "頂尖遊騎兵",
      compete: "全球競爭！4天後重置。",
      viewAll: "查看完整排名",
      you: "你",
      nextRank: "下一軍階"
    },
    profile: {
      title: "遊騎兵更衣室",
      editAppearance: "編輯外觀",
      inventory: "裝備庫存",
      equipped: "已裝備",
      locked: "未解鎖",
      categories: {
        HAT: "頭飾",
        OUTFIT: "制服",
        ACCESSORY: "科技配件"
      },
      save: "保存配置"
    },
    courses: {
      mapTitle: "戰術地圖",
      liveFeed: "衛星連線中",
      status: "狀態",
      clearanceDenied: "權限不足",
      startMission: "開始任務",
      awaitingOrders: "等待指令",
      selectSector: "在戰術地圖上選擇一個區域以查看任務參數。",
      abilities: "遊騎兵技能",
      unlock: "完成區域以解鎖。",
      rewardItem: "解鎖裝備："
    },
    mall: {
      title: "補給站",
      desc: "使用你賺取的 XP 申請生態裝備。所有物品均經過可持續認證。",
      credits: "可用額度",
      critical: "庫存告急",
      cost: "花費"
    },
    events: {
      title: "特別行動",
      desc: "高優先級目標。贏得獨家探險和裝備。",
      active: "行動進行中",
      closed: "任務結束",
      targetReward: "目標獎勵：",
      deadline: "截止日期：",
      join: "加入行動",
      completed: "行動已完成"
    },
    intro: {
      scanning: "正在掃描區域：地球...",
      bio: "分析生物圈...",
      critical: "嚴重故障",
      co2: "二氧化碳水平...",
      unsafe: "超出安全限制",
      biodiversity: "生物多樣性...",
      collapsing: "正在崩潰",
      sos: "求救信號",
      dying: "我們的家園正在消亡",
      recruiting: "招募守護者",
      question: "你有能力拯救世界嗎？",
      skip: "跳過動畫",
      accessing: "正在訪問安全終端...",
      verifying: "驗證 DNA 序列...",
      match: "匹配成功：A 級遊騎兵",
      granted: "訪問被允許",
      identity: "身份已確認",
      enter: "進入大本營",
      welcomeBack: "歡迎回來，遊騎兵。生態網格已上線。"
    }
  },
  [Language.JA]: {
    appName: "エコレンジャー",
    subTitle: "本部ターミナル",
    titles: {
      1: "見習いスカウト",
      5: "フィールド調査員",
      10: "自然の守護者",
      15: "上級研究員",
      20: "エコ・マスター"
    },
    nav: {
      baseCamp: "ベースキャンプ",
      missions: "ミッション",
      supplyDepot: "補給デポ",
      specialOps: "特殊作戦",
      profile: "ロッカールーム",
      logout: "離脱"
    },
    hero: {
      alert: "優先警報：地球があなたを必要としています！",
      title1: "ゲームを",
      title2: "プレイし、",
      title3: "地球を",
      title4: "救え。",
      subtitle: "エコレンジャー部隊に参加しよう。ミッションで訓練し、XPを獲得し、環境を守りながら報酬を手に入れよう。",
      ctaStart: "ミッション開始",
      ctaWatch: "情報を確認",
      ctaEnlist: "今すぐ入隊",
      ctaLogin: "ログイン"
    },
    briefing: {
      orders: "指令",
      ordersSub: "伝説のレンジャーになるための3つのステップ。",
      phase1Title: "訓練",
      phase1Text: "環境の脅威について学ぶための短い動画を見る。",
      phase2Title: "行動",
      phase2Text: "クイズや現実のタスクを完了してXPを獲得。",
      phase3Title: "勝利",
      phase3Text: "XPを使って装備を購入したり、旅行が当たる抽選に参加。",
    },
    dashboard: {
      welcome: "お帰りなさい、",
      ranger: "レンジャー",
      message: "Eco-Bot 3000です！森があなたを必要としています。日次作戦を完了してください！",
      xp: "経験値",
      rank: "現在のランク",
      level: "レベル",
      streak: "ストリーク",
      days: "日",
      dailyOps: "デイリーミッション",
      activityLog: "活動ログ",
      topRangers: "トップレンジャー",
      compete: "世界ランキング！あと4日でリセット。",
      viewAll: "全ランキングを見る",
      you: "あなた",
      nextRank: "次のランク"
    },
    profile: {
      title: "レンジャー・ロッカー",
      editAppearance: "外見を編集",
      inventory: "装備インベントリ",
      equipped: "装備中",
      locked: "未解除",
      categories: {
        HAT: "ヘッドギア",
        OUTFIT: "制服",
        ACCESSORY: "ハイテク装備"
      },
      save: "装備を保存"
    },
    courses: {
      mapTitle: "戦術マップ",
      liveFeed: "衛星フィード アクティブ",
      status: "ステータス",
      clearanceDenied: "許可がありません",
      startMission: "ミッション開始",
      awaitingOrders: "指令待機中",
      selectSector: "戦術マップ上のセクターを選択して詳細を表示してください。",
      abilities: "レンジャーアビリティ",
      unlock: "セクター完了で解除",
      rewardItem: "解除装備:"
    },
    mall: {
      title: "補給デポ",
      desc: "獲得したXPを使ってエコ装備を請求します。すべてのアイテムは持続可能性が検証されています。",
      credits: "利用可能クレジット",
      critical: "在庫僅少",
      cost: "コスト"
    },
    events: {
      title: "特殊作戦",
      desc: "最優先ターゲット。限定の遠征や装備を獲得しよう。",
      active: "作戦進行中",
      closed: "ミッション終了",
      targetReward: "ターゲット報酬:",
      deadline: "期限:",
      join: "作戦に参加",
      completed: "作戦完了"
    },
    intro: {
      scanning: "セクターをスキャン中: 地球...",
      bio: "生物圏を分析中...",
      critical: "重大な障害",
      co2: "CO2レベル...",
      unsafe: "安全限界を超過",
      biodiversity: "生物多様性...",
      collapsing: "崩壊中",
      sos: "SOS信号",
      dying: "故郷が死にかけている",
      recruiting: "ガーディアン募集中",
      question: "世界を救う覚悟はありますか？",
      skip: "スキップ",
      accessing: "セキュリティ端末にアクセス中...",
      verifying: "DNAシーケンスを確認中...",
      match: "一致しました: レンジャークラスA",
      granted: "アクセス許可",
      identity: "本人確認完了",
      enter: "ベースキャンプへ",
      welcomeBack: "お帰りなさい、レンジャー。エコグリッドはオンラインです。"
    }
  },
  [Language.KO]: {
    appName: "에코 레인저",
    subTitle: "본부 터미널",
    titles: {
      1: "견습 스카우트",
      5: "현장 조사원",
      10: "자연 수호자",
      15: "선임 연구원",
      20: "에코 마스터"
    },
    nav: {
      baseCamp: "베이스 캠프",
      missions: "미션",
      supplyDepot: "보급소",
      specialOps: "특수 작전",
      profile: "라커룸",
      logout: "중단"
    },
    hero: {
      alert: "우선 경보: 지구가 당신을 필요로 합니다!",
      title1: "게임을",
      title2: "플레이하고,",
      title3: "지구를",
      title4: "구하세요.",
      subtitle: "에코 레인저 분대에 합류하세요. 미션에서 훈련하고, XP를 얻고, 환경을 보호하며 실제 보상을 받으세요.",
      ctaStart: "미션 시작",
      ctaWatch: "정보 확인",
      ctaEnlist: "지금 입대",
      ctaLogin: "로그인"
    },
    briefing: {
      orders: "귀하의 명령",
      ordersSub: "전설적인 레인저가 되는 3단계.",
      phase1Title: "훈련",
      phase1Text: "환경 위협에 대해 배우기 위해 짧고 재미있는 비디오를 시청하세요.",
      phase2Title: "행동",
      phase2Text: "퀴즈와 실제 작업을 완료하여 XP를 획득하세요.",
      phase3Title: "승리",
      phase3Text: "XP를 사용하여 장비를 구매하거나 여행 당첨 기회를 얻으세요."
    },
    dashboard: {
      welcome: "환영합니다,",
      ranger: "레인저",
      message: "에코봇 3000입니다! 숲이 당신을 필요로 합니다. 일일 작전을 완료하세요!",
      xp: "경험치",
      rank: "현재 계급",
      level: "레벨",
      streak: "연속",
      days: "일",
      dailyOps: "일일 임무",
      activityLog: "활동 로그",
      topRangers: "최정예 레인저",
      compete: "글로벌 경쟁! 4일 후 초기화.",
      viewAll: "전체 순위 보기",
      you: "나",
      nextRank: "다음 계급"
    },
    profile: {
      title: "레인저 라커룸",
      editAppearance: "외모 편집",
      inventory: "장비 보관함",
      equipped: "장착됨",
      locked: "잠김",
      categories: {
        HAT: "헤드기어",
        OUTFIT: "유니폼",
        ACCESSORY: "테크 장비"
      },
      save: "장비 저장"
    },
    courses: {
      mapTitle: "전술 지도",
      liveFeed: "위성 피드 활성",
      status: "상태",
      clearanceDenied: "승인 거부됨",
      startMission: "미션 시작",
      awaitingOrders: "명령 대기 중",
      selectSector: "임무 매개변수를 보려면 전술 지도에서 구역을 선택하세요.",
      abilities: "레인저 능력",
      unlock: "잠금 해제하려면 구역 완료.",
      rewardItem: "장비 잠금 해제:"
    },
    mall: {
      title: "보급소",
      desc: "획득한 XP를 사용하여 친환경 장비를 요청하세요. 모든 품목은 지속 가능성이 검증되었습니다.",
      credits: "사용 가능 크레딧",
      critical: "재고 임박",
      cost: "비용"
    },
    events: {
      title: "특수 작전",
      desc: "최우선 목표. 독점 탐험 및 장비를 획득하세요.",
      active: "작전 진행 중",
      closed: "임무 종료",
      targetReward: "목표 보상:",
      deadline: "마감일:",
      join: "작전 참여",
      completed: "작전 완료"
    },
    intro: {
      scanning: "구역 스캔 중: 지구...",
      bio: "생물권 분석 중...",
      critical: "치명적인 오류",
      co2: "CO2 수준...",
      unsafe: "안전 한계 초과",
      biodiversity: "생물 다양성...",
      collapsing: "붕괴 중",
      sos: "SOS 신호",
      dying: "우리의 집이 죽어가고 있습니다",
      recruiting: "수호자 모집",
      question: "세상을 구할 능력이 있습니까?",
      skip: "건너뛰기",
      accessing: "보안 터미널 접속 중...",
      verifying: "DNA 서열 확인 중...",
      match: "일치함: 레인저 등급 A",
      granted: "접속 승인",
      identity: "신원 확인됨",
      enter: "베이스 캠프 입장",
      welcomeBack: "환영합니다, 레인저. 에코 그리드가 온라인 상태입니다."
    }
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any; // Simple key accessor
  getMockCourses: () => Course[];
  getMockTasks: () => Task[];
  getMockItems: () => RewardItem[];
  getMockEvents: () => Event[];
  getAvatarItems: () => AvatarItem[];
  getUserTitle: (level: number) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  const getUserTitle = (level: number) => {
    const titles = translations[language].titles;
    // Simple logic: return highest title where key <= level
    let currentTitle = titles[1]; // Default
    const levels = [1, 5, 10, 15, 20];
    for (const l of levels) {
       if (level >= l) currentTitle = titles[l as keyof typeof titles];
    }
    return currentTitle;
  };

  // Helper to get localized mock data
  const getMockCourses = (): Course[] => {
    const isEn = language === Language.EN;
    const isZh = language === Language.ZH;
    const isJa = language === Language.JA;
    // Simple localization logic for demo
    return [
      {
        id: '1',
        title: isZh ? '大本營：入伍' : isJa ? 'ベースキャンプ: 入隊' : language === Language.KO ? '베이스 캠프: 오리엔테이션' : 'Base Camp: Orientation',
        description: isZh ? '學習成為遊騎兵的基礎知識。' : isJa ? 'レンジャーの基本を学ぶ。' : language === Language.KO ? '레인저의 기초를 배우세요.' : 'Learn the basics of being a Ranger.',
        thumbnail: 'https://picsum.photos/400/250?random=1',
        duration: '5m',
        pointsReward: 50,
        status: CourseStatus.COMPLETED,
        category: 'Basic Training',
        mapX: 50,
        mapY: 85,
        unlocks: ['2', '3'],
        itemRewardId: 'outfit_1'
      },
      {
        id: '2',
        title: isZh ? '第一區：塑膠海灘' : isJa ? 'セクター1: プラスチックビーチ' : language === Language.KO ? '섹터 1: 플라스틱 해변' : 'Sector 1: The Plastic Beach',
        description: isZh ? '清理海岸線。' : isJa ? '海岸線を清掃せよ。' : language === Language.KO ? '해안선을 청소하세요.' : 'Clean up the coastline.',
        thumbnail: 'https://picsum.photos/400/250?random=2',
        duration: '15m',
        pointsReward: 100,
        status: CourseStatus.IN_PROGRESS,
        category: 'Marine Ops',
        mapX: 25,
        mapY: 60,
        unlocks: ['4'],
        itemRewardId: 'hat_1'
      },
      {
        id: '3',
        title: isZh ? '第二區：城市叢林' : isJa ? 'セクター2: アーバンジャングル' : language === Language.KO ? '섹터 2: 도시 정글' : 'Sector 2: Urban Jungle',
        description: isZh ? '減少城市廢物。' : isJa ? '都市の廃棄物を削減せよ。' : language === Language.KO ? '도시의 쓰레기를 줄이세요.' : 'Reduce waste in the city.',
        thumbnail: 'https://picsum.photos/400/250?random=3',
        duration: '20m',
        pointsReward: 150,
        status: CourseStatus.LOCKED,
        category: 'City Ops',
        mapX: 75,
        mapY: 60,
        unlocks: ['5']
      },
      {
        id: '4',
        title: isZh ? '第三區：珊瑚核心' : isJa ? 'セクター3: サンゴ礁コア' : language === Language.KO ? '섹터 3: 산호초 코어' : 'Sector 3: Coral Reef Core',
        description: isZh ? '深海潛水任務。' : isJa ? '深海潜水ミッション。' : language === Language.KO ? '심해 잠수 미션.' : 'Deep dive mission.',
        thumbnail: 'https://picsum.photos/400/250?random=4',
        duration: '25m',
        pointsReward: 200,
        status: CourseStatus.LOCKED,
        category: 'Marine Ops',
        mapX: 20,
        mapY: 30,
        unlocks: ['6'],
        itemRewardId: 'acc_1'
      },
      {
        id: '5',
        title: isZh ? '第四區：太陽能堡壘' : isJa ? 'セクター4: ソーラーシタデル' : language === Language.KO ? '섹터 4: 태양 요새' : 'Sector 4: Solar Citadel',
        description: isZh ? '啟動電網。' : isJa ? '送電網を起動せよ。' : language === Language.KO ? '전력망을 가동하세요.' : 'Power up the grid.',
        thumbnail: 'https://picsum.photos/400/250?random=5',
        duration: '30m',
        pointsReward: 300,
        status: CourseStatus.LOCKED,
        category: 'Tech Ops',
        mapX: 80,
        mapY: 35,
        unlocks: ['6'],
        itemRewardId: 'outfit_2'
      },
      {
        id: '6',
        title: isZh ? '最終頭目：碳巨人' : isJa ? '最終ボス: カーボンゴーレム' : language === Language.KO ? '최종 보스: 탄소 골렘' : 'Final Boss: Carbon Golem',
        description: isZh ? '可持續性的終極考驗。' : isJa ? '持続可能性の究極の試練。' : language === Language.KO ? '지속 가능성의 궁극적인 시험.' : 'The ultimate test of sustainability.',
        thumbnail: 'https://picsum.photos/400/250?random=6',
        duration: '45m',
        pointsReward: 500,
        status: CourseStatus.LOCKED,
        category: 'Boss Fight',
        mapX: 50,
        mapY: 10,
        unlocks: []
      }
    ];
  };

  const getMockTasks = (): Task[] => {
    const isZh = language === Language.ZH;
    const isJa = language === Language.JA;
    return [
      { id: '1', title: isZh ? '每日總部登入' : isJa ? '本部へのログイン' : language === Language.KO ? '일일 본부 로그인' : 'Daily HQ Login', reward: 10, completed: true },
      { id: '2', title: isZh ? '觀看 1 個任務視頻' : isJa ? 'ミッション動画を1つ視聴' : language === Language.KO ? '미션 비디오 1개 시청' : 'Watch 1 Mission Video', reward: 50, completed: false },
      { id: '3', title: isZh ? '在技能測驗中獲得滿分' : isJa ? 'スキルクイズで満点を取る' : language === Language.KO ? '스킬 퀴즈 만점 받기' : 'Ace a Skill Quiz', reward: 30, completed: false },
      { id: '4', title: isZh ? '邀請朋友' : isJa ? '友達を招待' : language === Language.KO ? '친구 초대' : 'Invite a Friend', reward: 20, completed: false },
    ];
  };

  const getMockItems = (): RewardItem[] => {
    const isZh = language === Language.ZH;
    const isJa = language === Language.JA;
    return [
      { id: '1', name: isZh ? '竹製戰術刷' : isJa ? '竹製タクティカルブラシ' : language === Language.KO ? '대나무 전술 칫솔' : 'Bamboo Tactical Brush', cost: 500, stock: 50, image: 'https://picsum.photos/300/300?random=10' },
      { id: '2', name: isZh ? '遊騎兵帆布包' : isJa ? 'レンジャーキャンバスパック' : language === Language.KO ? '레인저 캔버스 팩' : 'Ranger Canvas Pack', cost: 800, stock: 25, image: 'https://picsum.photos/300/300?random=11' },
      { id: '3', name: isZh ? '太陽能野戰充電器' : isJa ? 'ソーラーフィールド充電器' : language === Language.KO ? '태양광 필드 충전기' : 'Solar Field Charger', cost: 2500, stock: 5, image: 'https://picsum.photos/300/300?random=12' },
      { id: '4', name: isZh ? '金屬吸管套件' : isJa ? 'メタルストローキット' : language === Language.KO ? '금속 빨대 키트' : 'Metal Straw Kit', cost: 300, stock: 100, image: 'https://picsum.photos/300/300?random=13' },
      { id: '5', name: isZh ? '捐款：野生動物基金' : isJa ? '寄付: 野生動物基金' : language === Language.KO ? '기부: 야생동물 기금' : 'Donation: Wildlife Fund', cost: 1000, stock: 999, image: 'https://picsum.photos/300/300?random=14' },
    ];
  };

  const getMockEvents = (): Event[] => {
    const isZh = language === Language.ZH;
    const isJa = language === Language.JA;
    const isKo = language === Language.KO;
    
    return [
      {
        id: '1',
        title: isZh ? '行動：雨林奔跑' : isJa ? '作戦: レインフォレスト・ラン' : isKo ? '작전: 열대우림 달리기' : 'Operation: Rainforest Run',
        description: isZh ? '本月完成 5 個任務以獲得撤離資格。大獎是前往哥斯達黎加生物保護區的部署。' : isJa ? '今月5つのミッションを完了して抽出資格を得る。特賞はコスタリカ生物保護区への配備です。' : isKo ? '이번 달에 5개의 미션을 완료하여 추출 자격을 얻으세요. 대상은 코스타리카 생물 보호구역으로의 배치입니다.' : 'Complete 5 missions this month to qualify for extraction. Grand prize is a deployment to the Costa Rica Bio-Reserve.',
        grandPrize: isZh ? '探險：哥斯達黎加 (2人)' : isJa ? '遠征: コスタリカ (2名)' : isKo ? '탐험: 코스타리카 (2인)' : 'Expedition: Costa Rica (2 Pax)',
        endDate: '2023-12-31',
        image: 'https://picsum.photos/800/400?random=20',
        status: 'ACTIVE'
      },
      {
        id: '2',
        title: isZh ? '挑戰：塑膠清除' : isJa ? '挑戦: プラスチックパージ' : isKo ? '도전: 플라스틱 제거' : 'Challenge: Plastic Purge',
        description: isZh ? '上傳您減少塑膠的情報。頂尖遊騎兵將獲得零廢棄戰術套件。' : isJa ? 'プラスチック削減に関する情報をアップロードしてください。トップレンジャーにはゼロウェイスト戦術キットが贈られます。' : isKo ? '플라스틱 감축에 대한 정보를 업로드하세요. 최고의 레인저는 제로 웨이스트 전술 키트를 받습니다.' : 'Upload intel on your plastic reduction. Top Rangers receive the Zero-Waste tactical kit.',
        grandPrize: isZh ? '戰術裝備：零廢棄套件' : isJa ? '戦術装備: ゼロウェイストキット' : isKo ? '전술 장비: 제로 웨이스트 키트' : 'Tactical Gear: Zero Waste Kit',
        endDate: '2023-07-31',
        image: 'https://picsum.photos/800/400?random=21',
        status: 'ENDED'
      }
    ];
  };

  const getAvatarItems = (): AvatarItem[] => {
     // Items available in the game
     return [
       { id: 'hat_1', type: 'HAT', name: 'Scout Cap', assetValue: 'beanie', thumbnail: '🧢' },
       { id: 'hat_2', type: 'HAT', name: 'Solar Helmet', assetValue: 'winterHat03', thumbnail: '⛑️' },
       { id: 'outfit_1', type: 'OUTFIT', name: 'Ranger Vest', assetValue: 'overall', thumbnail: '🦺' },
       { id: 'outfit_2', type: 'OUTFIT', name: 'Tech Suit', assetValue: 'blazerAndShirt', thumbnail: '🥋' },
       { id: 'acc_1', type: 'ACCESSORY', name: 'Scanner Specs', assetValue: 'prescription02', thumbnail: '👓' },
       { id: 'acc_2', type: 'ACCESSORY', name: 'Bio-Mask', assetValue: 'kurt', thumbnail: '😷' },
     ]
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getMockCourses, getMockTasks, getMockItems, getMockEvents, getUserTitle, getAvatarItems }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
