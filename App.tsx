import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Instagram, Facebook, Star, Clock, Car, UtensilsCrossed } from 'lucide-react';
import { MenuSection } from './components/MenuSection';
import { ReservationModal } from './components/ReservationModal';
import { User, Review } from './types';
import { REVIEWS, LOGO_SRC } from './constants';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleReservation = () => setIsReservationOpen(!isReservationOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-shastra-maroon selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src={LOGO_SRC} alt="Shastra Logo" className="w-10 h-10 rounded-lg shadow-sm" />
            <div>
              <h1 className={`font-serif text-xl md:text-2xl font-bold leading-none ${isScrolled ? 'text-shastra-maroon' : 'text-white'}`}>SHASTRA</h1>
              <span className={`text-[10px] tracking-widest uppercase block ${isScrolled ? 'text-shastra-dark' : 'text-white/80'}`}>Veg Restaurant</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Menu', 'Gallery', 'Location'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium tracking-wide hover:text-shastra-gold transition-colors uppercase ${isScrolled ? 'text-shastra-dark' : 'text-white'}`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={toggleReservation}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all transform hover:scale-105 ${
                isScrolled 
                ? 'bg-shastra-maroon text-white shadow-md' 
                : 'bg-white text-shastra-maroon shadow-lg'
              }`}
            >
              Reserve a Table
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden relative z-50 p-2">
            {isMobileMenuOpen ? <X size={28} className="text-shastra-dark" /> : <Menu size={28} className={isScrolled ? 'text-shastra-dark' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white flex flex-col pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-200">
          {['Home', 'About', 'Menu', 'Gallery', 'Location'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-2xl font-serif text-shastra-maroon mb-6 border-b border-gray-100 pb-2 text-left"
            >
              {item}
            </button>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              toggleReservation();
            }}
            className="mt-4 w-full py-4 bg-shastra-maroon text-white rounded-xl font-bold text-lg shadow-xl"
          >
            Book a Table
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="South Indian Fine Dining" 
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white mt-16">
          <div className="inline-block border border-shastra-gold/50 px-4 py-1 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-shastra-gold text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">New in Mogappair West</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight drop-shadow-2xl">
            Taste of <span className="text-transparent bg-clip-text bg-gradient-to-r from-shastra-gold to-amber-200">Tradition</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Authentic South Indian vegetarian cuisine served in a vintage, royal ambience. Experience the finest Benne Dosa and Signature Biryanis.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button onClick={() => scrollToSection('menu')} className="px-8 py-4 bg-shastra-gold text-shastra-maroon rounded-full font-bold text-lg hover:bg-white transition-colors shadow-lg shadow-shastra-gold/20">
              View Menu
            </button>
            <button onClick={toggleReservation} className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 backdrop-blur-sm transition-colors">
              Book a Table
            </button>
          </div>
        </div>
      </section>

      {/* About & Highlights */}
      <section id="about" className="py-20 bg-shastra-cream scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
               <div className="relative">
                 <img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Restaurant Interior" className="rounded-2xl shadow-2xl z-10 relative" />
                 <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-shastra-maroon rounded-2xl -z-0 hidden md:block"></div>
                 <div className="absolute -top-6 -left-6 w-48 h-48 border-2 border-shastra-gold rounded-full -z-0 hidden md:block"></div>
               </div>
            </div>
            <div className="md:w-1/2">
              <h4 className="text-shastra-maroon font-sans font-bold uppercase tracking-widest text-sm mb-2">Our Story</h4>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-shastra-dark mb-6">Vintage Charm, <br/> Modern Hospitality</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nestled in the heart of Mogappair West, Shastra Veg Restaurant brings you the soulful flavors of South India. Our culinary journey is rooted in tradition, using authentic spices and time-honored recipes.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div className="flex gap-3 items-start">
                    <Car className="text-shastra-maroon shrink-0" />
                    <div>
                      <h5 className="font-serif font-bold text-lg">Valet Parking</h5>
                      <p className="text-xs text-gray-500">Hassle-free parking for 4-wheelers</p>
                    </div>
                 </div>
                 <div className="flex gap-3 items-start">
                    <Clock className="text-shastra-maroon shrink-0" />
                    <div>
                      <h5 className="font-serif font-bold text-lg">Vintage Ambience</h5>
                      <p className="text-xs text-gray-500">Royal South Indian interiors</p>
                    </div>
                 </div>
                 <div className="flex gap-3 items-start">
                    <UtensilsCrossed className="text-shastra-maroon shrink-0" />
                    <div>
                      <h5 className="font-serif font-bold text-lg">Pure Veg</h5>
                      <p className="text-xs text-gray-500">100% Vegetarian Kitchen</p>
                    </div>
                 </div>
                 <div className="flex gap-3 items-start">
                    <Star className="text-shastra-maroon shrink-0" />
                    <div>
                      <h5 className="font-serif font-bold text-lg">Signatures</h5>
                      <p className="text-xs text-gray-500">Benne Dosa & Biryanis</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Grid */}
      <section className="py-20 bg-shastra-maroon text-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-serif mb-4">Chef's Signatures</h2>
             <p className="text-white/70 max-w-xl mx-auto">Dishes that define the Shastra experience. Highly recommended by our patrons.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { name: 'Benne Masala Dosa', img: 'https://images.unsplash.com/photo-1668236543090-d2f8969463d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', desc: 'Crispy, buttery goodness from Bangalore' },
               { name: 'Mushroom Biryani', img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', desc: 'Aromatic Seeraga Samba spice blend' },
               { name: 'Coin Parotta', img: 'https://images.unsplash.com/photo-1662459288122-c23f14b62283?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', desc: 'Flaky, layered mini parottas' },
               { name: 'Filter Coffee', img: 'https://images.unsplash.com/photo-1596952670231-18e3848b598d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', desc: 'The perfect finish to your meal' }
             ].map((dish, i) => (
               <div key={i} className="group relative overflow-hidden rounded-xl h-80 shadow-2xl cursor-pointer">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-serif font-bold text-shastra-gold mb-1">{dish.name}</h3>
                    <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{dish.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Main Menu Component */}
      <MenuSection />

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white scroll-mt-20">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h4 className="text-shastra-gold font-sans font-semibold tracking-widest uppercase text-sm mb-2">Ambience & Interiors</h4>
               <h2 className="text-4xl md:text-5xl font-serif text-shastra-maroon font-medium">A Visual Feast</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96 md:h-[500px]">
               <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl group">
                  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Restaurant Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
               </div>
               <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group">
                  <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Authentic Dining" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               </div>
               <div className="col-span-1 row-span-1 relative overflow-hidden rounded-2xl group">
                  <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Details" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               </div>
               <div className="col-span-2 row-span-1 relative overflow-hidden rounded-2xl group">
                  <img src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Elegant Seating" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               </div>
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-shastra-sand/30 scroll-mt-20">
         <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif text-center text-shastra-maroon mb-12">Words from our Guests</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {REVIEWS.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-xl shadow-lg border border-shastra-maroon/5 w-full md:w-80">
                   <div className="flex gap-1 text-shastra-gold mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                      ))}
                   </div>
                   <p className="text-gray-600 italic mb-6 text-sm leading-relaxed">"{review.comment}"</p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-shastra-maroon/10 rounded-full flex items-center justify-center text-shastra-maroon font-bold font-serif">
                        {review.name[0]}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-shastra-dark">{review.name}</h5>
                        <p className="text-[10px] uppercase tracking-wide text-gray-400">{review.source}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* Location & Footer */}
      <footer id="location" className="bg-shastra-dark text-white pt-20 pb-10 scroll-mt-20">
         <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 mb-16">
               <div className="md:w-1/3">
                  <div className="flex items-center gap-2 mb-6">
                    <img src={LOGO_SRC} alt="Shastra Logo" className="w-8 h-8 rounded" />
                    <span className="text-2xl font-serif font-bold">SHASTRA</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    A premium vegetarian culinary destination blending traditional flavors with modern elegance.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-shastra-gold hover:text-shastra-maroon transition-all"><Instagram size={20} /></a>
                     <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-shastra-gold hover:text-shastra-maroon transition-all"><Facebook size={20} /></a>
                  </div>
               </div>
               
               <div className="md:w-1/3">
                  <h4 className="text-shastra-gold font-serif text-xl mb-6">Visit Us</h4>
                  <ul className="space-y-4 text-gray-300">
                     <li className="flex gap-3">
                        <MapPin className="shrink-0 text-shastra-gold" size={20} />
                        <span>Mogappair West / Nolambur,<br/>Chennai, Tamil Nadu</span>
                     </li>
                     <li className="flex gap-3">
                        <Phone className="shrink-0 text-shastra-gold" size={20} />
                        <span>+91 98765 43210</span>
                     </li>
                     <li className="flex gap-3">
                        <Clock className="shrink-0 text-shastra-gold" size={20} />
                        <div>
                           <p>Mon - Sun: 7:00 AM - 11:00 PM</p>
                           <p className="text-xs text-gray-500 mt-1">Valet Parking Available</p>
                        </div>
                     </li>
                  </ul>
               </div>

               <div className="md:w-1/3">
                  <h4 className="text-shastra-gold font-serif text-xl mb-6">Locate Us</h4>
                  <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden relative">
                     {/* Placeholder map since we don't have a real API key for the snippet */}
                     <iframe 
                       src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.071687649563!2d80.1764!3d13.0858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzA4LjkiTiA4MMKwMTAnMzUuMCJF!5e0!3m2!1sen!2sin!4v1635764000000!5m2!1sen!2sin" 
                       width="100%" 
                       height="100%" 
                       style={{ border: 0 }} 
                       allowFullScreen 
                       loading="lazy"
                       title="Google Map"
                       className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                     ></iframe>
                  </div>
               </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
               <p>&copy; {new Date().getFullYear()} Shastra Veg Restaurant. All rights reserved.</p>
               <div className="flex gap-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white">Privacy Policy</a>
                  <a href="#" className="hover:text-white">Terms of Service</a>
               </div>
            </div>
         </div>
      </footer>

      {/* Reservation Modal - Conditionally rendered to reset state on open/close */}
      {isReservationOpen && (
        <ReservationModal 
          isOpen={isReservationOpen} 
          onClose={toggleReservation} 
          user={user}
          onLogin={setUser}
        />
      )}
    </div>
  );
};

export default App;