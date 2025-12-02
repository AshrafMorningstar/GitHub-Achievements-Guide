import React from 'react';
import { Target, Scroll, Star, BookOpen, HelpCircle } from 'lucide-react';

const links = [
  { id: 'active-achievements', label: 'Active Achievements', icon: Target, color: 'text-emerald-400' },
  { id: 'retired-badges', label: 'Retired Legacy', icon: Scroll, color: 'text-amber-400' },
  { id: 'profile-highlights', label: 'Profile Highlights', icon: Star, color: 'text-purple-400' },
  { id: 'guides', label: 'Earning Guides', icon: BookOpen, color: 'text-blue-400' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, color: 'text-rose-400' },
];

const Navigation: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-github-darker/80 backdrop-blur-md border-b border-github-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 overflow-x-auto no-scrollbar">
          <span className="text-sm font-bold text-github-muted uppercase mr-6 hidden sm:block whitespace-nowrap">
            ✨ Quick Nav
          </span>
          <nav className="flex space-x-1 sm:space-x-4 w-full sm:w-auto">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-github-light hover:text-white hover:bg-github-border/50 transition-all whitespace-nowrap"
              >
                <link.icon className={`mr-2 h-4 w-4 ${link.color} group-hover:scale-110 transition-transform`} />
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;