


// "use client";

// import React, { useState, useEffect } from 'react';
// import { Trophy, Package, Briefcase, ArrowRight, Star, Clock, Users, Shield, Hammer, Menu, X, Zap, TrendingUp, Moon, Sun, Mail, Phone, MapPin, LogIn, UserPlus, Youtube, Instagram, Facebook } from 'lucide-react';

// const AuctionLanding = () => {
//   const [activeSection, setActiveSection] = useState('home');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrollY, setScrollY] = useState(0);
//   const [currentPage, setCurrentPage] = useState('home');
//   const [theme, setTheme] = useState('dark'); // Theme state: 'dark' or 'light'

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
      
//       // Update active section based on scroll position
//       const sections = ['home', 'sports', 'products', 'jobs'];
//       const currentSection = sections.find(section => {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           return rect.top <= 100 && rect.bottom >= 100;
//         }
//         return false;
//       });
      
//       if (currentSection) {
//         setActiveSection(currentSection);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const toggleTheme = () => {
//     setTheme(prev => prev === 'dark' ? 'light' : 'dark');
//   };

//   const scrollToSection = (sectionId:any) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//     setIsMenuOpen(false);
//   };

//   const navigateToPage = (page:any) => {
//     setCurrentPage(page);
//   };

//   // Base classes for theme
//   const getThemeClasses = (darkClass:any, lightClass:any) => theme === 'dark' ? darkClass : lightClass;

//   // Home Page Component
//   const HomePage = () => (
//     <div className={`min-h-screen ${getThemeClasses('bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900', 'bg-gradient-to-br from-gray-100 via-purple-100 to-gray-100')} text-${getThemeClasses('white', 'black')}`}>
//       {/* Navigation */}
//       <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? getThemeClasses('bg-black/90 backdrop-blur-lg shadow-2xl', 'bg-white/90 backdrop-blur-lg shadow-2xl') : 'bg-transparent'}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             {/* Logo */}
//             <div 
//               className="flex items-center space-x-3 cursor-pointer"
//               onClick={() => navigateToPage('home')}
//             >
//               <div className={`w-12 h-12 ${getThemeClasses('bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500', 'bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300')} rounded-2xl flex items-center justify-center shadow-lg`}>
//                 <Hammer className={`w-7 h-7 ${getThemeClasses('text-white', 'text-black')}`} />
//               </div>
//               <div>
//                 <span className={`text-2xl font-bold ${getThemeClasses('bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent')}`}>
//                   AuctionHub
//                 </span>
//                 <div className={`text-xs ${getThemeClasses('text-gray-400', 'text-gray-600')} -mt-1`}>Premium Auctions</div>
//               </div>
//             </div>
            
//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               <button 
//                 onClick={() => scrollToSection('home')}
//                 className={`hover:${getThemeClasses('text-blue-400', 'text-blue-600')} transition-colors font-medium ${activeSection === 'home' ? getThemeClasses('text-blue-400', 'text-blue-600') : getThemeClasses('text-white', 'text-black')}`}
//               >
//                 Home
//               </button>
//               <button 
//                 onClick={() => scrollToSection('sports')}
//                 className={`hover:${getThemeClasses('text-cyan-400', 'text-cyan-600')} transition-colors font-medium ${activeSection === 'sports' ? getThemeClasses('text-cyan-400', 'text-cyan-600') : getThemeClasses('text-white', 'text-black')}`}
//               >
//                 Sports
//               </button>
//               <button 
//                 onClick={() => scrollToSection('products')}
//                 className={`hover:${getThemeClasses('text-pink-400', 'text-pink-600')} transition-colors font-medium ${activeSection === 'products' ? getThemeClasses('text-pink-400', 'text-pink-600') : getThemeClasses('text-white', 'text-black')}`}
//               >
//                 Products
//               </button>
//               <button 
//                 onClick={() => scrollToSection('jobs')}
//                 className={`hover:${getThemeClasses('text-orange-400', 'text-orange-600')} transition-colors font-medium ${activeSection === 'jobs' ? getThemeClasses('text-orange-400', 'text-orange-600') : getThemeClasses('text-white', 'text-black')}`}
//               >
//                 Jobs
//               </button>
//               <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700/50">
//                 {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>
//             </div>

