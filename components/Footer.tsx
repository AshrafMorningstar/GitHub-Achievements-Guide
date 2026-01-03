/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { Github, Heart, Star } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-github-border/30 bg-github-darker pt-20 pb-12">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-github-dark to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="relative p-8 glass rounded-3xl max-w-2xl w-full mb-16 overflow-hidden group hover:border-github-accent/30 transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:opacity-100 transition-opacity opacity-50"></div>
          
          <h3 className="text-2xl font-bold text-github-light mb-3 relative z-10">Found this helpful?</h3>
          <p className="text-github-muted mb-8 text-lg font-light relative z-10">
            Star the repository to save this guide and help others find it.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a href="https://github.com/login" target="_blank" className="flex items-center justify-center space-x-2 bg-github-light text-github-darker px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <Star size={18} className="fill-current" />
              <span>Star Repository</span>
            </a>
            <a href="https://github.com/sponsors" target="_blank" className="flex items-center justify-center space-x-2 bg-github-darker/50 text-github-light px-6 py-3 rounded-xl font-bold border border-github-border hover:bg-github-border/30 transition-all">
              <Heart size={18} className="text-pink-500 fill-pink-500/20" />
              <span>Sponsor Author</span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6 mb-8 opacity-60">
           <a href="#" className="hover:text-github-light transition-colors"><Github className="w-6 h-6" /></a>
        </div>

        <p className="text-sm text-github-muted/60 flex items-center gap-1.5 font-medium">
          Made with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> for the Open Source Community
        </p>
        <p className="text-xs text-github-muted/40 mt-3 font-mono">
          Data provided is for educational purposes. Not affiliated with GitHub, Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;