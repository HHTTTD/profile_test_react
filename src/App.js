import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Phone, MapPin, Calendar, Award, Code, Briefcase, Star, ExternalLink, Menu, X, ArrowRight, Volume2, VolumeX, Mouse, Zap, Coffee, Heart, Users, Target, Rocket, BookOpen, Trophy, Clock } from 'lucide-react';

// Direct import - NO lazy loading for stability
import SplashCursor from './components/SplashCursor';
import CreativeRotatingText from './components/CreativeRotatingText';
import LetterGlitch from './components/LetterGlitch/LetterGlitch';
import GradientText from './components/GradientText/GradientText';
import ScrollFloat from './components/ScrollFloat/ScrollFloat';
import LoadingScreen from './components/LoadingScreen';
import ModeSwitch from './components/mode_switch';
import DownloadButton from './components/download_buttons';
import IconCloudDemo from './components/IconCloudDemo';
import DecryptedText from './components/DecryptedText/DecryptedText';
import TranslateSwitch from './components/translate_switch';
import FluidEffectsActive from './components/Fluid_Effects_Active';

// Theme Context
const ThemeContext = createContext();

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    
    // Reset transition state - match with mode_switch transition time
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Translation Context
const TranslationContext = createContext();

// Translation data
const translations = {
  th: {
    // Navigation
    home: "หน้าแรก",
    about: "เกี่ยวกับ",
    stats: "สถิติ",
    skills: "ทักษะ",
    projects: "โปรเจค",
    contact: "ติดต่อ",
    
    // Hero section
    name: "สิทธิศักดิ์ ศรีสุข",
    heroSubtitle: "สร้างสรรค์",
    heroWords: ["โค้ดดิ้ง", "ดีไซน์", "นวัตกรรม", "โซลูชัน", "ประสบการณ์"],
    heroDescription: "หลงใหลในการสร้าง ผลิตภัณฑ์ดิจิทัล ที่ใช้งานง่าย ขยายตัวได้ และสร้างผลกระทบ ที่แก้ปัญหาในโลกจริงและสร้างแรงบันดาลใจให้ผู้ใช้",
    viewWork: "ดูผลงาน",
    downloadCV: "ดาวน์โหลด CV",
    downloaded: "ดาวน์โหลดแล้ว!",
    letsChat: "มาคุยกัน",
    
    // About section
    aboutTitle: "เกี่ยวกับฉัน",
    location: "ที่อยู่",
    locationValue: "กรุงเทพฯ ประเทศไทย",
    status: "สถานะ",
    statusValue: "ว่าง",
    education: "การศึกษา",
    educationValue: "ปริญญา CS",
    fuel: "เชื้อเพลิง",
    fuelValue: "กาแฟ ☕",
    
    // Stats section
    statsTitle: "ผลงาน",
    projectsCompleted: "โปรเจคที่สำเร็จ",
    happyClients: "ลูกค้าที่พอใจ",
    awardsWon: "รางวัลที่ได้รับ",
    yearsExperience: "ปีประสบการณ์",
    
    // Skills section
    skillsTitle: "ทักษะและความเชี่ยวชาญ",
    expert: "ผู้เชี่ยวชาญ",
    advanced: "ระดับสูง",
    intermediate: "ระดับกลาง",
    beginner: "เริ่มต้น",
    
    // Projects section
    projectsTitle: "โปรเจคเด่น",
    viewAllProjects: "ดูทุกโปรเจค",
    liveDemo: "ดูตัวอย่าง",
    source: "ซอร์สโค้ด",
    
    // Contact section
    contactTitle: "มาสร้างสิ่งที่ยอดเยี่ยมด้วยกัน",
    getInTouch: "ติดต่อเรา",
    contactDescription: "ฉันตื่นเต้นที่จะพูดคุยเกี่ยวกับโอกาสใหม่ๆ โปรเจคที่น่าสนใจ หรือเพียงแค่คุยเรื่องเทคโนโลยีและนวัตกรรมล่าสุด",
    email: "อีเมล",
    phone: "โทรศัพท์",
    linkedin: "LinkedIn",
    github: "GitHub",
    quickResponse: "รับประกันการตอบกลับอย่างรวดเร็ว",
    quickResponseDesc: "ฉันมักจะตอบข้อความภายใน 24 ชั่วโมง สำหรับเรื่องด่วน สามารถโทรหรือติดต่อผ่าน LinkedIn ได้",
    firstName: "ชื่อจริง",
    lastName: "นามสกุล",
    subject: "หัวข้อ",
    projectMessage: "บอกเล่าเกี่ยวกับโปรเจคของคุณ...",
    sendMessage: "ส่งข้อความ",
    privacyNote: "การส่งข้อความนี้แสดงว่าคุณยินยอมตาม นโยบายความเป็นส่วนตัว และ ข้อกำหนดการให้บริการ ของเรา",
    
    // Footer
    footerDescription: "สร้างอนาคต หนึ่งบรรทัดโค้ดต่อครั้ง มาสร้างสิ่งที่พิเศษด้วยกัน",
    footerBuilt: "สร้างด้วย",
    footerWith: "ด้วย React, Tailwind CSS, และ",
    footerLots: "เยอะมาก",
  },
  en: {
    // Navigation
    home: "Home",
    about: "About",
    stats: "Stats",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    
    // Hero section
    name: "Sitthisak Srisuk",
    heroSubtitle: "Creative",
    heroWords: ["coding", "design", "innovation", "solutions", "experiences"],
    heroDescription: "Passionate about building intuitive, scalable, and impactful digital products that solve real-world problems and inspire users.",
    viewWork: "View My Work",
    downloadCV: "Download CV",
    downloaded: "Downloaded!",
    letsChat: "Let's Chat",
    
    // About section
    aboutTitle: "About Me",
    location: "Location",
    locationValue: "Bangkok, Thailand",
    status: "Status",
    statusValue: "Available",
    education: "Education",
    educationValue: "CS Degree",
    fuel: "Fuel",
    fuelValue: "Coffee ☕",
    
    // Stats section
    statsTitle: "Achievements",
    projectsCompleted: "Projects Completed",
    happyClients: "Happy Clients",
    awardsWon: "Awards Won",
    yearsExperience: "Years Experience",
    
    // Skills section
    skillsTitle: "Skills & Expertise",
    expert: "Expert",
    advanced: "Advanced",
    intermediate: "Intermediate",
    beginner: "Beginner",
    
    // Projects section
    projectsTitle: "Featured Projects",
    viewAllProjects: "View All Projects",
    liveDemo: "Live Demo",
    source: "Source",
    
    // Contact section
    contactTitle: "Let's Create Something Amazing",
    getInTouch: "Get In Touch",
    contactDescription: "I'm always excited to discuss new opportunities, interesting projects, or just have a chat about the latest in technology and innovation.",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
    quickResponse: "Quick Response Guaranteed",
    quickResponseDesc: "I typically respond to messages within 24 hours. For urgent matters, feel free to call or connect on LinkedIn.",
    firstName: "First Name",
    lastName: "Last Name",
    subject: "Subject",
    projectMessage: "Tell me about your project...",
    sendMessage: "Send Message",
    privacyNote: "By sending this message, you agree to our privacy policy and terms of service.",
    
    // Footer
    footerDescription: "Building the future, one line of code at a time. Let's create something extraordinary together.",
    footerBuilt: "Built with",
    footerWith: "using React, Tailwind CSS, and lots of",
    footerLots: "",
  }
};

