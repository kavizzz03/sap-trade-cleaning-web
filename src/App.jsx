import React, { useState, useEffect, useRef } from 'react';

/*
  SAP TRADE PVT LTD — dependency-free build (no framer-motion, no lucide-react)
  Only React + Tailwind. Animations are done with CSS keyframes + IntersectionObserver
  so there is zero risk of a missing-package blank screen.
*/

/* ---------- tiny inline icon set (no external package needed) ---------- */
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
const BuildingIcon = (p) => <Icon {...p} path={<><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /></>} />;
const HomeIcon = (p) => <Icon {...p} path={<><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>} />;
const DropletIcon = (p) => <Icon {...p} path={<path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13z" />} />;
const HatIcon = (p) => <Icon {...p} path={<><path d="M3 18h18l-2-6a7 7 0 0 0-14 0z" /><path d="M9 18v-3M15 18v-3" /></>} />;
const WindowIcon = (p) => <Icon {...p} path={<><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M3 12h18M12 4v16" /></>} />;
const QuoteIcon = (p) => <Icon {...p} path={<><path d="M7 8c-2 0-3 1.5-3 3.5S5 15 7 15c0 2.5-1 4-3 5" /><path d="M17 8c-2 0-3 1.5-3 3.5s1 3.5 3 3.5c0 2.5-1 4-3 5" /></>} />;
const FacebookIcon = (p) => <Icon {...p} path={<path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />} />;
const InstagramIcon = (p) => <Icon {...p} path={<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></>} />;
const LinkedinIcon = (p) => <Icon {...p} path={<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7v.01M11 17v-4.5c0-1.4 1-2.5 2.5-2.5S16 11 16 12.5V17" /></>} />;
const SparkleIcon = (p) => <Icon {...p} path={<path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" />} />;

/* ---------- scroll-reveal wrapper (pure React + IntersectionObserver) ---------- */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
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
    <div style={{ background: '#F7F5F0', color: '#1C2624', fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .display-font { font-family: 'Space Grotesk', sans-serif; }

        @keyframes fadeIn { from { opacity:0; transform:translateY(10px);} to { opacity:1; transform:translateY(0);} }
        .fade-in { animation: fadeIn .5s ease both; }

        @keyframes floatY { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-16px);} }
        .float-slow { animation: floatY 6s ease-in-out infinite; }
        .float-slower { animation: floatY 9s ease-in-out infinite; }

        @keyframes blobPulse { 0%,100% { transform: scale(1) translate(0,0);} 50% { transform: scale(1.12) translate(10px,-10px);} }
        .blob-pulse { animation: blobPulse 8s ease-in-out infinite; }

        @keyframes shimmer { 0% { background-position: -200% 0;} 100% { background-position: 200% 0;} }
        .shimmer-text {
          background: linear-gradient(90deg, #ffffff 0%, #9FC9BA 25%, #ffffff 50%, #9FC9BA 75%, #ffffff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 5s linear infinite;
        }

        @keyframes underlineGrow { from { transform: scaleX(0);} to { transform: scaleX(1);} }
        .underline-grow { animation: underlineGrow .8s cubic-bezier(.22,1,.36,1) both; transform-origin: left; }

        @keyframes ping-soft { 0% { box-shadow: 0 0 0 0 rgba(79,119,104,0.35);} 100% { box-shadow: 0 0 0 14px rgba(79,119,104,0);} }
        .ping-soft { animation: ping-soft 2.2s ease-out infinite; }

        .btn-shine { position: relative; overflow: hidden; }
        .btn-shine::after {
          content: '';
          position: absolute; top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
        }
        .btn-shine:hover::after { left: 130%; }

        .card-hover { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .card-hover:hover { transform: translateY(-8px); }

        .icon-spin-hover { transition: transform .5s ease; }
        .group:hover .icon-spin-hover { transform: rotate(12deg) scale(1.1); }

        @keyframes marquee { from { transform: translateX(0);} to { transform: translateX(-50%);} }
        .marquee-track { animation: marquee 22s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#1C2624]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button className="flex items-center gap-3 group" onClick={() => navigateTo('home')}>
            <div className="relative w-11 h-11 rounded-xl bg-[#1C2624] flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105">
              <span className="display-font text-[#E4D9C3] font-bold text-lg">ST</span>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4F7768] border-2 border-[#F7F5F0] ping-soft" />
            </div>
            <div className="text-left">
              <span className="display-font block text-lg font-bold tracking-tight leading-none">SAP Trade</span>
              <span className="block text-[10px] font-semibold text-[#4F7768] tracking-[0.2em] uppercase mt-1">PVT LTD · Cleaning Services</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`relative py-1 transition-colors duration-200 ${currentPage === item.id ? 'text-[#1C2624] font-semibold' : 'text-[#4B5754] hover:text-[#1C2624]'}`}
              >
                {item.label}
                {currentPage === item.id && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C17A3D] rounded-full underline-grow" />}
              </button>
            ))}
            <button onClick={() => navigateTo('contact')} className="btn-shine ml-2 px-6 py-2.5 rounded-full bg-[#1C2624] text-[#F7F5F0] font-semibold text-sm hover:bg-[#33544A] transition-colors duration-200">
              Get a Free Quote
            </button>
          </nav>

          <button className="md:hidden p-2 rounded-lg" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F5F0] border-b border-[#1C2624]/10 px-6 pt-2 pb-6 space-y-1 fade-in">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button key={item.id} onClick={() => navigateTo(item.id)} className={`block w-full text-left py-3 border-b border-[#1C2624]/5 font-medium ${currentPage === item.id ? 'text-[#1C2624] font-semibold' : 'text-[#4B5754]'}`}>
                {item.label}
              </button>
            ))}
            <button onClick={() => navigateTo('contact')} className="w-full mt-4 py-3 rounded-xl bg-[#1C2624] text-[#F7F5F0] font-semibold text-center">
              Get a Free Quote
            </button>
          </div>
        )}
      </header>

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
            <div className="w-10 h-10 rounded-xl bg-[#4F7768] flex items-center justify-center">
              <span className="display-font text-white font-bold text-sm">ST</span>
            </div>
            <span className="display-font text-lg font-bold text-white">SAP Trade PVT LTD</span>
          </div>
          <p className="text-[#B9AF9A] text-sm leading-relaxed">
            Perth-owned and operated, delivering spotless commercial and residential cleaning across Western Australia.
          </p>
          <div className="flex items-center gap-3 pt-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#4F7768] flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                {s.icon}
              </a>
            ))}
          </div>
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
          <h4 className="display-font text-white font-semibold mb-5 text-sm tracking-wide">Services</h4>
          <ul className="space-y-2.5 text-sm text-[#B9AF9A]">
            <li>Commercial Office Cleaning</li>
            <li>Residential & Deep Cleaning</li>
            <li>End of Lease Cleaning</li>
            <li>Carpet & Upholstery Care</li>
            <li>Post-Construction Cleaning</li>
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
        <p>© {new Date().getFullYear()} SAP Trade PVT LTD · ACN 629 776 469 (SAP Traders Pty Ltd). All rights reserved.</p>
        <p className="text-[#8A8271]">
          Designed and Developed by <span className="text-[#9FC9BA] font-semibold">Vexel IT</span> by <span className="text-[#C17A3D] font-semibold">Kavizz</span>
        </p>
      </div>
    </footer>
  );
}

