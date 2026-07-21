import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Menu, 
  X,
  ArrowRight,
  Award,
  Users,
  Building2,
  Check
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigateTo('home')}
          >
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-sky-600 via-sky-500 to-emerald-400 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-sky-800 via-sky-600 to-emerald-500 bg-clip-text text-transparent">
                SAP TRADE
              </span>
              <span className="block text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                PVT LTD • CLEANING SERVICES
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact Us' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`transition-all duration-200 relative py-1 hover:text-sky-600 ${
                  currentPage === item.id ? 'text-sky-600 font-bold' : 'text-slate-600'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.span 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full" 
                  />
                )}
              </button>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('contact')} 
              className="ml-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 text-white font-semibold shadow-lg shadow-sky-500/20 hover:shadow-emerald-500/30 transition-all"
            >
              Book Now
            </motion.button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-100" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-7 h-7 text-sky-600" /> : <Menu className="w-7 h-7 text-slate-700" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-100 px-6 pt-3 pb-6 space-y-3 shadow-xl"
            >
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Services' },
                { id: 'contact', label: 'Contact Us' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => navigateTo(item.id)} 
                  className={`block w-full text-left py-2 text-base font-semibold ${currentPage === item.id ? 'text-sky-600' : 'text-slate-700'}`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => navigateTo('contact')}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-500 text-white font-bold text-center shadow-md"
              >
                Book Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Pages Router */}
      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomePage navigateTo={navigateTo} />
            </motion.div>
          )}
          {currentPage === 'about' && (
            <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <AboutPage navigateTo={navigateTo} />
            </motion.div>
          )}
          {currentPage === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ServicesPage navigateTo={navigateTo} />
            </motion.div>
          )}
          {currentPage === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800/80 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-400 text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-wider">SAP TRADE PVT LTD</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leading Sri Lanka in commercial, residential, and industrial eco-friendly cleaning services. Engineered for perfection.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-emerald-400 tracking-wide text-sm uppercase">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {['home', 'about', 'services', 'contact'].map((pg) => (
                <li key={pg}>
                  <button onClick={() => navigateTo(pg)} className="capitalize text-slate-400 hover:text-sky-400 transition-colors">
                    {pg === 'home' ? 'Home Overview' : pg === 'about' ? 'About Our Team' : pg === 'services' ? 'Our Services' : 'Get In Touch'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-emerald-400 tracking-wide text-sm uppercase">Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Commercial Office Care</li>
              <li>Residential Deep Clean</li>
              <li>Upholstery & Steam Wash</li>
              <li>Post-Construction Sanitation</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-emerald-400 tracking-wide text-sm uppercase">Contact Info</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" /> Colombo & Western Province, LK</li>
              <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-emerald-400 shrink-0" /> +94 11 234 5678</li>
              <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-sky-400 shrink-0" /> info@saptrade.lk</li>
            </ul>
          </div>
        </div>

        {/* Developer Credit Line */}
        <div className="border-t border-slate-900 pt-8 text-center text-xs text-slate-500 relative z-10">
          <p>© {new Date().getFullYear()} SAP Trade PVT LTD. All rights reserved.</p>
          <p className="mt-2 text-slate-400 font-medium">
            Developed and Designed by <span className="text-emerald-400 font-bold tracking-wide">Vexel IT</span> by <span className="text-sky-400 font-bold tracking-wide">Kavizz</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

// Hero Slideshow with Images & Motion
function HeroSlider({ navigateTo }) {
  const slides = [
    {
      title: "Pristine Spaces, Unmatched Cleanliness",
      subtitle: "Professional commercial and residential cleaning engineered for perfection by SAP Trade PVT LTD.",
      badge: "Ocean Blue & Eco Green Excellence",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1600"
    },
    {
      title: "Eco-Friendly Technology & Pure Hygiene",
      subtitle: "Safe for children, pets, and workplace safety without compromising on sparkling results.",
      badge: "100% Non-Toxic Solutions",
      img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=1600"
    },
    {
      title: "Trusted Corporate & Industrial Care",
      subtitle: "Customized schedules, certified staff, and high-capacity equipment for your corporate spaces.",
      badge: "ISO Standard Quality",
      img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1600"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[600px] md:h-[680px] overflow-hidden bg-slate-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Dark Gradient Overlay */}
          <img src={slides[current].img} alt="Cleaning" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          {/* Slide Text Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="max-w-2xl"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md mb-6">
                  <Sparkles className="w-3.5 h-3.5" /> {slides[current].badge}
                </span>
                <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight mb-6">
                  {slides[current].title}
                </h1>
                <p className="text-lg text-slate-300 mb-8 font-normal leading-relaxed">
                  {slides[current].subtitle}
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateTo('contact')}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-black shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition"
                  >
                    Get Free Quote
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateTo('services')}
                    className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold transition"
                  >
                    Explore Services
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <button 
        onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/10 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md border border-white/10 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === current ? 'bg-gradient-to-r from-sky-400 to-emerald-400 w-10' : 'bg-white/30 w-2.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Main Home Page Component
function HomePage({ navigateTo }) {
  return (
    <div>
      <HeroSlider navigateTo={navigateTo} />

      {/* Feature Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-7 h-7 text-sky-600" />,
                title: "100% Quality Assurance",
                desc: "Certified cleaning methods and strict quality checks ensure immaculate surfaces every time.",
                bg: "bg-sky-50/70 border-sky-100"
              },
              {
                icon: <Sparkles className="w-7 h-7 text-emerald-600" />,
                title: "Eco Ocean & Green Care",
                desc: "Biodegradable, non-toxic products safe for employees, families, pets, and the environment.",
                bg: "bg-emerald-50/70 border-emerald-100"
              },
              {
                icon: <Clock className="w-7 h-7 text-teal-600" />,
                title: "Flexible Scheduling",
                desc: "24/7 dispatch available to suit commercial after-hours or residential weekend slots.",
                bg: "bg-teal-50/70 border-teal-100"
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-8 rounded-3xl border ${item.bg} shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div className="p-4 bg-white rounded-2xl w-fit shadow-md mb-6">{item.icon}</div>
                <h3 className="text-xl font-extrabold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Image Showcase Section */}
      <section className="py-20 bg-slate-100/60 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-sky-600 font-bold uppercase tracking-widest text-xs">Transforming Workspaces</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2">Before & After Excellence</h2>
            </div>
            <button 
              onClick={() => navigateTo('services')} 
              className="mt-4 md:mt-0 font-bold text-sky-600 hover:text-emerald-600 flex items-center gap-2 group transition"
            >
              View all services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Corporate Offices", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" },
              { title: "Residential Deep Cleaning", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800" },
              { title: "Floor & Carpet Restoration", img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800" },
            ].map((imgCard, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-lg h-80 group cursor-pointer"
                onClick={() => navigateTo('services')}
              >
                <img src={imgCard.img} alt={imgCard.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h4 className="text-xl font-bold">{imgCard.title}</h4>
                  <p className="text-xs text-emerald-400 mt-1 font-medium">SAP Trade Professional Standards</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// About Page Section
function AboutPage({ navigateTo }) {
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 font-bold uppercase tracking-wider text-xs">Who We Are</span>
          <h2 className="text-4xl font-black text-slate-900 mt-2 mb-4">SAP Trade PVT LTD</h2>
          <p className="text-slate-600 leading-relaxed">
            Delivering trusted hygiene, eco-conscious cleaning, and high-standard facility care for residential, commercial, and industrial properties across Sri Lanka.
          </p>
        </div>

        {/* Content with Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold text-slate-900">Dedicated To Squeaky Clean Results</h3>
            <p className="text-slate-600 leading-relaxed">
              Founded on the values of integrity, safety, and modern precision, SAP Trade PVT LTD blends eco-friendly cleaning technology with rigorously trained cleaning specialists.
            </p>
            <div className="space-y-3">
              {[
                "ISO Standards Compliant Cleaning Procedures",
                "Fully Vetted and Trained Professional Staff",
                "Eco-Friendly Non-Toxic Detergents",
                "Tailored Plans for Office Buildings & Homes"
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-700 font-semibold text-sm">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-600"><Check className="w-4 h-4" /></div>
                  {feat}
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigateTo('contact')}
              className="px-8 py-3.5 rounded-full bg-sky-600 text-white font-bold hover:bg-sky-700 transition shadow-lg shadow-sky-600/20"
            >
              Contact Our Management
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-md h-64 w-full object-cover" alt="Cleaning Staff" />
            <img src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-md h-64 w-full object-cover mt-8" alt="Sanitization" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Services Page Section
function ServicesPage({ navigateTo }) {
  const services = [
    {
      title: "Commercial Office Cleaning",
      desc: "Comprehensive daily/weekly office sanitization, workstation polishing, floor care, and restroom hygiene.",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Residential Deep Clean",
      desc: "Complete house and apartment deep cleaning including kitchens, bathrooms, glass, and living spaces.",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Upholstery & Sofa Shampoo",
      desc: "Deep steam extraction cleaning for couches, carpets, curtains, and mattresses removing stains and allergens.",
      img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Post-Construction Clean",
      desc: "Thorough removal of fine dust, paint splatters, cement residue, and debris for new developments.",
      img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Our Solutions</span>
          <h2 className="text-4xl font-black text-slate-900 mt-2 mb-4">Premium Service Offerings</h2>
          <p className="text-slate-600">Explore our professional solutions tailored for residential and corporate needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6 }}
              className="flex flex-col sm:flex-row bg-slate-50 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <img src={srv.img} alt={srv.title} className="sm:w-2/5 h-56 sm:h-auto object-cover" />
              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{srv.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{srv.desc}</p>
                </div>
                <button 
                  onClick={() => navigateTo('contact')}
                  className="w-fit font-bold text-sm text-sky-600 hover:text-emerald-600 transition flex items-center gap-1"
                >
                  Book Service <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Contact Page Section
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky-600 font-bold uppercase tracking-wider text-xs">Get In Touch</span>
          <h2 className="text-4xl font-black text-slate-900 mt-2">Request Your Instant Quote</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Company Details */}
          <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 p-10 rounded-3xl text-white flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-3xl font-black text-emerald-400 mb-4">SAP Trade PVT LTD</h3>
              <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                Reach out to our friendly dispatch team today to discuss custom corporate scheduling or home deep cleans.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl text-emerald-400"><MapPin className="w-6 h-6" /></div>
                  <div>
                    <h5 className="font-bold">Headquarters</h5>
                    <p className="text-xs text-slate-300 mt-0.5">Colombo & Western Province, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl text-sky-400"><Phone className="w-6 h-6" /></div>
                  <div>
                    <h5 className="font-bold">Hotline</h5>
                    <p className="text-xs text-slate-300 mt-0.5">+94 11 234 5678 / +94 77 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl text-emerald-400"><Mail className="w-6 h-6" /></div>
                  <div>
                    <h5 className="font-bold">Email</h5>
                    <p className="text-xs text-slate-300 mt-0.5">info@saptrade.lk</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Quote Request Sent!</h3>
                <p className="text-slate-600 text-sm">Thank you for reaching out to SAP Trade PVT LTD. We will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Phone Number</label>
                    <input required type="tel" placeholder="+94 7X XXX XXXX" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Message</label>
                  <textarea rows="4" placeholder="Tell us about your cleaning space..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"></textarea>
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 text-white font-bold hover:opacity-95 shadow-lg transition">
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}