// Translation Provider Component
const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'th' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Apply language to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set HTML lang attribute for better font rendering
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prevLang => prevLang === 'th' ? 'en' : 'th');
  }, []);

  const t = useCallback((key) => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Hook to use translation
const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

// About Texts Component with DecryptedText and gradient highlights
const AboutTexts = () => {
  const { language } = useTranslation();

  if (language === 'th') {
    return (
      <div className="prose prose-lg text-theme-secondary space-y-6">
        <p className="text-xl leading-relaxed">
          <DecryptedText
            text="ฉันเป็น"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 font-bold">
            <DecryptedText
              text="นักพัฒนาเต็มรูปแบบ"
              speed={35}
              maxIterations={20}
              animateOn="view"
              className="inline font-bold"
              characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
            />
          </span>{' '}
          <DecryptedText
            text="ที่มีความหลงใหลกับ"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 font-bold">
            <DecryptedText
              text="5+ ปี"
              speed={25}
              maxIterations={10}
              animateOn="view"
              className="inline font-bold"
              characters="0123456789+"
            />
          </span>{' '}
          <DecryptedText
            text="ของประสบการณ์ในการสร้าง"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-orange-500 font-bold">
            <DecryptedText
              text="โซลูชันดิจิทัล"
              speed={35}
              maxIterations={20}
              animateOn="view"
              className="inline font-bold"
              characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
            />
          </span>
        </p>
        
        <p className="text-lg leading-relaxed">
          <DecryptedText
            text="การเดินทางของฉันเริ่มต้นด้วย"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 font-bold">
            <DecryptedText
              text="'Hello World'"
              speed={40}
              maxIterations={25}
              animateOn="view"
              className="inline font-bold"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'"
            />
          </span>{' '}
          <DecryptedText
            text="และพัฒนาไปสู่การสร้าง"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 font-bold">
            <DecryptedText
              text="แอปพลิเคชันที่ซับซ้อน"
              speed={35}
              maxIterations={20}
              animateOn="view"
              className="inline font-bold"
              characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
            />
          </span>{' '}
          <DecryptedText
            text="ที่ให้บริการผู้ใช้หลายพันคน"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />
        </p>
        
        <p className="text-lg leading-relaxed">
          <DecryptedText
            text="เมื่อฉันไม่ได้เขียนโค้ด ฉันจะสำรวจ"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 font-bold">
            <DecryptedText
              text="เทคโนโลยีใหม่ๆ"
              speed={35}
              maxIterations={20}
              animateOn="view"
              className="inline font-bold"
              characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
            />
          </span>{' '}
          <DecryptedText
            text="มีส่วนร่วมใน"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-green-500 to-emerald-500 font-bold">
            <DecryptedText
              text="โอเพนซอร์ส"
              speed={35}
              maxIterations={20}
              animateOn="view"
              className="inline font-bold"
              characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
            />
          </span>{' '}
          <DecryptedText
            text="และแบ่งปันความรู้ผ่าน"
            speed={30}
            maxIterations={15}
            animateOn="view"
            className="inline"
            characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
          />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 font-bold">
            <DecryptedText
              text="การพูดในงานเทค"
              speed={35}
              maxIterations={20}
              animateOn="view"
              className="inline font-bold"
              characters="กขคงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ"
            />
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg text-theme-secondary space-y-6">
      <p className="text-xl leading-relaxed">
        <DecryptedText
          text="I'm a"
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 font-bold">
          <DecryptedText
            text="passionate full-stack developer"
            speed={35}
            maxIterations={20}
            animateOn="view"
            className="inline font-bold"
          />
        </span>{' '}
        <DecryptedText
          text="with"
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 font-bold">
          <DecryptedText
            text="5+ years"
            speed={25}
            maxIterations={10}
            animateOn="view"
            className="inline font-bold"
            characters="0123456789+"
          />
        </span>{' '}
        <DecryptedText
          text="of experience creating"
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-500 to-orange-500 font-bold">
          <DecryptedText
            text="digital solutions"
            speed={35}
            maxIterations={20}
            animateOn="view"
            className="inline font-bold"
          />
        </span>
        <DecryptedText
          text="."
          speed={20}
          maxIterations={5}
          animateOn="view"
          className="inline"
        />
      </p>
      
      <p className="text-lg leading-relaxed">
        <DecryptedText
          text="My journey started with"
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 font-bold">
          <DecryptedText
            text="'Hello World'"
            speed={40}
            maxIterations={25}
            animateOn="view"
            className="inline font-bold"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'"
          />
        </span>{' '}
        <DecryptedText
          text="and evolved into building"
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 font-bold">
          <DecryptedText
            text="complex applications"
            speed={35}
            maxIterations={20}
            animateOn="view"
            className="inline font-bold"
          />
        </span>{' '}
        <DecryptedText
          text="that serve thousands of users."
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />
      </p>
      
      <p className="text-lg leading-relaxed">
        <DecryptedText
          text="When I'm not coding, I explore"
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 font-bold">
          <DecryptedText
            text="new technologies"
            speed={35}
            maxIterations={20}
            animateOn="view"
            className="inline font-bold"
          />
        </span>
        <DecryptedText
          text=", contribute to"
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-green-500 to-emerald-500 font-bold">
          <DecryptedText
            text="open source"
            speed={35}
            maxIterations={20}
            animateOn="view"
            className="inline font-bold"
          />
        </span>
        <DecryptedText
          text=", and share knowledge through"
          speed={30}
          maxIterations={15}
          animateOn="view"
          className="inline"
        />{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 font-bold">
          <DecryptedText
            text="tech talks"
            speed={35}
            maxIterations={20}
            animateOn="view"
            className="inline font-bold"
          />
        </span>
        <DecryptedText
          text="."
          speed={20}
          maxIterations={5}
          animateOn="view"
          className="inline"
        />
      </p>
    </div>
  );
};

// Hero Description Component with Effects
const HeroDescription = ({ theme }) => {
  const { language } = useTranslation();

  if (language === 'th') {
    return (
      <p className="text-xl md:text-2xl text-theme-secondary mb-12 max-w-4xl mx-auto leading-relaxed">
        หลงใหลในการสร้าง{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 font-bold">
          ผลิตภัณฑ์ดิจิทัล
        </span>{' '}
        ที่ใช้งานง่าย ขยายตัวได้ และสร้างผลกระทบ ที่แก้ปัญหาในโลกจริงและสร้างแรงบันดาลใจให้ผู้ใช้
      </p>
    );
  }

  return (
    <p className="text-xl md:text-2xl text-theme-secondary mb-12 max-w-4xl mx-auto leading-relaxed">
      Passionate about building{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 font-bold">
        intuitive, scalable, and impactful digital products
      </span>{' '}
      that solve real-world problems and inspire users.
    </p>
  );
};

// Enhanced theme-aware classes with CSS variables
const getThemeClasses = (theme) => ({
  // Background classes
  bg: {
    primary: 'bg-theme-primary',
    secondary: 'bg-theme-secondary',
    tertiary: 'bg-theme-tertiary',
    overlay: 'bg-theme-overlay',
    card: 'bg-theme-card',
    cardHover: 'hover:bg-theme-card',
    glass: 'bg-theme-glass',
    gradient: theme === 'dark' 
      ? 'bg-gradient-to-br from-gray-900 to-black' 
      : 'bg-gradient-to-br from-slate-50 to-slate-100'
  },
  
  // Text classes
  text: {
    primary: 'text-theme-primary',
    secondary: 'text-theme-secondary',
    tertiary: 'text-theme-tertiary',
    accent: 'text-theme-accent',
    muted: 'text-theme-muted'
  },

  // Border classes
  border: {
    primary: 'border-theme-primary',
    secondary: 'border-theme-secondary',
    accent: 'border-theme-accent'
  },

  // Shadow classes
  shadow: {
    sm: 'shadow-theme-sm',
    md: 'shadow-theme-md',
    lg: 'shadow-theme-lg',
    xl: 'shadow-theme-xl',
    '2xl': 'shadow-theme-2xl',
    card: 'shadow-theme-card',
    cardHover: 'hover:shadow-theme-card-hover'
  },

  // Component specific
  nav: {
    bg: 'bg-theme-overlay',
    border: 'border-theme-secondary'
  },

  // Progress bar
  progress: {
    bg: 'bg-theme-progress',
    fill: 'bg-gradient-to-r from-indigo-500 to-purple-500'
  }
});

// Enhanced Theme Toggle Button using ModeSwitch
const ThemeToggle = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <ModeSwitch 
      theme={theme} 
      toggleTheme={toggleTheme} 
      isTransitioning={isTransitioning}
    />
  );
};

// Enhanced Error Boundary with recovery
class SplashCursorErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null, retryCount: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('SplashCursor error (non-critical):', error);
    this.setState({ errorInfo });
    
    // Auto-reset after 2 seconds with retry limit
    setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        errorInfo: null,
        retryCount: prevState.retryCount + 1
      }));
    }, 2000);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute bottom-4 right-4 z-50 bg-amber-600/20 border border-amber-400/50 rounded-lg px-3 py-2 text-amber-400 text-sm font-medium">
            🔄 Restarting Effects... ({this.state.retryCount}/3)
          </div>
        </div>
      );
    }

    // If too many retries, disable effects
    if (this.state.retryCount >= 3) {
      return (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute bottom-4 right-4 z-50 bg-gray-600/20 border border-gray-400/50 rounded-lg px-3 py-2 text-gray-400 text-sm font-medium">
            ⚠️ Effects disabled (too many errors)
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Fluid Effects Active Wrapper Component
const FluidEffectsActiveWrapper = ({ splashEnabled, setSplashEnabled }) => {
  const handleToggle = useCallback(() => {
    setSplashEnabled(!splashEnabled);
  }, [splashEnabled, setSplashEnabled]);

  return (
    <div 
      className="transform scale-75 origin-bottom-right"
      style={{ transformOrigin: 'bottom right' }}
    >
      <FluidEffectsActive 
        checked={splashEnabled}
        onChange={handleToggle}
      />
    </div>
  );
};

// Scroll Progress Bar (Throttled)
const ScrollProgress = () => {
  const { theme } = useTheme();
  const classes = getThemeClasses(theme);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    let progressTimeout;
    
    const updateScrollProgress = () => {
      if (progressTimeout) {
        clearTimeout(progressTimeout);
      }
      
      progressTimeout = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        setScrollProgress(scrolled);
      }, 16); // Throttle to ~60fps
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      if (progressTimeout) {
        clearTimeout(progressTimeout);
      }
    };
  }, []);
  
  return (
    <div className={`fixed top-0 left-0 w-full h-1 ${classes.progress.bg} z-50`}>
      <div 
        className={`h-full ${classes.progress.fill} transition-all duration-300`}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// 3D Skill Card with Advanced Animations
const AdvancedSkillCard = React.memo(({ skill, level, icon: Icon, delay = 0 }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const classes = getThemeClasses(theme);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        const progressTimer = setInterval(() => {
          setProgress(prev => {
            if (prev >= level) {
              clearInterval(progressTimer);
              return level;
            }
            return prev + 2;
          });
        }, 20);
      }, 500);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, level]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  };

  const getSkillLevel = (progress) => {
    if (progress >= 90) return t('expert') || 'Expert';
    if (progress >= 70) return t('advanced') || 'Advanced';
    if (progress >= 50) return t('intermediate') || 'Intermediate';
    return t('beginner') || 'Beginner';
  };

  return (
    <div 
      ref={cardRef}
      className={`relative group cursor-pointer transition-all duration-700 transform-gpu ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`${classes.bg.card} rounded-2xl p-6 border ${classes.border.primary} hover:${classes.border.accent} transition-all duration-500 ${classes.shadow.card} ${classes.shadow.cardHover} relative overflow-hidden backdrop-blur-sm`}>
        
        {/* Animated background */}
        <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-indigo-500/5 to-purple-500/5' : 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Skill icon and name */}
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className={`p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg ${theme === 'light' ? 'shadow-lg' : 'shadow-md'}`}>
            <Icon size={24} className="text-white" />
          </div>
          <h3 className={`${classes.text.primary} font-bold text-lg`}>{skill}</h3>
        </div>
        
        {/* Progress bar container */}
        <div className="relative mb-3">
          <div className={`w-full ${theme === 'light' ? 'bg-gray-200/60' : 'bg-gray-700/50'} rounded-full h-3 overflow-hidden`}>
            <div 
              className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          
          {/* Floating percentage */}
          <div 
            className={`absolute -top-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2 py-1 rounded-lg text-sm font-bold transition-all duration-1000 ${theme === 'light' ? 'shadow-lg' : 'shadow-md'}`}
            style={{ left: `${Math.max(0, Math.min(progress - 10, 85))}%` }}
          >
            {progress}%
          </div>
        </div>
        
        {/* Skill level text */}
        <div className={`${classes.text.accent} text-sm font-medium`}>
          {getSkillLevel(progress)}
        </div>
        
        {/* Hover effects */}
        {isHovered && (
          <>
            <div className={`absolute inset-0 ${theme === 'light' ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10' : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'} rounded-2xl animate-pulse`} />
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl ${theme === 'light' ? 'opacity-10' : 'opacity-20'} blur animate-pulse`} />
          </>
        )}
      </div>
    </div>
  );
});