//             {/* Mobile Menu */}
//             <button 
//               className="md:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {isMenuOpen && (
//           <div className={`${getThemeClasses('bg-black/95 backdrop-blur-lg border-t border-gray-700', 'bg-white/95 backdrop-blur-lg border-t border-gray-300')}`}>
//             <div className="px-4 py-4 space-y-2">
//               <button onClick={() => scrollToSection('home')} className={`block w-full text-left py-2 ${getThemeClasses('text-white hover:text-blue-400', 'text-black hover:text-blue-600')}`}>Home</button>
//               <button onClick={() => scrollToSection('sports')} className={`block w-full text-left py-2 ${getThemeClasses('text-white hover:text-cyan-400', 'text-black hover:text-cyan-600')}`}>Sports</button>
//               <button onClick={() => scrollToSection('products')} className={`block w-full text-left py-2 ${getThemeClasses('text-white hover:text-pink-400', 'text-black hover:text-pink-600')}`}>Products</button>
//               <button onClick={() => scrollToSection('jobs')} className={`block w-full text-left py-2 ${getThemeClasses('text-white hover:text-orange-400', 'text-black hover:text-orange-600')}`}>Jobs</button>
//               <button onClick={toggleTheme} className="block w-full text-left py-2 flex items-center space-x-2">
//                 {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//                 <span>Toggle Theme</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl md:text-7xl font-bold mb-6">
//               <span className={`${getThemeClasses('bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent')}`}>
//                 Welcome to
//               </span>
//               <br />
//               <span className={`${getThemeClasses('text-white', 'text-black')}`}>AuctionHub</span>
//             </h1>
//             <p className={`text-xl ${getThemeClasses('text-gray-300', 'text-gray-700')} max-w-3xl mx-auto mb-8 leading-relaxed`}>
//               Your ultimate destination for Sports Memorabilia, Product Marketplace, and Job Opportunities. 
//               Choose your auction adventure below!
//             </p>
//           </div>

//           {/* Quick Stats */}
//           <div className="flex justify-center items-center space-x-8 mb-16">
//             <div className="text-center">
//               <div className={`text-3xl font-bold ${getThemeClasses('text-blue-400', 'text-blue-600')}`}>15.2K</div>
//               <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>Active Users</div>
//             </div>
//             <div className={`w-px h-12 ${getThemeClasses('bg-gray-600', 'bg-gray-300')}`} />
//             <div className="text-center">
//               <div className={`text-3xl font-bold ${getThemeClasses('text-purple-400', 'text-purple-600')}`}>89</div>
//               <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>Live Auctions</div>
//             </div>
//             <div className={`w-px h-12 ${getThemeClasses('bg-gray-600', 'bg-gray-300')}`} />
//             <div className="text-center">
//               <div className={`text-3xl font-bold ${getThemeClasses('text-green-400', 'text-green-600')}`}>98.7%</div>
//               <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>Success Rate</div>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button 
//               onClick={() => scrollToSection('sports')}
//               className={`${getThemeClasses('bg-gradient-to-r from-blue-600 to-purple-600', 'bg-gradient-to-r from-blue-400 to-purple-400')} px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${getThemeClasses('text-white', 'text-black')}`}
//             >
//               <span>Explore Auctions</span>
//               <ArrowRight className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Sports Auction Section */}
//       <section id="sports" className={`py-20 px-4 sm:px-6 lg:px-8 ${getThemeClasses('bg-gradient-to-r from-blue-900/20 to-cyan-900/20', 'bg-gradient-to-r from-blue-100/20 to-cyan-100/20')} min-h-screen flex items-center`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="relative">
//               <div className={`absolute inset-0 ${getThemeClasses('bg-gradient-to-r from-blue-500/20 to-cyan-500/20', 'bg-gradient-to-r from-blue-300/20 to-cyan-300/20')} rounded-3xl blur-3xl`}></div>
//               <div className={`relative ${getThemeClasses('bg-gradient-to-br from-slate-800/90 to-blue-900/90 backdrop-blur-sm border border-blue-500/30', 'bg-gradient-to-br from-gray-200/90 to-blue-200/90 backdrop-blur-sm border border-blue-300/30')} rounded-3xl p-8`}>
//                 <div className={`w-16 h-16 ${getThemeClasses('bg-gradient-to-r from-blue-500 to-cyan-500', 'bg-gradient-to-r from-blue-300 to-cyan-300')} rounded-2xl flex items-center justify-center mb-6`}>
//                   <Trophy className={`w-8 h-8 ${getThemeClasses('text-white', 'text-black')}`} />
//                 </div>
                
//                 <h2 className="text-4xl font-bold mb-4">
//                   <span className={`${getThemeClasses('bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent')}`}>
//                     Sports Auctions
//                   </span>
//                 </h2>
                
//                 <p className={`text-lg mb-6 leading-relaxed ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//                   Discover authentic sports memorabilia, signed equipment, and rare collectibles from legendary athletes. 
//                   From vintage baseball cards to championship jerseys - find your treasure here.
//                 </p>

//                 <div className="space-y-4 mb-8">
//                   <div className="flex items-center space-x-3">
//                     <Shield className={`w-5 h-5 ${getThemeClasses('text-cyan-400', 'text-cyan-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>100% Authenticated Items</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Star className={`w-5 h-5 ${getThemeClasses('text-cyan-400', 'text-cyan-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Celebrity Memorabilia</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Users className={`w-5 h-5 ${getThemeClasses('text-cyan-400', 'text-cyan-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Live Bidding Events</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-8">
//                   <div className={`${getThemeClasses('bg-blue-500/10 border border-blue-500/30', 'bg-blue-200/10 border border-blue-300/30')} text-center p-4 rounded-xl`}>
//                     <div className={`text-2xl font-bold ${getThemeClasses('text-cyan-400', 'text-cyan-600')}`}>2,341</div>
//                     <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>Active Items</div>
//                   </div>
//                   <div className={`${getThemeClasses('bg-blue-500/10 border border-blue-500/30', 'bg-blue-200/10 border border-blue-300/30')} text-center p-4 rounded-xl`}>
//                     <div className={`text-2xl font-bold ${getThemeClasses('text-cyan-400', 'text-cyan-600')}`}>+15%</div>
//                     <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>This Week</div>
//                   </div>
//                 </div>

