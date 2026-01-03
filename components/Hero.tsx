/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { BADGES } from '../constants';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const activeCount = BADGES.filter(b => b.status === 'Active').length;
  const totalBadges = BADGES.length;

  return (
    <div className="relative overflow-hidden bg-github-darker border-b border-github-border/50 pb-20 pt-32 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[20%] right-[30%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        
        {/* Badge Pill */}
        <div className="inline-flex items-center space-x-2 bg-github-card/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-8 border border-github-border/60 hover:border-github-accent/50 transition-colors cursor-default shadow-lg shadow-black/20 animate-float">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-github-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-github-success"></span>
          </span>
          <span className="text-xs font-semibold text-github-light tracking-wider uppercase font-mono">
            Updated for 2025
          </span>
        </div>
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-github-light mb-8 leading-tight">
          Master Your <br className="hidden sm:block" />
          <span className="gradient-text">GitHub Profile</span>
        </h1>
        
        <p className="mt-4 text-xl sm:text-2xl text-github-muted max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          The ultimate visual guide to unlocking achievements. <br className="hidden md:block" />
          Track your progress, discover strategies, and level up your developer presence.
        </p>

        {/* Stats Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="group bg-github-card/50 backdrop-blur-md border border-github-border rounded-xl px-8 py-4 flex flex-col items-center hover:bg-github-card hover:border-github-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5 cursor-default">
             <span className="text-3xl font-bold text-github-light mb-1">{totalBadges}</span>
             <span className="text-sm font-medium text-github-muted uppercase tracking-wide">Total Badges</span>
          </div>
          <div className="group bg-github-card/50 backdrop-blur-md border border-github-border rounded-xl px-8 py-4 flex flex-col items-center hover:bg-github-card hover:border-github-success/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 cursor-default">
             <span className="text-3xl font-bold text-github-light mb-1">{activeCount}</span>
             <span className="text-sm font-medium text-github-muted uppercase tracking-wide">Earnable Now</span>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce text-github-muted opacity-50">
          <ArrowDown className="w-6 h-6 mx-auto" />
        </div>

      </div>
    </div>
  );
};

export default Hero;