import React, { useState, useEffect } from 'react';
import { Target, Scroll, Star, BookOpen, Sun, Moon, Search, X } from 'lucide-react';

interface NavigationProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const links = [
  { id: 'active-achievements', label: 'Active', icon: Target, color: 'text-emerald-400' },
  { id: 'retired-badges', label: 'Retired', icon: Scroll, color: 'text-amber-400' },
  { id: 'profile-highlights', label: 'Program', icon: Star, color: 'text-purple-400' },
  { id: 'guides', label: 'Guides', icon: BookOpen, color: 'text-blue-400' },
];

const Navigation: React.FC<NavigationProps> = ({ searchTerm, onSearchChange }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-github-dark/80 backdrop-blur-xl border-b border-github-border/50 shadow-lg shadow-black/20' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo / Title Area */}
          <div className={`flex-shrink-0 flex items-center ${isSearchOpen ? 'hidden sm:flex' : 'flex'}`}>
            <span className="text-2xl mr-2 animate-bounce">🏆</span>
            <span className="font-bold text-github-light hidden md:block tracking-tight text-lg">
              GitHub <span className="text-github-accent">Badges</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className={`flex items-center overflow-x-auto no-scrollbar flex-1 ${isSearchOpen ? 'hidden md:flex' : 'flex'} mr-2`}>
            <nav className="flex space-x-1 sm:space-x-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-github-muted hover:text-github-light hover:bg-white/5 transition-all whitespace-nowrap"
                >
                  <link.icon className={`mr-2 h-4 w-4 ${link.color} group-hover:scale-110 transition-transform duration-300`} />
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className={`flex-1 max-w-md ${isSearchOpen ? 'flex' : 'hidden md:flex'}`}>
             <div className="relative w-full group">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-github-muted group-focus-within:text-github-accent transition-colors" />
               </div>
               <input
                 type="text"
                 value={searchTerm}
                 onChange={(e) => onSearchChange(e.target.value)}
                 className="block w-full pl-10 pr-3 py-1.5 border border-github-border/50 rounded-full leading-5 bg-github-darker/50 text-github-light placeholder-github-muted focus:outline-none focus:bg-github-darker focus:ring-1 focus:ring-github-accent focus:border-github-accent/50 sm:text-sm transition-all shadow-inner"
                 placeholder="Find badge..."
               />
               {searchTerm && (
                 <button 
                    onClick={() => onSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-github-muted hover:text-github-light"
                 >
                   <X className="h-4 w-4" />
                 </button>
               )}
             </div>
          </div>
          
          {/* Mobile Search Toggle & Theme */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-full text-github-muted hover:text-github-light hover:bg-white/5 transition-colors"
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </button>

            <div className="border-l border-github-border/30 pl-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-github-muted hover:text-yellow-400 hover:bg-white/5 transition-all duration-300 transform hover:rotate-12"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navigation;