// Enhanced Project Card
const EnhancedProjectCard = React.memo(({ project, delay = 0 }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`group transition-all duration-700 ${
      isVisible ? 'transform translate-y-0 opacity-100' : 'transform translate-y-12 opacity-0'
    }`}>
      <div 
        className="relative bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:border-indigo-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project header with gradient */}
        <div className="h-52 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Animated particles in header */}
          {isHovered && (
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Project title */}
          <div className="absolute bottom-4 left-4 text-white z-10">
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm opacity-90">{project.category}</p>
          </div>
          
          {/* Tech stack badges */}
          <div className="absolute top-4 right-4 flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium border border-white/30"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Project stats */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              <span className="text-xs text-white">{project.stars}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
              <Users size={12} className="text-blue-400" />
              <span className="text-xs text-white">{project.team}</span>
            </div>
          </div>
        </div>
        
        {/* Project content */}
        <div className="p-6">
          <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
          
          {/* Project features */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-indigo-300 mb-2">Key Features:</h4>
            <ul className="space-y-1">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-1 h-1 bg-indigo-400 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <button className="primary-button flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium group">
              <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
              {t('liveDemo')}
            </button>
            <button className="action-button flex items-center gap-2 px-4 py-2.5 border border-gray-600 hover:border-indigo-400 text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:bg-white/5">
              <Github size={16} />
              {t('source')}
            </button>
            <button className="action-button p-2.5 border border-gray-600 hover:border-indigo-400 text-gray-300 hover:text-white rounded-lg transition-all duration-300 hover:bg-white/5">
              <Heart size={16} />
            </button>
          </div>
        </div>
        
        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none" />
        )}
      </div>
    </div>
  );
});

