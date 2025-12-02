import React from 'react';
import { BADGES } from '../constants';

const Hero: React.FC = () => {
  const activeCount = BADGES.filter(b => b.status === 'Active').length;
  const totalBadges = BADGES.length;

  return (
    <div className="relative overflow-hidden bg-github-darker border-b border-github-border pb-16 pt-24 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[10%] right-[20%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 bg-github-border/50 rounded-full px-3 py-1 mb-6 border border-github-border hover:border-github-muted transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-github-success animate-pulse"></span>
          <span className="text-xs font-medium text-github-light tracking-wide uppercase">
            Updated for 2025
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          <span className="block mb-2">🏅 The Ultimate Guide to</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            GitHub Achievements
          </span>
        </h1>
        
        <p className="mt-4 text-xl text-github-muted max-w-2xl mx-auto mb-10">
          A curated, beautiful reference to showcase your developer journey. 
          Stop guessing and start collecting.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <div className="flex items-center space-x-2 bg-github-dark border border-github-border rounded-lg px-4 py-2">
             <span>📛</span>
             <span className="text-white">Tracking <span className="text-github-accent">{totalBadges}</span> Badges</span>
          </div>
          <div className="flex items-center space-x-2 bg-github-dark border border-github-border rounded-lg px-4 py-2">
             <span>🎯</span>
             <span className="text-white"><span className="text-github-success">{activeCount}</span> Active & Earnable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;