function HeroSlider({ navigateTo }) {
  const slides = [
    { title: 'Perth Property Cleaning, Done Properly', subtitle: 'From city offices to family homes, SAP Trade PVT LTD brings a meticulous, reliable clean to every corner of Perth.', badge: 'Locally Owned · Fully Insured', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1600' },
    { title: 'A Spotless Finish, Every Single Visit', subtitle: 'Trained, background-checked cleaners using eco-conscious products safe for your family, pets and staff.', badge: 'Eco-Conscious Products', img: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=1600' },
    { title: 'Trusted by Perth Businesses & Homeowners', subtitle: 'Flexible scheduling, transparent pricing, and a satisfaction guarantee on every job we take on.', badge: 'Satisfaction Guaranteed', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1600' },
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="relative h-[620px] md:h-[700px] overflow-hidden bg-[#1C2624]">
      {/* animated ambient blobs */}
      <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-[#4F7768]/20 blur-3xl blob-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#1E7F80]/20 blur-3xl blob-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

      <div key={current} className="absolute inset-0 fade-in">
        <img src={slides[current].img} alt="" className="w-full h-full object-cover opacity-[0.28]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2624] via-[#1C2624]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2624] via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#4F7768]/20 text-[#9FC9BA] border border-[#4F7768]/40 mb-6 float-slow">
                <LeafIcon className="w-[14px] h-[14px]" /> {slides[current].badge}
              </span>
              <div className="mb-6">
                <h1 className="display-font text-4xl sm:text-5xl md:text-6xl font-bold shimmer-text leading-[1.08] tracking-tight">{slides[current].title}</h1>
                <span className="block h-[3px] w-40 mt-5 rounded-full underline-grow" style={{ background: 'linear-gradient(90deg, transparent, #4F7768, #1E7F80, transparent)' }} />
              </div>
              <p className="text-lg text-[#D8D3C4] mb-8 leading-relaxed">{slides[current].subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigateTo('contact')} className="btn-shine px-8 py-4 rounded-full bg-[#C17A3D] text-white font-semibold hover:bg-[#a8672f] hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Get Free Quote <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button onClick={() => navigateTo('services')} className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium hover:scale-105 transition-all duration-300">
                  Explore Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1))} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition hover:scale-110" aria-label="Previous slide"><ChevronLeftIcon className="w-5 h-5" /></button>
      <button onClick={() => setCurrent((p) => (p + 1) % slides.length)} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition hover:scale-110" aria-label="Next slide"><ChevronRightIcon className="w-5 h-5" /></button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'bg-[#C17A3D] w-9' : 'bg-white/30 w-2'}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

function StatsBar() {
  const stats = [
    { value: 10, suffix: '+', label: 'Years serving Perth' },
    { value: 500, suffix: '+', label: 'Properties cleaned' },
    { value: 4.9, suffix: '★', label: 'Average client rating', raw: '4.9★' },
    { value: 24, suffix: '/7', label: 'Booking availability', raw: '24/7' },
  ];
  return (
    <div className="bg-[#1C2624] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="text-center border-r last:border-r-0 border-white/10">
              <div className="display-font text-3xl font-bold text-[#9FC9BA]">
                {s.raw ? s.raw : <Counter target={s.value} suffix={s.suffix} />}
              </div>
              <div className="text-xs text-[#B9AF9A] mt-1 tracking-wide">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function HomePage({ navigateTo }) {
  return (
    <div>
      <HeroSlider navigateTo={navigateTo} />
      <StatsBar />

      <section className="py-20 bg-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#C17A3D] font-semibold uppercase tracking-widest text-xs">Why Perth Chooses Us</span>
            <h2 className="display-font text-3xl md:text-4xl font-bold mt-3">Built on Trust, Detail & Care</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldIcon className="w-6 h-6 text-[#4F7768]" />, title: 'Fully Insured & Vetted', desc: 'Every cleaner is police-checked, trained and covered by public liability insurance.' },
              { icon: <LeafIcon className="w-6 h-6 text-[#4F7768]" />, title: 'Eco-Conscious Cleaning', desc: 'Low-tox, biodegradable products that protect your family, pets and the environment.' },
              { icon: <ClockIcon className="w-6 h-6 text-[#4F7768]" />, title: 'Flexible Scheduling', desc: 'Early mornings, after-hours or weekends — we work around your schedule.' },
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

      <section className="py-20 bg-[#EFEAE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-[#4F7768] font-semibold uppercase tracking-widest text-xs">Where We Work</span>
              <h2 className="display-font text-3xl md:text-4xl font-bold mt-3">Across Every Corner of Perth</h2>
            </div>
            <button onClick={() => navigateTo('services')} className="group mt-4 md:mt-0 font-semibold text-sm hover:text-[#4F7768] flex items-center gap-2 transition-colors">
              View all services <ArrowUpRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Corporate Offices', tag: 'CBD & Suburbs', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
              { title: 'Family Homes', tag: 'Residential', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' },
              { title: 'Carpets & Floors', tag: 'Deep Restoration', img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800' },
            ].map((c, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="relative rounded-2xl overflow-hidden shadow-md h-80 group cursor-pointer card-hover" onClick={() => navigateTo('services')}>
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2624] via-[#1C2624]/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#9FC9BA] font-semibold">{c.tag}</span>
                    <h4 className="display-font text-xl font-semibold mt-1">{c.title}</h4>
                  </div>
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
          <p className="text-[#B9AF9A] mb-8 max-w-xl mx-auto">Get a free, no-obligation quote from Perth's most detail-driven cleaning team.</p>
          <button onClick={() => navigateTo('contact')} className="btn-shine px-8 py-4 rounded-full bg-[#C17A3D] text-white font-semibold hover:bg-[#a8672f] hover:scale-105 transition-all duration-300">
            Request Your Free Quote
          </button>
        </Reveal>
      </section>
    </div>
  );
}

function TestimonialSection() {
  const reviews = [
    { name: 'Sarah M.', suburb: 'Cottesloe', rating: 5, quote: 'SAP Trade PVT LTD have cleaned our beach house for two years now. Always on time, always spotless.' },
    { name: 'David R.', suburb: 'Subiaco', rating: 5, quote: 'We switched our office cleaning contract to SAP Trade and the difference was immediate. Professional and great communication.' },
    { name: 'Priya K.', suburb: 'Joondalup', rating: 5, quote: 'End of lease clean was flawless — got our full bond back. Attention to detail was honestly impressive.' },
    { name: 'Michael T.', suburb: 'Fremantle', rating: 4, quote: 'Reliable and friendly, and they use products that don\u2019t leave a harsh chemical smell. Great work.' },
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

function AboutPage({ navigateTo }) {
  return (
    <div className="py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#C17A3D] font-semibold uppercase tracking-wider text-xs">Who We Are</span>
          <h2 className="display-font text-4xl font-bold mt-3 mb-5">SAP Trade PVT LTD</h2>
          <p className="text-[#4B5754] leading-relaxed">
            A Perth-based cleaning company delivering trusted, detail-driven care for homes, offices and job sites across Western Australia.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <Reveal>
            <div className="space-y-6">
              <h3 className="display-font text-2xl md:text-3xl font-bold">A Local Team You Can Rely On</h3>
              <p className="text-[#4B5754] leading-relaxed">
                Founded in Perth, SAP Trade PVT LTD grew from a simple idea: cleaning should be dependable, thorough, and easy to book. Today our trained team supports offices, homes and construction sites throughout the metro area.
              </p>
              <div className="space-y-3">
                {['Police-checked and fully trained cleaning staff', 'Public liability insured on every job', 'Eco-conscious, low-tox cleaning products', 'Custom plans for homes, offices & job sites'].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 font-medium text-sm">
                    <div className="w-6 h-6 rounded-full bg-[#4F7768]/15 text-[#4F7768] flex items-center justify-center shrink-0"><CheckIcon className="w-3.5 h-3.5" /></div>
                    {feat}
                  </div>
                ))}
              </div>
              <button onClick={() => navigateTo('contact')} className="btn-shine px-8 py-3.5 rounded-full bg-[#1C2624] text-white font-semibold hover:bg-[#33544A] transition-colors">
                Talk to Our Team
              </button>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-md h-64 w-full object-cover" alt="Cleaning staff at work" />
              <img src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" className="rounded-2xl shadow-md h-64 w-full object-cover mt-8" alt="Sanitised surfaces" />
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <AwardIcon className="w-5 h-5" />, title: 'Quality First', desc: 'Checklists and quality audits on every job.' },
            { icon: <UsersIcon className="w-5 h-5" />, title: 'Trained Team', desc: 'Ongoing training in modern cleaning methods.' },
            { icon: <BuildingIcon className="w-5 h-5" />, title: 'Any Property', desc: 'Homes, offices, retail and construction sites.' },
            { icon: <LeafIcon className="w-5 h-5" />, title: 'WA Owned', desc: 'Proudly local, supporting the Perth community.' },
          ].map((v, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl border border-[#1C2624]/8 p-6 text-center card-hover">
                <div className="w-11 h-11 mx-auto rounded-xl bg-[#E4D9C3]/60 text-[#4F7768] flex items-center justify-center mb-4">{v.icon}</div>
                <h4 className="display-font font-semibold mb-1.5">{v.title}</h4>
                <p className="text-xs text-[#4B5754] leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ navigateTo }) {
  const services = [
    { title: 'Commercial Office Cleaning', desc: 'Daily, weekly or fortnightly office servicing including workstation care, kitchens, restrooms and shared spaces.', icon: <BuildingIcon className="w-5 h-5" />, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' },
    { title: 'Residential Deep Cleaning', desc: 'Full-home deep cleans covering kitchens, bathrooms, living areas and glass surfaces.', icon: <HomeIcon className="w-5 h-5" />, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600' },
    { title: 'End of Lease Cleaning', desc: 'Bond-back guaranteed cleaning that covers every inspection point agents look for.', icon: <CheckCircleIcon className="w-5 h-5" />, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600' },
    { title: 'Carpet & Upholstery Steam Cleaning', desc: 'Deep steam extraction for carpets, sofas, curtains and mattresses.', icon: <DropletIcon className="w-5 h-5" />, img: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600' },
    { title: 'Post-Construction Cleaning', desc: 'Fine dust, paint splatter and cement residue removal so new builds are handover-ready.', icon: <HatIcon className="w-5 h-5" />, img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600' },
    { title: 'Window & Glass Cleaning', desc: 'Streak-free interior and exterior window cleaning for storefronts, offices and homes.', icon: <WindowIcon className="w-5 h-5" />, img: 'https://images.unsplash.com/photo-1527515545081-5db817172677?auto=format&fit=crop&q=80&w=600' },
  ];
  return (
    <div className="py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#4F7768] font-semibold uppercase tracking-wider text-xs">Our Solutions</span>
          <h2 className="display-font text-4xl font-bold mt-3 mb-4">Cleaning Services for Every Property</h2>
          <p className="text-[#4B5754]">Professional, insured and tailored cleaning solutions for homes, businesses and job sites across Perth.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv, idx) => (
            <Reveal key={idx} delay={(idx % 2) * 120}>
              <div className="flex flex-col sm:flex-row bg-white border border-[#1C2624]/8 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl card-hover group">
                <div className="sm:w-2/5 h-52 sm:h-auto overflow-hidden">
                  <img src={srv.img} alt={srv.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-[#E4D9C3]/60 text-[#4F7768] flex items-center justify-center mb-3 icon-spin-hover">{srv.icon}</div>
                    <h3 className="display-font text-lg font-semibold mb-2">{srv.title}</h3>
                    <p className="text-[#4B5754] text-sm leading-relaxed mb-4">{srv.desc}</p>
                  </div>
                  <button onClick={() => navigateTo('contact')} className="w-fit font-semibold text-sm hover:text-[#4F7768] transition-colors flex items-center gap-1.5 group/btn">
                    Book This Service <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

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
                <h3 className="display-font text-2xl font-bold text-[#9FC9BA] mb-4">SAP Trade PVT LTD</h3>
                <p className="text-[#B9AF9A] text-sm mb-8 leading-relaxed">
                  Reach out to our friendly team to discuss custom scheduling for your office, home or job site — we respond fast.
                </p>
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
                    <div><h5 className="font-semibold text-sm">ACN</h5><p className="text-xs text-[#B9AF9A] mt-0.5">629 776 469 (SAP Traders Pty Ltd)</p></div>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <h5 className="font-semibold text-sm mb-4 text-[#B9AF9A] uppercase tracking-widest text-xs">Follow Us</h5>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#4F7768] flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                      {s.icon}
                    </a>
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
                  <p className="text-[#4B5754] text-sm">Thanks for reaching out to SAP Trade PVT LTD — we'll be in touch shortly.</p>
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
                    <label className="block text-xs font-semibold uppercase text-[#4B5754] mb-1.5 tracking-wide">Message</label>
                    <textarea rows="4" placeholder="Tell us about your property and what you need cleaned..." className="w-full px-4 py-3 rounded-xl border border-[#1C2624]/15 focus:outline-none focus:ring-2 focus:ring-[#4F7768] text-sm bg-[#F7F5F0]/50 transition-shadow"></textarea>
                  </div>
                  <button type="submit" className="btn-shine w-full py-4 rounded-xl bg-[#1C2624] text-white font-semibold hover:bg-[#33544A] transition-colors">
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}