// Stats Counter Component
const StatsCounter = React.memo(({ end, label, icon: Icon, delay = 0 }) => {
  const { theme } = useTheme();
  const classes = getThemeClasses(theme);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    const element = document.getElementById(`stats-${label}`);
    if (element) observer.observe(element);
    
    return () => observer.disconnect();
  }, [label]);
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const steps = 60;
        const increment = end / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= end) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, end, delay]);
  
  return (
    <div id={`stats-${label}`} className="text-center group">
      <div className={`${classes.bg.card} rounded-2xl p-6 border ${classes.border.primary} hover:${classes.border.accent} transition-all duration-300 hover:scale-105 ${classes.shadow.card} ${classes.shadow.cardHover} backdrop-blur-sm`}>
        <div className="flex justify-center mb-3">
          <div className={`p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 ${theme === 'light' ? 'shadow-lg' : 'shadow-md'}`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
        <div className={`text-3xl font-bold ${classes.text.primary} mb-2`}>{count}+</div>
        <div className={`${classes.text.accent} font-medium`}>{label}</div>
      </div>
    </div>
  );
});

// Main App Component
const ProfileWebsite = () => {
  const { theme } = useTheme();
  const { t, language, toggleLanguage } = useTranslation();
  const classes = getThemeClasses(theme);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [splashEnabled, setSplashEnabled] = useState(true);

  // Stable background color references to prevent SplashCursor re-mount
  const splashBackColorDark = useRef({ r: 0, g: 0, b: 0 });
  const splashBackColorLight = useRef({ r: 1, g: 1, b: 1 });
  const splashBackColor = theme === 'dark' ? splashBackColorDark.current : splashBackColorLight.current;

  // Loading effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time
    
    return () => clearTimeout(loadingTimer);
  }, []);

  // Removed page visibility tracking to prevent SplashCursor from re-initializing
  // during scrolling which caused effects to disappear temporarily

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      // Throttle scroll updates to prevent excessive re-renders
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = setTimeout(() => {
        setScrollY(window.scrollY);
        
        // Update current section based on scroll position
        const sections = ['home', 'about', 'stats', 'skills', 'projects', 'contact'];
        const scrollPosition = window.scrollY + 100;
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setCurrentSection(section);
              break;
            }
          }
        }
      }, 16); // ~60fps throttling
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  const skills = [
    { skill: 'React', level: 95, icon: Code },
    { skill: 'TypeScript', level: 90, icon: Code },
    { skill: 'Node.js', level: 85, icon: Code },
    { skill: 'Python', level: 88, icon: Code },
    { skill: 'UI/UX Design', level: 82, icon: Award },
    { skill: 'Database Design', level: 85, icon: Award },
    { skill: 'Cloud Computing', level: 78, icon: Rocket },
    { skill: 'DevOps', level: 75, icon: Zap },
    { skill: 'Mobile Development', level: 80, icon: Phone }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard with real-time analytics.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'Full Stack Web App',
      features: ['Real-time inventory', 'Payment integration', 'Admin dashboard', 'Mobile responsive'],
      stars: 234,
      team: '4 people'
    },
    {
      title: 'AI Chat Application',
      description: 'Real-time chat application with AI integration. Built with React, Socket.io, and OpenAI API for intelligent responses and natural language processing.',
      technologies: ['React', 'Socket.io', 'OpenAI', 'Redis'],
      category: 'AI & Machine Learning',
      features: ['Real-time messaging', 'AI responses', 'Voice commands', 'Multi-language'],
      stars: 456,
      team: '2 people'
    },
    {
      title: 'Portfolio Dashboard',
      description: 'Interactive dashboard for tracking investment portfolio with real-time data visualization, predictive analytics, and automated trading signals.',
      technologies: ['React', 'D3.js', 'Firebase', 'Python'],
      category: 'Data Visualization',
      features: ['Real-time data', 'Interactive charts', 'Predictive analysis', 'Trading signals'],
      stars: 189,
      team: '3 people'
    },
    {
      title: 'Smart Home IoT System',
      description: 'Complete IoT solution for smart home automation with mobile app, voice control, and machine learning for predictive automation.',
      technologies: ['React Native', 'Arduino', 'AWS IoT', 'TensorFlow'],
      category: 'IoT & Hardware',
      features: ['Voice control', 'Mobile app', 'ML automation', 'Energy monitoring'],
      stars: 312,
      team: '5 people'
    },
    {
      title: 'Blockchain Voting System',
      description: 'Secure and transparent voting system built on blockchain technology with smart contracts and decentralized architecture.',
      technologies: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS'],
      category: 'Blockchain & Web3',
      features: ['Smart contracts', 'Decentralized', 'Transparent voting', 'Audit trail'],
      stars: 567,
      team: '6 people'
    },
    {
      title: 'AR Learning Platform',
      description: 'Augmented reality educational platform for interactive learning experiences with 3D models and immersive content.',
      technologies: ['Unity', 'ARCore', 'C#', 'Firebase'],
      category: 'AR/VR & Education',
      features: ['AR experiences', '3D models', 'Interactive lessons', 'Progress tracking'],
      stars: 423,
      team: '4 people'
    }
  ];

  const stats = [
    { labelKey: 'projectsCompleted', label: 'Projects Completed', end: 150, icon: Briefcase },
    { labelKey: 'happyClients', label: 'Happy Clients', end: 85, icon: Users },
    { labelKey: 'awardsWon', label: 'Awards Won', end: 12, icon: Trophy },
    { labelKey: 'yearsExperience', label: 'Years Experience', end: 5, icon: Clock }
  ];

  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  const navigationItems = [
    { id: 'home', label: t('home'), icon: Mouse },
    { id: 'about', label: t('about'), icon: Users },
    { id: 'stats', label: t('stats'), icon: Target },
    { id: 'skills', label: t('skills'), icon: Zap },
    { id: 'projects', label: t('projects'), icon: Briefcase },
    { id: 'contact', label: t('contact'), icon: Mail }
  ];

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen theme={theme} />;
  }

  return (
    <div className={`min-h-screen ${classes.bg.primary} ${classes.text.primary} relative overflow-x-hidden transition-all duration-300`}>
      <ScrollProgress />
      
      {/* Direct SplashCursor - NO lazy loading, NO suspense - Always stable */}
      {splashEnabled && (
        <SplashCursorErrorBoundary>
          <SplashCursor 
            SIM_RESOLUTION={128}
            DYE_RESOLUTION={1440}
            CAPTURE_RESOLUTION={512}
            DENSITY_DISSIPATION={4.5}
            VELOCITY_DISSIPATION={1.5}
            PRESSURE={0.1}
            PRESSURE_ITERATIONS={20}
            CURL={3}
            SPLAT_RADIUS={0.25}
            SPLAT_FORCE={6500}
            SHADING={true}
            COLOR_UPDATE_SPEED={15}
            BACK_COLOR={splashBackColor}
            TRANSPARENT={true}
          />
        </SplashCursorErrorBoundary>
      )}

      {/* Fluid Effects Control - Interactive Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <FluidEffectsActiveWrapper 
          splashEnabled={splashEnabled}
          setSplashEnabled={setSplashEnabled}
        />
      </div>

      {/* Enhanced Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? `${classes.nav.bg} ${classes.nav.border} border-b` : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`text-2xl font-bold ${classes.text.primary}`}>
              Cocoa
            </div>
            
            <div className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-button flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative group ${
                    currentSection === item.id 
                      ? `active bg-indigo-600/80 ${classes.text.primary}` 
                      : `${classes.bg.cardHover} ${classes.text.secondary} hover:${classes.text.primary}`
                  }`}
                >
                  <item.icon size={16} />
                  {item.label}
                  {currentSection === item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-80 -z-10" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`nav-button p-2 ${classes.bg.cardHover} rounded-lg transition-colors ${classes.text.primary}`}
                title="Toggle Sound"
              >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              
              <TranslateSwitch 
                language={language}
                onToggle={toggleLanguage}
              />
              
              <ThemeToggle />
              
              <button 
                className={`nav-button md:hidden p-2 ${classes.bg.cardHover} rounded-lg transition-colors ${classes.text.primary}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${classes.nav.bg} ${classes.nav.border} border-t`}>
            <div className="px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-button flex items-center gap-3 w-full px-4 py-3 ${classes.bg.cardHover} rounded-lg transition-colors text-left ${classes.text.primary}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        {/* LetterGlitch Background */}
        <div className="absolute inset-0 z-0">
          <LetterGlitch 
            glitchColors={theme === 'dark' 
              ? ["#1e293b", "#3730a3", "#7c3aed", "#059669"] 
              : ["#0f172a", "#1e3a8a", "#6d28d9", "#059669", "#374151"]
            }
            glitchSpeed={30}
            centerVignette={false}
            outerVignette={true}
            smooth={true}
          />
        </div>
        
        <div className="text-center z-10 max-w-6xl mx-auto px-4 relative">
          <div className="mb-8">
            <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${classes.text.primary}`}>
              {t('name')}
            </h1>
            <div className={`text-2xl md:text-4xl ${classes.text.accent} mb-8 h-16 flex items-center justify-center`}>
              <CreativeRotatingText 
                prefix={t('heroSubtitle')}
                words={t('heroWords')}
                interval={3000}
                className={`${classes.text.accent} font-bold text-center`}
              />
            </div>
          </div>
          
          <HeroDescription theme={theme} />
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => scrollToSection('projects')}
              className={`primary-button group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 flex items-center gap-3 text-white`}
            >
              {t('viewWork')}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <DownloadButton theme={theme} t={t} />
            <button 
              onClick={() => scrollToSection('contact')}
              className={`action-button group flex items-center gap-3 px-8 py-4 ${classes.bg.glass} ${classes.bg.cardHover} rounded-full font-semibold transition-all duration-300 ${classes.text.primary}`}
            >
              <Coffee size={20} className="group-hover:scale-110 transition-transform" />
              {t('letsChat')}
            </button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com/sitthisaksrisuk", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/sitthisak-srisuk", label: "LinkedIn" },
              { icon: Mail, href: "mailto:sitthisak@example.com", label: "Email" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`social-link group p-3 ${classes.bg.glass} hover:bg-indigo-600 rounded-full transition-all duration-300 hover:scale-110 ${classes.text.primary}`}
                aria-label={social.label}
              >
                <social.icon size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => scrollToSection('about')}
          className="scroll-down-button absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-110 transition-transform p-2 rounded-full"
        >
          <ChevronDown size={32} className="text-indigo-400" />
        </button>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollFloat 
              containerClassName="text-center"
              textClassName="text-5xl md:text-6xl font-bold text-indigo-400"
              animationDuration={1.2}
              ease="back.out(1.7)"
              stagger={0.015}
            >
              {t('aboutTitle')}
            </ScrollFloat>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <AboutTexts />
              
              <div className="grid grid-cols-2 gap-6">
                <div className={`flex items-center gap-3 p-5 ${classes.bg.card} rounded-xl transition-all duration-300 hover:scale-105 ${classes.shadow.card} ${classes.shadow.cardHover} backdrop-blur-sm border ${classes.border.primary} hover:${classes.border.accent}`}>
                  <div className={`p-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg ${theme === 'light' ? 'shadow-lg' : 'shadow-md'}`}>
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <div className={`text-sm ${classes.text.tertiary} font-medium`}>{t('location')}</div>
                    <div className={`font-bold ${classes.text.primary}`}>{t('locationValue')}</div>
                  </div>
                </div>
                
                <div className={`flex items-center gap-3 p-5 ${classes.bg.card} rounded-xl transition-all duration-300 hover:scale-105 ${classes.shadow.card} ${classes.shadow.cardHover} backdrop-blur-sm border ${classes.border.primary} hover:${classes.border.accent}`}>
                  <div className={`p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg ${theme === 'light' ? 'shadow-lg' : 'shadow-md'}`}>
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div>
                    <div className={`text-sm ${classes.text.tertiary} font-medium`}>{t('status')}</div>
                    <div className="font-bold text-green-500">{t('statusValue')}</div>
                  </div>
                </div>
                
                <div className={`flex items-center gap-3 p-5 ${classes.bg.card} rounded-xl transition-all duration-300 hover:scale-105 ${classes.shadow.card} ${classes.shadow.cardHover} backdrop-blur-sm border ${classes.border.primary} hover:${classes.border.accent}`}>
                  <div className={`p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg ${theme === 'light' ? 'shadow-lg' : 'shadow-md'}`}>
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <div>
                    <div className={`text-sm ${classes.text.tertiary} font-medium`}>{t('education')}</div>
                    <div className={`font-bold ${classes.text.primary}`}>{t('educationValue')}</div>
                  </div>
                </div>
                
                <div className={`flex items-center gap-3 p-5 ${classes.bg.card} rounded-xl transition-all duration-300 hover:scale-105 ${classes.shadow.card} ${classes.shadow.cardHover} backdrop-blur-sm border ${classes.border.primary} hover:${classes.border.accent}`}>
                  <div className={`p-2 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg ${theme === 'light' ? 'shadow-lg' : 'shadow-md'}`}>
                    <Coffee size={20} className="text-white" />
                  </div>
                  <div>
                    <div className={`text-sm ${classes.text.tertiary} font-medium`}>{t('fuel')}</div>
                    <div className={`font-bold ${classes.text.primary}`}>{t('fuelValue')}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-96 h-96 mx-auto">
                {/* Animated profile circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-full animate-spin-slow" 
                     style={{ animation: 'spin 20s linear infinite' }} />
                <div className={`absolute inset-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-full flex items-center justify-center`}>
                  <div className="text-8xl">👨‍💻</div>
                </div>
                
                {/* Floating tech icons */}
                {[
                  { icon: "⚛️", delay: "0s", position: "top-8 right-8" },
                  { icon: "🚀", delay: "1s", position: "bottom-8 left-8" },
                  { icon: "💡", delay: "2s", position: "top-8 left-8" },
                  { icon: "🎨", delay: "3s", position: "bottom-8 right-8" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`absolute ${item.position} text-2xl animate-bounce`}
                    style={{ animationDelay: item.delay }}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollFloat 
              containerClassName="text-center"
              textClassName="text-4xl md:text-5xl font-bold text-yellow-400"
              animationDuration={1.1}
              ease="back.out(1.5)"
              stagger={0.02}
            >
              {t('statsTitle')}
            </ScrollFloat>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatsCounter 
                key={stat.label}
                end={stat.end}
                label={t(stat.labelKey)}
                icon={stat.icon}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-3">
            <ScrollFloat 
              containerClassName="text-center"
              textClassName="text-5xl md:text-6xl font-bold text-green-400"
              animationDuration={1.3}
              ease="back.out(1.8)"
              stagger={0.012}
            >
              {t('skillsTitle')}
            </ScrollFloat>
          </div>
          
          {/* Interactive 3D Tech Stack Icons */}
          <div className="mb-16 relative">
            <div className="h-[500px] w-full max-w-4xl mx-auto">
              <IconCloudDemo />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <AdvancedSkillCard 
                key={skill.skill}
                skill={skill.skill}
                level={skill.level}
                icon={skill.icon}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollFloat 
              containerClassName="text-center"
              textClassName="text-5xl md:text-6xl font-bold text-pink-400"
              animationDuration={1.4}
              ease="back.out(2)"
              stagger={0.014}
            >
              {t('projectsTitle')}
            </ScrollFloat>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <EnhancedProjectCard 
                key={project.title}
                project={project}
                delay={index * 150}
              />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <button className="primary-button px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              {t('viewAllProjects')}
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <ScrollFloat 
              containerClassName="text-center"
              textClassName="text-5xl md:text-6xl font-bold text-purple-400"
              animationDuration={1.6}
              ease="back.out(2.2)"
              stagger={0.01}
            >
              {t('contactTitle')}
            </ScrollFloat>
          </div>
          
          <div className={`${classes.bg.card} rounded-3xl p-8 md:p-12 ${classes.shadow.xl} border ${classes.border.primary} backdrop-blur-sm`}>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-cyan-400">
                      {t('getInTouch')}
                    </h3>
                  </div>
                  <p className={`text-xl ${classes.text.secondary} mb-8 leading-relaxed`}>
                    {t('contactDescription')}
                  </p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { icon: Mail, labelKey: 'email', label: "Email", value: "sitthisak@example.com", href: "mailto:sitthisak@example.com" },
                    { icon: Phone, labelKey: 'phone', label: "Phone", value: "+66 638 783 500", href: "tel:+66638783500" },
                                { icon: Linkedin, labelKey: 'linkedin', label: "LinkedIn", value: "linkedin.com/in/sitthisak-srisuk", href: "https://linkedin.com/in/sitthisak-srisuk" },
            { icon: Github, labelKey: 'github', label: "GitHub", value: "github.com/sitthisaksrisuk", href: "https://github.com/sitthisaksrisuk" }
                  ].map((contact, index) => (
                    <a 
                      key={index}
                      href={contact.href}
                      className={`flex items-center gap-4 p-4 ${classes.bg.glass} ${classes.bg.cardHover} rounded-xl transition-all duration-300 group border ${classes.border.secondary} hover:${classes.border.accent} ${classes.shadow.card} ${classes.shadow.cardHover} backdrop-blur-sm`}
                    >
                      <div className={`p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform ${theme === 'light' ? 'shadow-lg' : 'shadow-md'}`}>
                        <contact.icon size={20} className="text-white" />
                      </div>
                      <div>
                        <div className={`text-sm ${classes.text.tertiary}`}>{t(contact.labelKey) || contact.label}</div>
                        <div className={`${classes.text.primary} font-medium group-hover:text-indigo-400 transition-colors`}>
                          {contact.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                
                <div className={`${theme === 'light' ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' : 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20'} rounded-xl p-6 border ${classes.border.accent} ${classes.shadow.card} backdrop-blur-sm`}>
                  <h4 className="font-semibold text-indigo-400 mb-2">{t('quickResponse')}</h4>
                  <p className={`text-sm ${classes.text.secondary}`}>
                    {t('quickResponseDesc')}
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder={t('firstName')}
                    className={`px-4 py-3 ${classes.bg.glass} border ${classes.border.secondary} rounded-xl focus:${classes.border.accent} focus:outline-none ${classes.text.primary} placeholder-gray-400 transition-colors focus:ring-2 focus:ring-indigo-400/20 ${classes.shadow.sm} backdrop-blur-sm`}
                  />
                  <input 
                    type="text" 
                    placeholder={t('lastName')}
                    className={`px-4 py-3 ${classes.bg.glass} border ${classes.border.secondary} rounded-xl focus:${classes.border.accent} focus:outline-none ${classes.text.primary} placeholder-gray-400 transition-colors focus:ring-2 focus:ring-indigo-400/20 ${classes.shadow.sm} backdrop-blur-sm`}
                  />
                </div>
                
                <input 
                  type="email" 
                  placeholder={t('email')}
                  className={`w-full px-4 py-3 ${classes.bg.glass} border ${classes.border.secondary} rounded-xl focus:${classes.border.accent} focus:outline-none ${classes.text.primary} placeholder-gray-400 transition-colors focus:ring-2 focus:ring-indigo-400/20 ${classes.shadow.sm} backdrop-blur-sm`}
                />
                
                <input 
                  type="text" 
                  placeholder={t('subject')}
                  className={`w-full px-4 py-3 ${classes.bg.glass} border ${classes.border.secondary} rounded-xl focus:${classes.border.accent} focus:outline-none ${classes.text.primary} placeholder-gray-400 transition-colors focus:ring-2 focus:ring-indigo-400/20 ${classes.shadow.sm} backdrop-blur-sm`}
                />
                
                <textarea 
                  placeholder={t('projectMessage')}
                  rows="6"
                  className={`w-full px-4 py-3 ${classes.bg.glass} border ${classes.border.secondary} rounded-xl focus:${classes.border.accent} focus:outline-none ${classes.text.primary} placeholder-gray-400 resize-none transition-colors focus:ring-2 focus:ring-indigo-400/20 ${classes.shadow.sm} backdrop-blur-sm`}
                />
                
                <button className={`primary-button w-full group px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-white ${classes.shadow.lg} hover:${classes.shadow.xl}`}>
                  {t('sendMessage')}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className={`text-sm ${classes.text.tertiary} text-center`}>
                  {t('privacyNote')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className={`py-16 border-t ${classes.border.secondary} relative z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <GradientText 
              className="text-3xl font-bold px-4 py-3"
              colors={theme === 'dark' 
                ? ["#60a5fa", "#a855f7", "#ec4899", "#f472b6"] 
                : ["#1e40af", "#7c3aed", "#be185d", "#ec4899"]
              }
              animationSpeed={6}
            >
              {t('name')}
            </GradientText>
            
            <p className={`${classes.text.secondary} max-w-2xl mx-auto`}>
              {t('footerDescription')}
            </p>
            
            <div className="flex justify-center gap-6">
              {[
                            { icon: Github, href: "https://github.com/sitthisaksrisuk", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/sitthisak-srisuk", label: "LinkedIn" },
                { icon: Mail, href: "mailto:sitthisak@example.com", label: "Email" },
                { icon: Phone, href: "tel:+66123456789", label: "Phone" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`social-link p-3 ${classes.bg.glass} hover:bg-indigo-600 rounded-full transition-all duration-300 hover:scale-110 ${classes.text.primary}`}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            
            <div className={`pt-8 border-t ${classes.border.secondary}`}>
              <p className={classes.text.muted}>
                &copy; 2025 {t('name')}. All rights reserved.
              </p>
              <p className={`${classes.text.muted} mt-2`}>
                {t('footerBuilt')} <Heart size={16} className="inline text-red-500" /> {t('footerWith')} ☕{t('footerLots')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Main App Component with Theme Provider
const App = () => {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <ProfileWebsite />
      </TranslationProvider>
    </ThemeProvider>
  );
};

export default App;