//                 <button 
//                   onClick={() => navigateToPage('sports')}
//                   className={`${getThemeClasses('bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-cyan-500/25', 'bg-gradient-to-r from-blue-400 to-cyan-400 hover:shadow-cyan-300/25')} w-full py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${getThemeClasses('text-white', 'text-black')}`}
//                 >
//                   <span>Get Started with Sports</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="hidden lg:block">
//               <div className="relative">
//                 <img 
//                   src="http://t3.gstatic.com/images?q=tbn:ANd9GcTwATxUzulG5cjvK1iTopZokfA6eMlmoDqnvm-ZrsVoGE6DeueDUQm2TzsOoYONPCx6oBluu3_J" 
//                   alt="Sports Equipment"
//                   className="rounded-3xl shadow-2xl"
//                 />
//                 <div className={`absolute inset-0 ${getThemeClasses('bg-gradient-to-t from-blue-900/50 to-transparent', 'bg-gradient-to-t from-blue-200/50 to-transparent')} rounded-3xl`}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Auction Section */}
//       <section id="products" className={`py-20 px-4 sm:px-6 lg:px-8 ${getThemeClasses('bg-gradient-to-r from-purple-900/20 to-pink-900/20', 'bg-gradient-to-r from-purple-100/20 to-pink-100/20')} min-h-screen flex items-center`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="hidden lg:block">
//               <div className="relative">
//                 <img 
//                   src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//                   alt="Luxury Products"
//                   className="rounded-3xl shadow-2xl"
//                 />
//                 <div className={`absolute inset-0 ${getThemeClasses('bg-gradient-to-t from-purple-900/50 to-transparent', 'bg-gradient-to-t from-purple-200/50 to-transparent')} rounded-3xl`}></div>
//               </div>
//             </div>

//             <div className="relative">
//               <div className={`absolute inset-0 ${getThemeClasses('bg-gradient-to-r from-purple-500/20 to-pink-500/20', 'bg-gradient-to-r from-purple-300/20 to-pink-300/20')} rounded-3xl blur-3xl`}></div>
//               <div className={`relative ${getThemeClasses('bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-sm border border-purple-500/30', 'bg-gradient-to-br from-gray-200/90 to-purple-200/90 backdrop-blur-sm border border-purple-300/30')} rounded-3xl p-8`}>
//                 <div className={`w-16 h-16 ${getThemeClasses('bg-gradient-to-r from-purple-500 to-pink-500', 'bg-gradient-to-r from-purple-300 to-pink-300')} rounded-2xl flex items-center justify-center mb-6`}>
//                   <Package className={`w-8 h-8 ${getThemeClasses('text-white', 'text-black')}`} />
//                 </div>
                
//                 <h2 className="text-4xl font-bold mb-4">
//                   <span className={`${getThemeClasses('bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent')}`}>
//                     Product Marketplace
//                   </span>
//                 </h2>
                
//                 <p className={`text-lg mb-6 leading-relaxed ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//                   Transform your unused treasures into cash! From vintage collectibles to modern electronics, 
//                   our marketplace connects sellers with eager bidders worldwide.
//                 </p>

//                 <div className="space-y-4 mb-8">
//                   <div className="flex items-center space-x-3">
//                     <Zap className={`w-5 h-5 ${getThemeClasses('text-pink-400', 'text-pink-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Easy Listing Process</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Shield className={`w-5 h-5 ${getThemeClasses('text-pink-400', 'text-pink-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Secure Payment System</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <TrendingUp className={`w-5 h-5 ${getThemeClasses('text-pink-400', 'text-pink-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Global Market Reach</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-8">
//                   <div className={`${getThemeClasses('bg-purple-500/10 border border-purple-500/30', 'bg-purple-200/10 border border-purple-300/30')} text-center p-4 rounded-xl`}>
//                     <div className={`text-2xl font-bold ${getThemeClasses('text-pink-400', 'text-pink-600')}`}>5,678</div>
//                     <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>Listed Products</div>
//                   </div>
//                   <div className={`${getThemeClasses('bg-purple-500/10 border border-purple-500/30', 'bg-purple-200/10 border border-purple-300/30')} text-center p-4 rounded-xl`}>
//                     <div className={`text-2xl font-bold ${getThemeClasses('text-pink-400', 'text-pink-600')}`}>+22%</div>
//                     <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>Sales Growth</div>
//                   </div>
//                 </div>

//                 <button 
//                   onClick={() => navigateToPage('products')}
//                   className={`${getThemeClasses('bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-pink-500/25', 'bg-gradient-to-r from-purple-400 to-pink-400 hover:shadow-pink-300/25')} w-full py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${getThemeClasses('text-white', 'text-black')}`}
//                 >
//                   <span>Get Started with Products</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Jobs Auction Section */}
//       <section id="jobs" className={`py-20 px-4 sm:px-6 lg:px-8 ${getThemeClasses('bg-gradient-to-r from-orange-900/20 to-red-900/20', 'bg-gradient-to-r from-orange-100/20 to-red-100/20')} min-h-screen flex items-center`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="relative">
//               <div className={`absolute inset-0 ${getThemeClasses('bg-gradient-to-r from-orange-500/20 to-red-500/20', 'bg-gradient-to-r from-orange-300/20 to-red-300/20')} rounded-3xl blur-3xl`}></div>
//               <div className={`relative ${getThemeClasses('bg-gradient-to-br from-slate-800/90 to-orange-900/90 backdrop-blur-sm border border-orange-500/30', 'bg-gradient-to-br from-gray-200/90 to-orange-200/90 backdrop-blur-sm border border-orange-300/30')} rounded-3xl p-8`}>
//                 <div className={`w-16 h-16 ${getThemeClasses('bg-gradient-to-r from-orange-500 to-red-500', 'bg-gradient-to-r from-orange-300 to-red-300')} rounded-2xl flex items-center justify-center mb-6`}>
//                   <Briefcase className={`w-8 h-8 ${getThemeClasses('text-white', 'text-black')}`} />
//                 </div>
                
//                 <h2 className="text-4xl font-bold mb-4">
//                   <span className={`${getThemeClasses('bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent')}`}>
//                     Work Opportunities
//                   </span>
//                 </h2>
                
//                 <p className={`text-lg mb-6 leading-relaxed ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//                   Revolutionary job marketplace where skills meet opportunity. Employers post projects, 
//                   freelancers bid competitively, creating the perfect match for every task.
//                 </p>

//                 <div className="space-y-4 mb-8">
//                   <div className="flex items-center space-x-3">
//                     <Star className={`w-5 h-5 ${getThemeClasses('text-orange-400', 'text-orange-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Skill-Based Matching</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Shield className={`w-5 h-5 ${getThemeClasses('text-orange-400', 'text-orange-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Quality Assurance</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Users className={`w-5 h-5 ${getThemeClasses('text-orange-400', 'text-orange-600')}`} />
//                     <span className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Fair Competitive Rates</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-8">
//                   <div className={`${getThemeClasses('bg-orange-500/10 border border-orange-500/30', 'bg-orange-200/10 border border-orange-300/30')} text-center p-4 rounded-xl`}>
//                     <div className={`text-2xl font-bold ${getThemeClasses('text-orange-400', 'text-orange-600')}`}>1,892</div>
//                     <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>Open Positions</div>
//                   </div>
//                   <div className={`${getThemeClasses('bg-orange-500/10 border border-orange-500/30', 'bg-orange-200/10 border border-orange-300/30')} text-center p-4 rounded-xl`}>
//                     <div className={`text-2xl font-bold ${getThemeClasses('text-orange-400', 'text-orange-600')}`}>+28%</div>
//                     <div className={`text-sm ${getThemeClasses('text-gray-400', 'text-gray-600')}`}>Job Matches</div>
//                   </div>
//                 </div>

//                 <button 
//                   onClick={() => navigateToPage('jobs')}
//                   className={`${getThemeClasses('bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-orange-500/25', 'bg-gradient-to-r from-orange-400 to-red-400 hover:shadow-orange-300/25')} w-full py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${getThemeClasses('text-white', 'text-black')}`}
//                 >
//                   <span>Get Started with Jobs</span>
//                   <ArrowRight className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <div className="hidden lg:block">
//               <div className="relative">
//                 <img 
//                   src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
//                   alt="Work Environment"
//                   className="rounded-3xl shadow-2xl"
//                 />
//                 <div className={`absolute inset-0 ${getThemeClasses('bg-gradient-to-t from-orange-900/50 to-transparent', 'bg-gradient-to-t from-orange-200/50 to-transparent')} rounded-3xl`}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Information Section */}
//       <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 ${getThemeClasses('bg-black/40', 'bg-gray-200/40')}`}>
//         <div className="max-w-7xl mx-auto">
//           <h2 className={`text-4xl font-bold text-center mb-12 ${getThemeClasses('text-white', 'text-black')}`}>Contact Us</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className={`flex items-center space-x-4 ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//               <Mail className="w-6 h-6" />
//               <span>support@auctionhub.com</span>
//             </div>
//             <div className={`flex items-center space-x-4 ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//               <Phone className="w-6 h-6" />
//               <span>+1 (555) 123-4567</span>
//             </div>
//             <div className={`flex items-center space-x-4 ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//               <MapPin className="w-6 h-6" />
//               <span>123 Auction Street, Bid City, USA</span>
//             </div>
//           </div>
//         </div>
//       </section>

//        {/* Footer */}
//        <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${getThemeClasses('bg-black/40 border-t border-white/10', 'bg-gray-200/40 border-t border-black/10')}`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center">
//             <div className="flex items-center justify-center space-x-3 mb-4">
//               <div className={`w-10 h-10 ${getThemeClasses('bg-gradient-to-r from-blue-500 to-purple-600', 'bg-gradient-to-r from-blue-300 to-purple-400')} rounded-xl flex items-center justify-center`}>
//                 <Hammer className={`w-6 h-6 ${getThemeClasses('text-white', 'text-black')}`} />
//               </div>
//               <span className={`text-2xl font-bold ${getThemeClasses('bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent')}`}>
//                 AuctionHub
//               </span>
//             </div>
//             <p className={`${getThemeClasses('text-gray-400', 'text-gray-600')}`}>&copy; 2025 AuctionHub. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>  

       
//     </div>
//   );

