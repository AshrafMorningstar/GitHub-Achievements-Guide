/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState } from 'react';
import { Badge } from '../types';
import { BADGES } from '../constants';
import { ChevronDown, ChevronUp, Lightbulb, ExternalLink, BookOpen } from 'lucide-react';

const GuideItem: React.FC<{ badge: Badge }> = ({ badge }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!badge.earnGuide) return null;

  return (
    <div className={`border rounded-xl bg-github-dark/50 overflow-hidden transition-all duration-300 ${isOpen ? 'border-github-accent/30 shadow-lg shadow-black/20' : 'border-github-border hover:border-github-border/80'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
      >
        <div className="flex items-center space-x-4">
          <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'scale-110' : 'group-hover:scale-110'}`}>{badge.emoji}</span>
          <span className="font-bold text-github-light text-lg group-hover:text-white transition-colors">
            Earn <span className={isOpen ? 'text-github-accent' : ''}>{badge.name}</span>
          </span>
        </div>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-github-accent/10 text-github-accent rotate-180' : 'bg-github-border/20 text-github-muted group-hover:bg-github-border/40'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-6 pt-2 bg-github-darker/30 border-t border-github-border/30 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="space-y-6 pl-2 sm:pl-12">
            <div>
              <ol className="relative border-l-2 border-github-border/40 space-y-6 my-2">
                {badge.earnGuide.map((step, idx) => (
                  <li key={idx} className="ml-6 relative">
                    <span className="absolute -left-[31px] top-0 flex items-center justify-center w-7 h-7 bg-github-card border-2 border-github-border rounded-full text-xs font-bold text-github-muted shadow-sm">
                      {idx + 1}
                    </span>
                    <p className="text-github-light/90 leading-relaxed text-base">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {badge.proTips && (
              <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Lightbulb size={64} />
                </div>
                <div className="flex items-start relative z-10">
                  <div className="p-2 bg-yellow-500/10 rounded-lg mr-4">
                     <Lightbulb className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-yellow-500 uppercase tracking-wide mb-2">Pro Tip</h5>
                    <ul className="space-y-2">
                      {badge.proTips.map((tip, i) => (
                        <li key={i} className="text-sm text-github-light/90 flex items-start">
                          <span className="mr-2 text-yellow-500/50">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const GuideSection: React.FC = () => {
  const guides = BADGES.filter(b => b.earnGuide && b.earnGuide.length > 0);

  return (
    <section id="guides" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-github-darker/50 -z-10"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-github-border to-transparent opacity-50"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4">
             <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-github-light mb-4">Mastery Guides</h2>
          <p className="text-github-muted text-lg max-w-2xl mx-auto">
            Deep dive into the specific steps required to unlock each achievement.
          </p>
        </div>

        <div className="space-y-4">
          {guides.map(badge => (
            <GuideItem key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuideSection;