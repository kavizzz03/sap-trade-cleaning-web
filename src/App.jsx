import React, { useState, useEffect, useRef } from 'react';

/*
  S.A.P TRADERS PTY LTD — Perth cleaning specialists
  Dependency-free build: only React + Tailwind. No framer-motion, no lucide-react.
  All motion is done with CSS keyframes, transitions and IntersectionObserver so
  there is zero risk of a missing-package blank screen.
*/

/* ---------- tiny inline icon set ---------- */
const Icon = ({ path, className = 'w-5 h-5', viewBox = '0 0 24 24' }) => (
  <svg viewBox={viewBox} className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);
const PhoneIcon = (p) => <Icon {...p} path={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />} />;
const MailIcon = (p) => <Icon {...p} path={<><path d="M4 4h16v16H4z" /><path d="m4 6 8 7 8-7" /></>} />;
const PinIcon = (p) => <Icon {...p} path={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>} />;
const MenuIcon = (p) => <Icon {...p} path={<><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>} />;
const XIcon = (p) => <Icon {...p} path={<><path d="M18 6 6 18" /><path d="M6 6l12 12" /></>} />;
const ChevronLeftIcon = (p) => <Icon {...p} path={<path d="M15 18l-6-6 6-6" />} />;
const ChevronRightIcon = (p) => <Icon {...p} path={<path d="M9 18l6-6-6-6" />} />;
const ChevronDownIcon = (p) => <Icon {...p} path={<path d="M6 9l6 6 6-6" />} />;
const CheckCircleIcon = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></>} />;
const CheckIcon = (p) => <Icon {...p} path={<path d="M20 6 9 17l-5-5" />} />;
const StarIcon = ({ filled, className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5l3 6.5 7 .7-5.3 4.7 1.6 6.9L12 17.8 5.7 21.3l1.6-6.9L2 9.7l7-.7z" />
  </svg>
);
const ArrowRightIcon = (p) => <Icon {...p} path={<><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>} />;
const ArrowUpRightIcon = (p) => <Icon {...p} path={<><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>} />;
const ShieldIcon = (p) => <Icon {...p} path={<><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z" /><path d="m9 12 2 2 4-4" /></>} />;
const ClockIcon = (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>} />;
const LeafIcon = (p) => <Icon {...p} path={<><path d="M11 20A7 7 0 0 1 4 13c0-7 7-11 15-11 0 8-4 15-11 15z" /><path d="M4 20s4-4 8-8" /></>} />;
const AwardIcon = (p) => <Icon {...p} path={<><circle cx="12" cy="8" r="6" /><path d="m9 13-1 8 4-2 4 2-1-8" /></>} />;
const UsersIcon = (p) => <Icon {...p} path={<><circle cx="9" cy="8" r="3.5" /><path d="M2 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5" /><circle cx="17.5" cy="9" r="2.8" /><path d="M17 14.5c2.8.3 5 2.6 5 6.5" /></>} />;
const HomeIcon = (p) => <Icon {...p} path={<><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>} />;
const QuoteIcon = (p) => <Icon {...p} path={<><path d="M7 8c-2 0-3 1.5-3 3.5S5 15 7 15c0 2.5-1 4-3 5" /><path d="M17 8c-2 0-3 1.5-3 3.5s1 3.5 3 3.5c0 2.5-1 4-3 5" /></>} />;
const FacebookIcon = (p) => <Icon {...p} path={<path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />} />;
const InstagramIcon = (p) => <Icon {...p} path={<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>} />;
const LinkedinIcon = (p) => <Icon {...p} path={<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7v.01M11 17v-4.5c0-1.4 1-2.5 2.5-2.5S16 11 16 12.5V17" /></>} />;
const SparkleIcon = (p) => <Icon {...p} path={<path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" />} />;
/* specialty + service icons */
const DropletIcon = (p) => <Icon {...p} path={<path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" />} />;
const GridIcon = (p) => <Icon {...p} path={<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>} />;
const SprayIcon = (p) => <Icon {...p} path={<><path d="M9 3h4l1 4H8z" /><path d="M8 7h6l2 13H6z" /><path d="M4 6l2 1M4 10h2M5 14l2-1" /></>} />;
const BabyIcon = (p) => <Icon {...p} path={<><circle cx="12" cy="7" r="3" /><path d="M7 21c0-4 2-7 5-7s5 3 5 7" /><path d="M9 21v-3M15 21v-3" /></>} />;
const FactoryIcon = (p) => <Icon {...p} path={<><path d="M3 21V10l6 4v-4l6 4V7l6 4v10z" /><path d="M3 21h18" /></>} />;
const BuildingIcon = (p) => <Icon {...p} path={<><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /></>} />;
const GraduationCapIcon = (p) => <Icon {...p} path={<><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" /></>} />;
const LayersIcon = (p) => <Icon {...p} path={<><path d="M12 3l9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>} />;
const UtensilsIcon = (p) => <Icon {...p} path={<><path d="M6 3v7a2 2 0 0 0 2 2v9M6 3v6M9 3v6" /><path d="M16 3c-1.5 0-2 2-2 4s.5 4 2 4v10" /></>} />;
const ChefHatIcon = (p) => <Icon {...p} path={<><path d="M8 21h8M9 21v-6M15 21v-6" /><path d="M6 10a4 4 0 0 1 3-6 3 3 0 0 1 6 0 4 4 0 0 1 3 6c0 2-1 4-3 4H9c-2 0-3-2-3-4z" /></>} />;
const BriefcaseIcon = (p) => <Icon {...p} path={<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>} />;

/* ---------- data ---------- */
const CORE_SERVICES = [
  { title: 'Carpet Steam Cleaning', tag: 'Most Requested', desc: 'Deep hot-water extraction that lifts embedded dirt, stains and odours from carpets — fast dry times, safe for kids and pets.', Icon: DropletIcon, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=900' },
  { title: 'Tile & Grout Cleaning', tag: 'Most Requested', desc: 'High-pressure steam and specialist grout treatment that strips years of grime and reseals grout lines to like-new condition.', Icon: GridIcon, img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=900' },
  { title: 'Pressure Cleaning', tag: 'Most Requested', desc: 'Driveways, paths, building exteriors and roofs — blasted clean of grime, mould, oil stains and built-up dirt.', Icon: SprayIcon, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=900' },
];

const FULL_SERVICES = [
  { title: 'Childcare Centre Cleaning', Icon: BabyIcon, desc: 'Low-tox, hygiene-first cleaning for early learning centres.' },
  { title: 'Industrial Cleaning', Icon: FactoryIcon, desc: 'Heavy-duty cleaning for warehouses, plants and factories.' },
  { title: 'Commercial Cleaning', Icon: BuildingIcon, desc: 'Scheduled servicing for shops, showrooms and workplaces.' },
  { title: 'School Cleaning', Icon: GraduationCapIcon, desc: 'Classrooms, halls and amenities kept spotless term-round.' },
  { title: 'Floor Strip & Seal', Icon: LayersIcon, desc: 'Vinyl and hard-floor stripping, sealing and polishing.' },
  { title: 'Restaurant & Pub Cleaning', Icon: UtensilsIcon, desc: 'Front and back-of-house cleaning around service hours.' },
  { title: 'Kitchen Cleaning', Icon: ChefHatIcon, desc: 'Degreasing and sanitising for commercial kitchens.' },
  { title: 'Office Cleaning', Icon: BriefcaseIcon, desc: 'Daily, weekly or after-hours office servicing.' },
];

const ALL_SERVICE_NAMES = [...CORE_SERVICES.map((s) => s.title), ...FULL_SERVICES.map((s) => s.title)];

/* ---------- scroll-reveal wrapper ---------- */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${className} transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- animated counter ---------- */
function Counter({ target, suffix = '', duration = 1400 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{value}{suffix}</span>;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#F7F5F0', color: '#1C2624', fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen flex flex-col selection:bg-[#4F7768] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .display-font { font-family: 'Space Grotesk', sans-serif; }

        @keyframes fadeIn { from { opacity:0; transform:translateY(10px);} to { opacity:1; transform:translateY(0);} }
        .fade-in { animation: fadeIn .5s ease both; }

        @keyframes floatY { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-16px);} }
        .float-slow { animation: floatY 6s ease-in-out infinite; }
        .float-slower { animation: floatY 9s ease-in-out infinite; }

        @keyframes blobPulse { 0%,100% { transform: scale(1) translate(0,0);} 50% { transform: scale(1.14) translate(14px,-14px);} }
        .blob-pulse { animation: blobPulse 9s ease-in-out infinite; }
        .blob-pulse-delay { animation: blobPulse 11s ease-in-out infinite 1.5s; }

        @keyframes shimmer { 0% { background-position: -200% 0;} 100% { background-position: 200% 0;} }
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff 0%, #9FC9BA 25%, #ffffff 50%, #9FC9BA 75%, #ffffff 100%);
          background-size: 200% auto; -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shimmer 5s linear infinite;
        }

        @keyframes underlineGrow { from { transform: scaleX(0);} to { transform: scaleX(1);} }
        .underline-grow { animation: underlineGrow .8s cubic-bezier(.22,1,.36,1) both; transform-origin: left; }

        @keyframes ping-soft { 0% { box-shadow: 0 0 0 0 rgba(79,119,104,0.35);} 100% { box-shadow: 0 0 0 14px rgba(79,119,104,0);} }
        .ping-soft { animation: ping-soft 2.2s ease-out infinite; }

        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: ''; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg); transition: left 0.7s ease;
        }
        .btn-shine:hover::after { left: 130%; }

        .card-hover { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .card-hover:hover { transform: translateY(-8px); }

        .icon-spin-hover { transition: transform .5s ease; }
        .group:hover .icon-spin-hover { transform: rotate(12deg) scale(1.1); }

        @keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }
        .marquee-track { animation: marquee 26s linear infinite; }

        .diagonal-bottom { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }
        .diagonal-top-bottom { clip-path: polygon(0 6%, 100% 0, 100% 94%, 0 100%); }

        .dropdown-panel { transition: opacity .2s ease, transform .2s ease, visibility .2s; }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <TopBar />
      <Header currentPage={currentPage} navigateTo={navigateTo} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="flex-grow overflow-hidden">
        <div key={currentPage} className="fade-in">
          {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
          {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
          {currentPage === 'services' && <ServicesPage navigateTo={navigateTo} />}
          {currentPage === 'contact' && <ContactPage />}
        </div>
      </main>

      <Footer navigateTo={navigateTo} />
    </div>
  );
}

/* ---------------- Top utility bar (desktop) ---------------- */
function TopBar() {
  return (
    <div className="hidden md:block bg-[#1C2624] text-[#B9AF9A] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="tel:+61431014750" className="flex items-center gap-1.5 hover:text-white transition-colors"><PhoneIcon className="w-3.5 h-3.5 text-[#4F7768]" /> +61 431 014 750</a>
          <a href="mailto:admin@westernpropertyservices.com.au" className="flex items-center gap-1.5 hover:text-white transition-colors"><MailIcon className="w-3.5 h-3.5 text-[#4F7768]" /> admin@westernpropertyservices.com.au</a>
          <span className="hidden lg:flex items-center gap-1.5"><PinIcon className="w-3.5 h-3.5 text-[#4F7768]" /> Perth, WA · Mon–Sat 7am–6pm</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-white transition-colors"><FacebookIcon className="w-3.5 h-3.5" /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><InstagramIcon className="w-3.5 h-3.5" /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><LinkedinIcon className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main responsive header ---------------- */
function Header({ currentPage, navigateTo, mobileMenuOpen, setMobileMenuOpen }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#1C2624]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <button className="flex items-center gap-3 group" onClick={() => navigateTo('home')}>
          <div className="relative w-11 h-11 rounded-xl bg-[#1C2624] flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105">
            <span className="display-font text-[#E4D9C3] font-bold text-lg">SAP</span>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4F7768] border-2 border-[#F7F5F0] ping-soft" />
          </div>
          <div className="text-left">
            <span className="display-font block text-lg font-bold tracking-tight leading-none">S.A.P Traders</span>
            <span className="block text-[10px] font-semibold text-[#4F7768] tracking-[0.2em] uppercase mt-1">Pty Ltd · Cleaning Specialists</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button onClick={() => navigateTo('home')} className={`relative py-1 transition-colors duration-200 ${currentPage === 'home' ? 'text-[#1C2624] font-semibold' : 'text-[#4B5754] hover:text-[#1C2624]'}`}>
            Home
            {currentPage === 'home' && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C17A3D] rounded-full underline-grow" />}
          </button>

          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button onClick={() => navigateTo('services')} className={`relative py-1 flex items-center gap-1 transition-colors duration-200 ${currentPage === 'services' ? 'text-[#1C2624] font-semibold' : 'text-[#4B5754] hover:text-[#1C2624]'}`}>
              Services <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              {currentPage === 'services' && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C17A3D] rounded-full underline-grow" />}
            </button>
            <div className={`dropdown-panel absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-white rounded-2xl border border-[#1C2624]/8 shadow-xl p-5 grid grid-cols-2 gap-1 ${servicesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
              <div className="col-span-2 text-[10px] font-bold uppercase tracking-widest text-[#C17A3D] px-2 pb-2">Core Specialties</div>
              {CORE_SERVICES.map((s) => (
                <button key={s.title} onClick={() => navigateTo('services')} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F7F5F0] text-left transition-colors col-span-1">
                  <div className="w-8 h-8 rounded-lg bg-[#4F7768]/10 text-[#4F7768] flex items-center justify-center shrink-0"><s.Icon className="w-4 h-4" /></div>
                  <span className="text-sm font-medium">{s.title}</span>
                </button>
              ))}
              <div className="col-span-2 text-[10px] font-bold uppercase tracking-widest text-[#4F7768] px-2 pt-3 pb-2 border-t border-[#1C2624]/5 mt-2">Also Available</div>
              {FULL_SERVICES.slice(0, 6).map((s) => (
                <button key={s.title} onClick={() => navigateTo('services')} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#F7F5F0] text-left transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E4D9C3]/60 text-[#4F7768] flex items-center justify-center shrink-0"><s.Icon className="w-4 h-4" /></div>
                  <span className="text-sm font-medium">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => navigateTo('about')} className={`relative py-1 transition-colors duration-200 ${currentPage === 'about' ? 'text-[#1C2624] font-semibold' : 'text-[#4B5754] hover:text-[#1C2624]'}`}>
            About Us
            {currentPage === 'about' && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C17A3D] rounded-full underline-grow" />}
          </button>
          <button onClick={() => navigateTo('contact')} className={`relative py-1 transition-colors duration-200 ${currentPage === 'contact' ? 'text-[#1C2624] font-semibold' : 'text-[#4B5754] hover:text-[#1C2624]'}`}>
            Contact
            {currentPage === 'contact' && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C17A3D] rounded-full underline-grow" />}
          </button>

          <button onClick={() => navigateTo('contact')} className="btn-shine ml-2 px-6 py-2.5 rounded-full bg-[#1C2624] text-[#F7F5F0] font-semibold text-sm hover:bg-[#33544A] hover:scale-105 transition-all duration-200">
            Get a Free Quote
          </button>
        </nav>

        <button className="md:hidden p-2 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-[#F7F5F0] border-b border-[#1C2624]/10 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[85vh]' : 'max-h-0'}`}>
        <div className="px-6 pt-2 pb-6 max-h-[80vh] overflow-y-auto">
          {['home', 'services', 'about', 'contact'].map((id) => (
            <button key={id} onClick={() => navigateTo(id)} className={`block w-full text-left py-3 border-b border-[#1C2624]/5 font-semibold ${currentPage === id ? 'text-[#1C2624]' : 'text-[#4B5754]'}`}>
              {id === 'home' ? 'Home' : id === 'about' ? 'About Us' : id === 'services' ? 'Services' : 'Contact'}
            </button>
          ))}

          <div className="pt-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#C17A3D] mb-2">Core Specialties</div>
            <div className="flex flex-wrap gap-2 mb-4">
              {CORE_SERVICES.map((s) => <span key={s.title} className="text-xs font-medium bg-[#4F7768]/10 text-[#33544A] px-3 py-1.5 rounded-full">{s.title}</span>)}
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 text-sm text-[#4B5754]">
            <a href="tel:+61431014750" className="flex items-center gap-1.5"><PhoneIcon className="w-4 h-4 text-[#4F7768]" /> +61 431 014 750</a>
          </div>

          <button onClick={() => navigateTo('contact')} className="w-full mt-3 py-3.5 rounded-xl bg-[#1C2624] text-white font-semibold text-center">Get a Free Quote</button>

          <div className="flex items-center justify-center gap-4 pt-5">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#1C2624]/5 flex items-center justify-center"><FacebookIcon className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#1C2624]/5 flex items-center justify-center"><InstagramIcon className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#1C2624]/5 flex items-center justify-center"><LinkedinIcon className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ navigateTo }) {
  const socials = [
    { icon: <FacebookIcon className="w-[18px] h-[18px]" />, label: 'Facebook', href: 'https://facebook.com' },
    { icon: <InstagramIcon className="w-[18px] h-[18px]" />, label: 'Instagram', href: 'https://instagram.com' },
    { icon: <LinkedinIcon className="w-[18px] h-[18px]" />, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];
  return (
    <footer className="bg-[#1C2624] text-[#E4D9C3] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4F7768] flex items-center justify-center"><span className="display-font text-white font-bold text-sm">SAP</span></div>
            <span className="display-font text-lg font-bold text-white">S.A.P Traders Pty Ltd</span>
          </div>
          <p className="text-[#B9AF9A] text-sm leading-relaxed">
            Perth's specialists in carpet steam cleaning, tile &amp; grout restoration and pressure cleaning — plus a full range of commercial and industrial cleaning services.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4F7768] flex items-center justify-center transition-all duration-300 hover:-translate-y-1">{s.icon}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="display-font text-white font-semibold mb-5 text-sm tracking-wide">Core Specialties</h4>
          <ul className="space-y-2.5 text-sm text-[#B9AF9A]">{CORE_SERVICES.map((s) => <li key={s.title}>{s.title}</li>)}</ul>
          <h4 className="display-font text-white font-semibold mb-3 mt-6 text-sm tracking-wide">Also Available</h4>
          <ul className="space-y-2 text-sm text-[#B9AF9A]">{FULL_SERVICES.slice(0, 4).map((s) => <li key={s.title}>{s.title}</li>)}</ul>
        </div>

        <div>
          <h4 className="display-font text-white font-semibold mb-5 text-sm tracking-wide">Navigate</h4>
          <ul className="space-y-2.5 text-sm text-[#B9AF9A]">
            {['home', 'about', 'services', 'contact'].map((pg) => (
              <li key={pg}><button onClick={() => navigateTo(pg)} className="capitalize hover:text-[#4F7768] transition-colors">{pg === 'home' ? 'Home' : pg === 'about' ? 'About Us' : pg === 'services' ? 'Our Services' : 'Contact Us'}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="display-font text-white font-semibold mb-5 text-sm tracking-wide">Contact</h4>
          <ul className="space-y-3 text-sm text-[#B9AF9A]">
            <li className="flex items-start gap-3"><PinIcon className="w-[18px] h-[18px] text-[#4F7768] shrink-0 mt-0.5" /> Perth, Western Australia</li>
            <li className="flex items-center gap-3"><PhoneIcon className="w-[18px] h-[18px] text-[#4F7768] shrink-0" /> +61 431 014 750</li>
            <li className="flex items-center gap-3 break-all"><MailIcon className="w-[18px] h-[18px] text-[#4F7768] shrink-0" /> admin@westernpropertyservices.com.au</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 text-center text-xs text-[#8A8271] space-y-1.5">
        <p>© {new Date().getFullYear()} S.A.P Traders Pty Ltd · ACN 629 776 469. All rights reserved.</p>
        <p>Designed and Developed by <span className="text-[#9FC9BA] font-semibold">Vexel IT</span> by <span className="text-[#C17A3D] font-semibold">Kavizz</span></p>
      </div>
    </footer>
  );
}

/* ---------------- Hero ---------------- */
function HeroSlider({ navigateTo }) {
  const slides = [
    { title: 'Perth\u2019s Carpet, Tile & Pressure Cleaning Specialists', subtitle: 'S.A.P Traders Pty Ltd restores carpets, floors and exteriors to like-new condition — backed by a full range of commercial cleaning services.', img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=1600' },
    { title: 'Tile & Grout, Restored to Like-New', subtitle: 'Steam-powered deep cleaning and resealing that strips years of built-up grime from floors and grout lines.', img: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1600' },
    { title: 'Driveways, Roofs & Exteriors, Blasted Clean', subtitle: 'Professional pressure cleaning that removes mould, oil stains and grime from every hard surface.', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1600' },
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="relative h-[640px] md:h-[720px] overflow-hidden bg-[#1C2624] diagonal-bottom">
      <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-[#4F7768]/25 blur-3xl pointer-events-none blob-pulse" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#1E7F80]/25 blur-3xl pointer-events-none blob-pulse-delay" />

      <div key={current} className="absolute inset-0 fade-in">
        <img src={slides[current].img} alt="" className="w-full h-full object-cover opacity-[0.28]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2624] via-[#1C2624]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2624] via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-2 mb-6">
                {['Carpet Steam Cleaning', 'Tile & Grout', 'Pressure Cleaning'].map((tag, i) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-[#4F7768]/20 text-[#9FC9BA] border border-[#4F7768]/40 float-slow" style={{ animationDelay: `${i * 0.3}s` }}>
                    <SparkleIcon className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>

              <h1 className="display-font text-4xl sm:text-5xl md:text-6xl font-bold shimmer-text leading-[1.08] tracking-tight mb-6">
                {slides[current].title}
              </h1>
              <span className="block h-[3px] w-40 -mt-3 mb-6 rounded-full underline-grow" style={{ background: 'linear-gradient(90deg, transparent, #4F7768, #1E7F80, transparent)' }} />

              <p className="text-lg text-[#D8D3C4] mb-8 leading-relaxed">{slides[current].subtitle}</p>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigateTo('contact')} className="btn-shine px-8 py-4 rounded-full bg-[#C17A3D] text-white font-semibold hover:bg-[#a8672f] hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Get Free Quote <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button onClick={() => navigateTo('services')} className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium hover:scale-105 transition-all duration-300">
                  View All Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1))} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition hover:scale-110" aria-label="Previous slide"><ChevronLeftIcon className="w-5 h-5" /></button>
      <button onClick={() => setCurrent((p) => (p + 1) % slides.length)} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition hover:scale-110" aria-label="Next slide"><ChevronRightIcon className="w-5 h-5" /></button>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'bg-[#C17A3D] w-9' : 'bg-white/30 w-2'}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Ticker of all services ---------------- */
function ServiceTicker() {
  const doubled = [...ALL_SERVICE_NAMES, ...ALL_SERVICE_NAMES];
  return (
    <div className="bg-[#1C2624] py-5 overflow-hidden border-y border-white/5">
      <div className="flex whitespace-nowrap marquee-track w-max">
        {doubled.map((name, i) => (
          <span key={i} className="text-sm font-medium text-[#9FC9BA] mx-6 flex items-center gap-6">{name} <span className="text-[#4F7768]">✦</span></span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Stats bar ---------------- */
function StatsBar() {
  const stats = [
    { value: 10, suffix: '+', label: 'Years serving Perth' },
    { value: 500, suffix: '+', label: 'Properties cleaned' },
    { value: 4.9, suffix: '★', label: 'Average client rating', raw: '4.9★' },
    { value: 11, suffix: '', label: 'Specialist services' },
  ];
  return (
    <div className="bg-white py-10 border-b border-[#1C2624]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="text-center border-r last:border-r-0 border-[#1C2624]/10">
              <div className="display-font text-3xl font-bold text-[#1C2624]">{s.raw ? s.raw : <Counter target={s.value} suffix={s.suffix} />}</div>
              <div className="text-xs text-[#4B5754] mt-1 tracking-wide">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Core service spotlight card ---------------- */
function CoreServiceCard({ service, idx, navigateTo }) {
  const { Icon } = service;
  return (
    <Reveal delay={idx * 120}>
      <div className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 h-96 group cursor-pointer card-hover" onClick={() => navigateTo('services')}>
        <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2624] via-[#1C2624]/40 to-transparent" />
        <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#C17A3D] text-white">{service.tag}</span>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3 icon-spin-hover"><Icon className="w-5 h-5" /></div>
          <h3 className="display-font text-xl font-bold mb-2">{service.title}</h3>
          <p className="text-sm text-[#D8D3C4] leading-relaxed">{service.desc}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9FC9BA] mt-4 group-hover:gap-2.5 transition-all">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Home Page ---------------- */
function HomePage({ navigateTo }) {
  return (
    <div>
      <HeroSlider navigateTo={navigateTo} />
      <ServiceTicker />
      <StatsBar />

      <section className="py-20 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#C17A3D] font-semibold uppercase tracking-widest text-xs">What We Do Best</span>
            <h2 className="display-font text-3xl md:text-4xl font-bold mt-3">Our Core Specialties</h2>
            <p className="text-[#4B5754] mt-4">Three services we're best known for across Perth — done to a standard that keeps clients coming back.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_SERVICES.map((s, i) => <CoreServiceCard key={s.title} service={s} idx={i} navigateTo={navigateTo} />)}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#EFEAE0] diagonal-top-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-[#4F7768] font-semibold uppercase tracking-widest text-xs">And So Much More</span>
              <h2 className="display-font text-3xl md:text-4xl font-bold mt-3">A Full Range of Cleaning Solutions</h2>
            </div>
            <button onClick={() => navigateTo('services')} className="group mt-4 md:mt-0 font-semibold text-sm hover:text-[#4F7768] flex items-center gap-2 transition-colors">
              View all services <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FULL_SERVICES.map((s, i) => {
              const { Icon } = s;
              return (
                <Reveal key={s.title} delay={(i % 4) * 90}>
                  <button onClick={() => navigateTo('services')} className="text-left bg-white rounded-2xl p-5 border border-[#1C2624]/8 hover:border-[#4F7768]/40 hover:shadow-lg card-hover transition-shadow duration-300 w-full h-full">
                    <div className="w-10 h-10 rounded-xl bg-[#4F7768]/10 text-[#4F7768] flex items-center justify-center mb-3"><Icon className="w-5 h-5" /></div>
                    <h4 className="display-font font-semibold text-sm mb-1">{s.title}</h4>
                    <p className="text-xs text-[#4B5754] leading-relaxed">{s.desc}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#C17A3D] font-semibold uppercase tracking-widest text-xs">Why Perth Chooses Us</span>
            <h2 className="display-font text-3xl md:text-4xl font-bold mt-3">Built on Trust, Detail & Care</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldIcon className="w-6 h-6 text-[#4F7768]" />, title: 'Fully Insured & Vetted', desc: 'Every team member is police-checked, trained and covered by public liability insurance.' },
              { icon: <LeafIcon className="w-6 h-6 text-[#4F7768]" />, title: 'Eco-Conscious Products', desc: 'Low-tox, biodegradable solutions safe for children, staff, pets and the environment.' },
              { icon: <ClockIcon className="w-6 h-6 text-[#4F7768]" />, title: 'Flexible Scheduling', desc: 'Early mornings, after-hours or weekends — we work around your business and your life.' },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="group p-8 rounded-2xl bg-white border border-[#1C2624]/8 shadow-sm hover:shadow-xl card-hover">
                  <div className="w-12 h-12 rounded-xl bg-[#E4D9C3]/60 flex items-center justify-center mb-6 icon-spin-hover">{item.icon}</div>
                  <h3 className="display-font text-lg font-semibold mb-3">{item.title}</h3>
                  <p className="text-[#4B5754] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />

      <section className="py-16 bg-[#1C2624] relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#4F7768]/10 rounded-full blur-3xl blob-pulse pointer-events-none" />
        <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="display-font text-2xl md:text-3xl font-bold text-white mb-4">Ready for a spotless space?</h2>
          <p className="text-[#B9AF9A] mb-8 max-w-xl mx-auto">Get a free, no-obligation quote from Perth's carpet, tile and pressure cleaning specialists.</p>
          <button onClick={() => navigateTo('contact')} className="btn-shine px-8 py-4 rounded-full bg-[#C17A3D] text-white font-semibold hover:bg-[#a8672f] hover:scale-105 transition-all duration-300">
            Request Your Free Quote
          </button>
        </Reveal>
      </section>
    </div>
  );
}

/* ---------------- Customer Feedback ---------------- */
function TestimonialSection() {
  const reviews = [
    { name: 'Sarah M.', suburb: 'Cottesloe', rating: 5, quote: 'The carpet steam clean was incredible — stains I thought were permanent came right out. Dried faster than I expected too.' },
    { name: 'David R.', suburb: 'Subiaco', rating: 5, quote: 'We use S.A.P Traders for our office and warehouse cleaning. Reliable, professional, and the pressure cleaning on our loading dock was excellent.' },
    { name: 'Priya K.', suburb: 'Joondalup', rating: 5, quote: 'Our childcare centre needs a very particular standard of clean and they nailed it. Highly recommend for any early learning centre.' },
    { name: 'Michael T.', suburb: 'Fremantle', rating: 5, quote: 'Tile and grout in our restaurant kitchen looks brand new. Professional team, fair pricing, worked around our service hours.' },
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5500);
    return () => clearInterval(t);
  }, [reviews.length]);

  return (
    <section className="py-20 bg-[#F7F5F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[#C17A3D] font-semibold uppercase tracking-widest text-xs">Customer Feedback</span>
          <h2 className="display-font text-3xl md:text-4xl font-bold mt-3">What Perth Says About Us</h2>
        </Reveal>
        <Reveal>
          <div className="relative bg-white rounded-3xl border border-[#1C2624]/8 shadow-sm p-8 md:p-12 min-h-[280px]">
            <QuoteIcon className="w-10 h-10 text-[#E4D9C3] absolute top-8 left-8 float-slower" />
            <div key={index} className="relative z-10 text-center max-w-2xl mx-auto pt-6 fade-in">
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < reviews[index].rating} className={`w-5 h-5 ${i < reviews[index].rating ? 'text-[#C17A3D]' : 'text-[#E4D9C3]'}`} />
                ))}
              </div>
              <p className="display-font text-xl md:text-2xl leading-snug mb-6">"{reviews[index].quote}"</p>
              <div className="text-sm font-semibold">{reviews[index].name}</div>
              <div className="text-xs text-[#4F7768] uppercase tracking-widest mt-1">{reviews[index].suburb}, WA</div>
            </div>
            <div className="flex justify-center gap-2 mt-10">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-[#4F7768] w-8' : 'bg-[#E4D9C3] w-2'}`} aria-label={`Show review ${i + 1}`} />
              ))}
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {reviews.map((r, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`text-left p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${i === index ? 'border-[#4F7768] bg-[#4F7768]/5' : 'border-[#1C2624]/8 bg-white hover:border-[#4F7768]/40'}`}>
              <div className="text-xs font-semibold">{r.name}</div>
              <div className="text-[10px] text-[#4B5754]">{r.suburb}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About Page ---------------- */
function AboutPage({ navigateTo }) {
  return (
    <div className="py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C17A3D] font-semibold uppercase tracking-wider text-xs">Who We Are</span>
          <h2 className="display-font text-4xl font-bold mt-3 mb-5">S.A.P Traders Pty Ltd</h2>
          <p className="text-[#4B5754] leading-relaxed">
            A Perth-based cleaning company specialising in carpet steam cleaning, tile &amp; grout restoration and pressure cleaning — with a full range of commercial, industrial and facility cleaning services behind it.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <Reveal>
            <div className="space-y-6">
              <h3 className="display-font text-2xl md:text-3xl font-bold">Specialists First, Generalists Too</h3>
              <p className="text-[#4B5754] leading-relaxed">
                S.A.P Traders Pty Ltd built its reputation on the services people ask for most: deep carpet steam cleaning, tile &amp; grout restoration and pressure cleaning. That same attention to detail now extends across childcare centres, schools, offices, restaurants, kitchens and industrial sites throughout the Perth metro area.
              </p>
              <div className="space-y-3">
                {['Police-checked and fully trained cleaning teams', 'Public liability insured on every job', 'Eco-conscious, low-tox cleaning products', 'Specialist equipment for steam, tile & pressure work'].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 font-medium text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#4F7768]/15 text-[#4F7768] flex items-center justify-center shrink-0"><CheckIcon className="w-3.5 h-3.5" /></div>
                    {feat}
                  </div>
                ))}
              </div>
              <button onClick={() => navigateTo('contact')} className="btn-shine px-8 py-3.5 rounded-full bg-[#1C2624] text-white font-semibold hover:bg-[#33544A] transition-colors">Talk to Our Team</button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-md h-64 w-full object-cover" alt="Carpet steam cleaning" />
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-md h-64 w-full object-cover mt-8" alt="Pressure cleaning" />
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: AwardIcon, title: 'Quality First', desc: 'Checklists and quality audits on every job.' },
            { icon: UsersIcon, title: 'Trained Team', desc: 'Ongoing training in modern cleaning methods.' },
            { icon: HomeIcon, title: 'Any Property', desc: 'Homes, schools, offices, kitchens & industrial sites.' },
            { icon: LeafIcon, title: 'WA Owned', desc: 'Proudly local, supporting the Perth community.' },
          ].map((v, i) => {
            const VIcon = v.icon;
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-[#1C2624]/8 p-6 text-center card-hover">
                  <div className="w-11 h-11 mx-auto rounded-xl bg-[#E4D9C3]/60 text-[#4F7768] flex items-center justify-center mb-4"><VIcon className="w-5 h-5" /></div>
                  <h4 className="display-font font-semibold mb-1.5">{v.title}</h4>
                  <p className="text-xs text-[#4B5754] leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Services Page ---------------- */
function ServicesPage({ navigateTo }) {
  return (
    <div className="py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#4F7768] font-semibold uppercase tracking-wider text-xs">Our Solutions</span>
          <h2 className="display-font text-4xl font-bold mt-3 mb-4">Cleaning Services for Every Property</h2>
          <p className="text-[#4B5754]">Specialists in carpet steam cleaning, tile &amp; grout restoration and pressure cleaning — plus a complete range of commercial and industrial services.</p>
        </Reveal>

        <Reveal className="mb-6 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#C17A3D] px-3 py-1 rounded-full">Core Specialties</span>
          <span className="text-sm text-[#4B5754]">The services we're known for across Perth</span>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {CORE_SERVICES.map((s, i) => <CoreServiceCard key={s.title} service={s} idx={i} navigateTo={navigateTo} />)}
        </div>

        <Reveal className="mb-6 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#4F7768] px-3 py-1 rounded-full">Complete Range</span>
          <span className="text-sm text-[#4B5754]">Everything else we take care of</span>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FULL_SERVICES.map((s, idx) => {
            const { Icon } = s;
            return (
              <Reveal key={s.title} delay={(idx % 4) * 90}>
                <div className="bg-white border border-[#1C2624]/8 rounded-2xl p-6 shadow-sm hover:shadow-xl card-hover transition-shadow duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#E4D9C3]/60 text-[#4F7768] flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></div>
                    <h3 className="display-font text-base font-semibold mb-2">{s.title}</h3>
                    <p className="text-[#4B5754] text-sm leading-relaxed mb-5">{s.desc}</p>
                  </div>
                  <button onClick={() => navigateTo('contact')} className="w-fit font-semibold text-sm hover:text-[#4F7768] transition-colors flex items-center gap-1.5">Get a Quote <ArrowRightIcon className="w-3.5 h-3.5" /></button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Contact Page ---------------- */
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const socials = [
    { icon: <FacebookIcon className="w-5 h-5" />, label: 'Facebook', href: 'https://facebook.com' },
    { icon: <InstagramIcon className="w-5 h-5" />, label: 'Instagram', href: 'https://instagram.com' },
    { icon: <LinkedinIcon className="w-5 h-5" />, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];
  return (
    <div className="py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C17A3D] font-semibold uppercase tracking-wider text-xs">Get In Touch</span>
          <h2 className="display-font text-4xl font-bold mt-3">Request Your Free Quote</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="bg-[#1C2624] p-10 rounded-3xl text-white flex flex-col justify-between h-full">
              <div>
                <h3 className="display-font text-2xl font-bold text-[#9FC9BA] mb-4">S.A.P Traders Pty Ltd</h3>
                <p className="text-[#B9AF9A] text-sm mb-8 leading-relaxed">Reach out to discuss carpet steam cleaning, tile &amp; grout, pressure cleaning, or any of our commercial services — we respond fast.</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl text-[#9FC9BA] shrink-0"><PinIcon className="w-5 h-5" /></div>
                    <div><h5 className="font-semibold text-sm">Location</h5><p className="text-xs text-[#B9AF9A] mt-0.5">Perth, Western Australia</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl text-[#9FC9BA] shrink-0"><PhoneIcon className="w-5 h-5" /></div>
                    <div><h5 className="font-semibold text-sm">Phone</h5><p className="text-xs text-[#B9AF9A] mt-0.5">+61 431 014 750</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl text-[#9FC9BA] shrink-0"><MailIcon className="w-5 h-5" /></div>
                    <div><h5 className="font-semibold text-sm">Email</h5><p className="text-xs text-[#B9AF9A] mt-0.5 break-all">admin@westernpropertyservices.com.au</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-xl text-[#9FC9BA] shrink-0"><CheckCircleIcon className="w-5 h-5" /></div>
                    <div><h5 className="font-semibold text-sm">ACN</h5><p className="text-xs text-[#B9AF9A] mt-0.5">629 776 469</p></div>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <h5 className="font-semibold text-sm mb-4 text-[#B9AF9A] uppercase tracking-widest text-xs">Follow Us</h5>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#4F7768] flex items-center justify-center transition-all duration-300 hover:-translate-y-1">{s.icon}</a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#1C2624]/8 shadow-sm h-full">
              {submitted ? (
                <div className="text-center py-12 fade-in">
                  <CheckCircleIcon className="w-14 h-14 text-[#4F7768] mx-auto mb-4" />
                  <h3 className="display-font text-2xl font-bold mb-2">Quote Request Sent!</h3>
                  <p className="text-[#4B5754] text-sm">Thanks for reaching out to S.A.P Traders Pty Ltd — we'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#4B5754] mb-1.5 tracking-wide">Full Name</label>
                    <input required type="text" placeholder="Jane Smith" className="w-full px-4 py-3 rounded-xl border border-[#1C2624]/15 focus:outline-none focus:ring-2 focus:ring-[#4F7768] text-sm bg-[#F7F5F0]/50 transition-shadow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#4B5754] mb-1.5 tracking-wide">Phone Number</label>
                      <input required type="tel" placeholder="04XX XXX XXX" className="w-full px-4 py-3 rounded-xl border border-[#1C2624]/15 focus:outline-none focus:ring-2 focus:ring-[#4F7768] text-sm bg-[#F7F5F0]/50 transition-shadow" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#4B5754] mb-1.5 tracking-wide">Email</label>
                      <input required type="email" placeholder="jane@example.com.au" className="w-full px-4 py-3 rounded-xl border border-[#1C2624]/15 focus:outline-none focus:ring-2 focus:ring-[#4F7768] text-sm bg-[#F7F5F0]/50 transition-shadow" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#4B5754] mb-1.5 tracking-wide">Service Needed</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-[#1C2624]/15 focus:outline-none focus:ring-2 focus:ring-[#4F7768] text-sm bg-[#F7F5F0]/50">
                      <option>Select a service</option>
                      {ALL_SERVICE_NAMES.map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#4B5754] mb-1.5 tracking-wide">Message</label>
                    <textarea rows="4" placeholder="Tell us about your property and what you need cleaned..." className="w-full px-4 py-3 rounded-xl border border-[#1C2624]/15 focus:outline-none focus:ring-2 focus:ring-[#4F7768] text-sm bg-[#F7F5F0]/50 transition-shadow"></textarea>
                  </div>
                  <button type="submit" className="btn-shine w-full py-4 rounded-xl bg-[#1C2624] text-white font-semibold hover:bg-[#33544A] transition-colors">Submit Request</button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}