//   // Sports Landing Page
//   const SportsPage = () => (
//     <div className={`min-h-screen ${getThemeClasses('bg-gradient-to-br from-blue-900 via-cyan-900 to-slate-900 text-white', 'bg-gradient-to-br from-blue-100 via-cyan-100 to-gray-100 text-black')}`}>
//       {/* Sports Navigation */}
//       <nav className={`fixed w-full z-50 ${getThemeClasses('bg-black/90 backdrop-blur-lg shadow-2xl', 'bg-white/90 backdrop-blur-lg shadow-2xl')}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div 
//               className="flex items-center space-x-3 cursor-pointer"
//               onClick={() => navigateToPage('home')}
//             >
//               <div className={`w-10 h-10 ${getThemeClasses('bg-gradient-to-r from-blue-500 to-cyan-500', 'bg-gradient-to-r from-blue-300 to-cyan-300')} rounded-xl flex items-center justify-center`}>
//                 <Hammer className={`w-6 h-6 ${getThemeClasses('text-white', 'text-black')}`} />
//               </div>
//               <span className={`text-xl font-bold ${getThemeClasses('bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent')}`}>
//                 AuctionHub Sports
//               </span>
//             </div>
            
//             <div className="flex items-center space-x-4 ml-2 space-x-8">
//               {/* <span className={`font-medium ${getThemeClasses('text-cyan-400', 'text-cyan-600')}`}>Sports Auctions Only</span> */}
//               <button 
//                 onClick={() => navigateToPage('home')}
//                 className={`${getThemeClasses('bg-gradient-to-r  from-blue-600 to-cyan-600', 'bg-gradient-to-r from-blue-400 to-cyan-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all ${getThemeClasses('text-white', 'text-black')}`}
//               >
//                 Back to Home
//               </button>
//               <button className={`${getThemeClasses('bg-gradient-to-r  from-blue-600 to-cyan-600', 'bg-gradient-to-r from-blue-400 to-cyan-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-1 ${getThemeClasses('text-white', 'text-black')}`}>
//                 <LogIn className="w-4 h-4" />
//                 <span>Login/Register</span>
//               </button>
//               {/* <button className={`${getThemeClasses('bg-gradient-to-r from-blue-600 to-cyan-600', 'bg-gradient-to-r from-blue-400 to-cyan-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-1 ${getThemeClasses('text-white', 'text-black')}`}>
//                 <UserPlus className="w-4 h-4" />
//                 <span>Register</span>
//               </button> */}
//               <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700/50">
//                 {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="pt-24 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-bold mb-4">
//               <span className={`${getThemeClasses('bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent')}`}>
//                 Sports Auctions
//               </span>
//             </h1>
//             <p className={`text-xl ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Exclusive sports memorabilia and equipment auctions</p>
//           </div>

//           {/* Sample Sports Auctions */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { title: "Michael Jordan Jersey", price: "$8,500", time: "2d 14h", image: "🏀" },
//               { title: "Baseball Signed by Babe Ruth", price: "$12,000", time: "1d 8h", image: "⚾" },
//               { title: "Football Helmet - Tom Brady", price: "$3,200", time: "3d 22h", image: "🏈" },
//               { title: "Tennis Racket - Serena Williams", price: "$1,800", time: "18h", image: "🎾" },
//               { title: "Olympic Gold Medal Replica", price: "$950", time: "5d 2h", image: "🏅" },
//               { title: "Vintage Boxing Gloves", price: "$2,100", time: "12h", image: "🥊" }
//             ].map((item, index) => (
//               <div key={index} className={`${getThemeClasses('bg-blue-900/30 backdrop-blur-sm border border-blue-500/30 hover:border-cyan-400/50', 'bg-blue-100/30 backdrop-blur-sm border border-blue-300/30 hover:border-cyan-600/50')} rounded-2xl p-6 transition-all`}>
//                 <div className="text-6xl mb-4 text-center">{item.image}</div>
//                 <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//                 <div className="flex justify-between items-center mb-4">
//                   <span className={`text-2xl font-bold ${getThemeClasses('text-cyan-400', 'text-cyan-600')}`}>{item.price}</span>
//                   <div className={`flex items-center space-x-1 ${getThemeClasses('text-red-400', 'text-red-600')}`}>
//                     <Clock className="w-4 h-4" />
//                     <span className="text-sm">{item.time}</span>
//                   </div>
//                 </div>
//                 <button className={`${getThemeClasses('bg-gradient-to-r from-blue-600 to-cyan-600', 'bg-gradient-to-r from-blue-400 to-cyan-400')} w-full py-3 rounded-xl font-medium hover:shadow-lg transition-all ${getThemeClasses('text-white', 'text-black')}`}>
//                   Place Bid
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Advanced Features Section */}
//           <section className="mt-16">
//             <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeClasses('text-white', 'text-black')}`}>Advanced Features</h2>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className={`${getThemeClasses('bg-blue-900/30 border border-blue-500/30', 'bg-blue-100/30 border border-blue-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Real-time Bidding</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Bid in real-time with instant updates.</p>
//               </div>
//               <div className={`${getThemeClasses('bg-blue-900/30 border border-blue-500/30', 'bg-blue-100/30 border border-blue-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Filter by sport, era, and more.</p>
//               </div>
//               <div className={`${getThemeClasses('bg-blue-900/30 border border-blue-500/30', 'bg-blue-100/30 border border-blue-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Watchlist</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Track your favorite items.</p>
//               </div>
//             </div>
//           </section>

          
//         </div>
//       </div>
//     </div>
//   );

  

//   // Products Landing Page
//   const ProductsPage = () => (
//     <div className={`min-h-screen ${getThemeClasses('bg-gradient-to-br from-purple-900 via-pink-900 to-slate-900 text-white', 'bg-gradient-to-br from-purple-100 via-pink-100 to-gray-100 text-black')}`}>
//       <nav className={`fixed w-full z-50 ${getThemeClasses('bg-black/90 backdrop-blur-lg shadow-2xl', 'bg-white/90 backdrop-blur-lg shadow-2xl')}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div 
//               className="flex items-center space-x-3 cursor-pointer"
//               onClick={() => navigateToPage('home')}
//             >
//               <div className={`w-10 h-10 ${getThemeClasses('bg-gradient-to-r from-purple-500 to-pink-500', 'bg-gradient-to-r from-purple-300 to-pink-300')} rounded-xl flex items-center justify-center`}>
//                 <Hammer className={`w-6 h-6 ${getThemeClasses('text-white', 'text-black')}`} />
//               </div>
//               <span className={`text-xl font-bold ${getThemeClasses('bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent')}`}>
//                 AuctionHub Products
//               </span>
//             </div>
            
//             <div  className="hidden md:flex items-center space-x-8">
//               <span className={`font-medium ${getThemeClasses('text-pink-400', 'text-pink-600')}`}>Product Marketplace Only</span>
//               <button 
//                 onClick={() => navigateToPage('home')}
//                 className={`${getThemeClasses('bg-gradient-to-r from-purple-600 to-pink-600', 'bg-gradient-to-r from-purple-400 to-pink-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all ${getThemeClasses('text-white', 'text-black')}`}
//               >
//                 Back to Home
//               </button>
//               <button className={`${getThemeClasses('bg-gradient-to-r from-purple-600 to-pink-600', 'bg-gradient-to-r from-purple-400 to-pink-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-1 ${getThemeClasses('text-white', 'text-black')}`}>
//                 <LogIn className="w-4 h-4" />
//                 <span>Login/Register</span>
//               </button>
//               {/* <button className={`${getThemeClasses('bg-gradient-to-r from-purple-600 to-pink-600', 'bg-gradient-to-r from-purple-400 to-pink-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-1 ${getThemeClasses('text-white', 'text-black')}`}>
//                 <UserPlus className="w-4 h-4" />
//                 <span>Register</span>
//               </button> */}
//               <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700/50">
//                 {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="pt-24 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-bold mb-4">
//               <span className={`${getThemeClasses('bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent')}`}>
//                 Product Marketplace
//               </span>
//             </h1>
//             <p className={`text-xl ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Discover amazing products from sellers worldwide</p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { title: "Vintage Camera Collection", price: "$2,340", time: "1d 8h", image: "📷" },
//               { title: "Designer Handbag", price: "$890", time: "45m", image: "👜" },
//               { title: "Antique Pocket Watch", price: "$1,550", time: "2d 15h", image: "⌚" },
//               { title: "Rare Comic Book Set", price: "$1,200", time: "18h", image: "📚" },
//               { title: "Vintage Vinyl Records", price: "$650", time: "4d 12h", image: "💿" },
//               { title: "Art Painting Original", price: "$3,200", time: "6h", image: "🖼️" }
//             ].map((item, index) => (
//               <div key={index} className={`${getThemeClasses('bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 hover:border-pink-400/50', 'bg-purple-100/30 backdrop-blur-sm border border-purple-300/30 hover:border-pink-600/50')} rounded-2xl p-6 transition-all`}>
//                 <div className="text-6xl mb-4 text-center">{item.image}</div>
//                 <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//                 <div className="flex justify-between items-center mb-4">
//                   <span className={`text-2xl font-bold ${getThemeClasses('text-pink-400', 'text-pink-600')}`}>{item.price}</span>
//                   <div className={`flex items-center space-x-1 ${getThemeClasses('text-red-400', 'text-red-600')}`}>
//                     <Clock className="w-4 h-4" />
//                     <span className="text-sm">{item.time}</span>
//                   </div>
//                 </div>
//                 <button className={`${getThemeClasses('bg-gradient-to-r from-purple-600 to-pink-600', 'bg-gradient-to-r from-purple-400 to-pink-400')} w-full py-3 rounded-xl font-medium hover:shadow-lg transition-all ${getThemeClasses('text-white', 'text-black')}`}>
//                   Place Bid
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Advanced Features Section */}
//           <section className="mt-16">
//             <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeClasses('text-white', 'text-black')}`}>Advanced Features</h2>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className={`${getThemeClasses('bg-purple-900/30 border border-purple-500/30', 'bg-purple-100/30 border border-purple-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Category Filters</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Search by product type and condition.</p>
//               </div>
//               <div className={`${getThemeClasses('bg-purple-900/30 border border-purple-500/30', 'bg-purple-100/30 border border-purple-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Seller Ratings</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>View trusted seller profiles.</p>
//               </div>
//               <div className={`${getThemeClasses('bg-purple-900/30 border border-purple-500/30', 'bg-purple-100/30 border border-purple-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Shipping Integration</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Easy shipping calculations.</p>
//               </div>
//             </div>
//           </section>

//           {/* Contact Information */}
//           {/* <section className="mt-16">
//             <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeClasses('text-white', 'text-black')}`}>Contact Us</h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className={`flex items-center space-x-4 ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//                 <Mail className="w-6 h-6" />
//                 <span>support@auctionhub.com</span>
//               </div>
//               <div className={`flex items-center space-x-4 ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//                 <Phone className="w-6 h-6" />
//                 <span>+1 (555) 123-4567</span>
//               </div>
//               <div className={`flex items-center space-x-4 ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>
//                 <MapPin className="w-6 h-6" />
//                 <span>123 Auction Street, Bid City, USA</span>
//               </div>
//             </div>
//           </section> */}
//         </div>
//       </div>
//     </div>
//   );

//   // Jobs Landing Page
//   const JobsPage = () => (
//     <div className={`min-h-screen ${getThemeClasses('bg-gradient-to-br from-orange-900 via-red-900 to-slate-900 text-white', 'bg-gradient-to-br from-orange-100 via-red-100 to-gray-100 text-black')}`}>
//       <nav className={`fixed w-full z-50 ${getThemeClasses('bg-black/90 backdrop-blur-lg shadow-2xl', 'bg-white/90 backdrop-blur-lg shadow-2xl')}`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div 
//               className="flex items-center space-x-3 cursor-pointer"
//               onClick={() => navigateToPage('home')}
//             >
//               <div className={`w-10 h-10 ${getThemeClasses('bg-gradient-to-r from-orange-500 to-red-500', 'bg-gradient-to-r from-orange-300 to-red-300')} rounded-xl flex items-center justify-center`}>
//                 <Hammer className={`w-6 h-6 ${getThemeClasses('text-white', 'text-black')}`} />
//               </div>
//               <span className={`text-xl font-bold ${getThemeClasses('bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent')}`}>
//                 AuctionHub Jobs
//               </span>
//             </div>
            
//             <div className="flex items-center space-x-4 space-x-8">
//               <span className={`font-medium ${getThemeClasses('text-orange-400', 'text-orange-600')}`}>Work Opportunities Only</span>
//               <button 
//                 onClick={() => navigateToPage('home')}
//                 className={`${getThemeClasses('bg-gradient-to-r from-orange-600 to-red-600', 'bg-gradient-to-r from-orange-400 to-red-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all ${getThemeClasses('text-white', 'text-black')}`}
//               >
//                 Back to Home
//               </button>
//               <button className={`${getThemeClasses('bg-gradient-to-r from-orange-600 to-red-600', 'bg-gradient-to-r from-orange-400 to-red-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-1 ${getThemeClasses('text-white', 'text-black')}`}>
//                 <LogIn className="w-4 h-4" />
//                 <span>Login/Register</span>
//               </button>
//               {/* <button className={`${getThemeClasses('bg-gradient-to-r from-orange-600 to-red-600', 'bg-gradient-to-r from-orange-400 to-red-400')} px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-1 ${getThemeClasses('text-white', 'text-black')}`}>
//                 <UserPlus className="w-4 h-4" />
//                 <span>Register</span>
//               </button> */}
//               <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700/50">
//                 {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="pt-24 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h1 className="text-5xl font-bold mb-4">
//               <span className={`${getThemeClasses('bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent', 'bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent')}`}>
//                 Work Opportunities
//               </span>
//             </h1>
//             <p className={`text-xl ${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Bid on projects and find your next opportunity</p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { title: "Senior React Developer", price: "$95,000", time: "3d 22h", image: "💻", type: "Full-time" },
//               { title: "Logo Design Project", price: "$450", time: "2d 8h", image: "🎨", type: "Freelance" },
//               { title: "Mobile App Development", price: "$12,000", time: "5d 14h", image: "📱", type: "Contract" },
//               { title: "Content Writer Position", price: "$35/hr", time: "1d 6h", image: "✍️", type: "Remote" },
//               { title: "Data Analyst Role", price: "$78,000", time: "4d 10h", image: "📊", type: "Full-time" },
//               { title: "Social Media Manager", price: "$42,000", time: "2d 18h", image: "📢", type: "Part-time" }
//             ].map((item, index) => (
//               <div key={index} className={`${getThemeClasses('bg-orange-900/30 backdrop-blur-sm border border-orange-500/30 hover:border-red-400/50', 'bg-orange-100/30 backdrop-blur-sm border border-orange-300/30 hover:border-red-600/50')} rounded-2xl p-6 transition-all`}>
//                 <div className="flex justify-between items-start mb-4">
//                   <div className="text-4xl">{item.image}</div>
//                   <span className={`${getThemeClasses('bg-orange-500/20 text-orange-300 border border-orange-500/30', 'bg-orange-200/20 text-orange-700 border border-orange-300/30')} px-2 py-1 text-xs rounded-full`}>
//                     {item.type}
//                   </span>
//                 </div>
//                 <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
//                 <div className="flex justify-between items-center mb-4">
//                   <span className={`text-2xl font-bold ${getThemeClasses('text-orange-400', 'text-orange-600')}`}>{item.price}</span>
//                   <div className={`flex items-center space-x-1 ${getThemeClasses('text-red-400', 'text-red-600')}`}>
//                     <Clock className="w-4 h-4" />
//                     <span className="text-sm">{item.time}</span>
//                   </div>
//                 </div>
//                 <button className={`${getThemeClasses('bg-gradient-to-r from-orange-600 to-red-600', 'bg-gradient-to-r from-orange-400 to-red-400')} w-full py-3 rounded-xl font-medium hover:shadow-lg transition-all ${getThemeClasses('text-white', 'text-black')}`}>
//                   Apply Now
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Advanced Features Section */}
//           <section className="mt-16">
//             <h2 className={`text-3xl font-bold text-center mb-8 ${getThemeClasses('text-white', 'text-black')}`}>Advanced Features</h2>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className={`${getThemeClasses('bg-orange-900/30 border border-orange-500/30', 'bg-orange-100/30 border border-orange-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Skill Matching AI</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>AI-powered job recommendations.</p>
//               </div>
//               <div className={`${getThemeClasses('bg-orange-900/30 border border-orange-500/30', 'bg-orange-100/30 border border-orange-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Bid Analytics</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Track bid history and trends.</p>
//               </div>
//               <div className={`${getThemeClasses('bg-orange-900/30 border border-orange-500/30', 'bg-orange-100/30 border border-orange-300/30')} p-6 rounded-2xl`}>
//                 <h3 className="text-xl font-semibold mb-2">Portfolio Upload</h3>
//                 <p className={`${getThemeClasses('text-gray-300', 'text-gray-700')}`}>Showcase your work easily.</p>
//               </div>
//             </div>
//           </section>

         
//         </div>
//       </div>
//     </div>
//   );

//   // Render current page
//   return (
//     <div>
//       {currentPage === 'home' && <HomePage />}
//       {currentPage === 'sports' && <SportsPage />}
//       {currentPage === 'products' && <ProductsPage />}
//       {currentPage === 'jobs' && <JobsPage />}
//     </div>
//   );
// };

// export default AuctionLanding;

"use client";
import React, { useState } from "react";
import Navbar from "@/components/AuctionHubLanding/AuctionNavbar";
import HeroSection from "@/components/AuctionHubLanding/HeroSection";
import SportAuctionSection from "@/components/AuctionHubLanding/SportAuctionSection";
import ProductAuctionSection from "@/components/AuctionHubLanding/ProductAuctionSection";
import JobAuctionSection from "@/components/AuctionHubLanding/JobAuctionSection";
import ContactSection from "@/components/AuctionHubLanding/ContactSection";
import Footer from "@/components/AuctionHubLanding/Footer";

// 👇 Import your landing pages
import SportLandingPage from "@/components/AuctionsLandingPages/SportLandingPage"
import ProductLandingPage from "@/components/AuctionsLandingPages/ProductLandingPage";
import JobLandingPage from "@/components/AuctionsLandingPages/JobLandingPage";

const AuctionLanding = () => {
  const [theme, setTheme] = useState("dark");
  const [currentPage, setCurrentPage] = useState("home"); // ✅ Track current page

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));
  const getThemeClasses = (darkClass: string, lightClass: string) =>
    theme === "dark" ? darkClass : lightClass;

  // Scroll helper for sections (only used on home page)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Page navigation function
  const navigateToPage = (page: string) => {
    setCurrentPage(page);
  };

  // ✅ Conditional Rendering
  if (currentPage === "sports") {
    return (
      <SportLandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        getThemeClasses={getThemeClasses}
        navigateToPage={navigateToPage}
      />
    );
  }

  if (currentPage === "products") {
    return (
      <ProductLandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        getThemeClasses={getThemeClasses}
        navigateToPage={navigateToPage}
      />
    );
  }

  if (currentPage === "jobs") {
    return (
      <JobLandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        getThemeClasses={getThemeClasses}
        navigateToPage={navigateToPage}
      />
    );
  }

  // ✅ Default Home Page
  return (
    <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        scrollToSection={scrollToSection}
        navigateToPage={navigateToPage}
        getThemeClasses={getThemeClasses}
      />
      <HeroSection scrollToSection={scrollToSection} getThemeClasses={getThemeClasses} />
      <SportAuctionSection navigateToPage={navigateToPage} getThemeClasses={getThemeClasses} />
      <ProductAuctionSection navigateToPage={navigateToPage} getThemeClasses={getThemeClasses} />
      <JobAuctionSection navigateToPage={navigateToPage} getThemeClasses={getThemeClasses} />
      <ContactSection getThemeClasses={getThemeClasses} />
      <Footer getThemeClasses={getThemeClasses} />
    </div>
  );
};

export default AuctionLanding;
