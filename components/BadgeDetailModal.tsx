/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { Badge, BadgeTier, BadgeRarity } from '../types';
import { X, Check, Award, Lightbulb, BookOpen, Tag } from 'lucide-react';

interface BadgeDetailModalProps {
  badge: Badge;
  isOpen: boolean;
  onClose: () => void;
  isOwned: boolean;
  onToggleOwn: () => void;
}

const TierBadge: React.FC<{ tier: BadgeTier; description: string }> = ({ tier, description }) => {
  const getColors = (t: BadgeTier) => {
    switch (t) {
      case BadgeTier.Gold: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case BadgeTier.Silver: return 'bg-slate-500/10 text-slate-300 border-slate-500/30';
      case BadgeTier.Bronze: return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      default: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className={`flex items-start p-4 rounded-xl border ${getColors(tier)} mb-3 hover:bg-opacity-20 transition-colors`}>
      <div className="font-bold mr-4 min-w-[60px] uppercase text-xs tracking-wider mt-0.5">{tier}</div>
      <div className="text-sm font-medium opacity-90 leading-relaxed">{description}</div>
    </div>
  );
};

const RarityBadge: React.FC<{ rarity: BadgeRarity }> = ({ rarity }) => {
  const colors = {
    Common: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    Uncommon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    Rare: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    Legendary: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
  };
  return (
    <span className={`text-xs uppercase font-bold px-2.5 py-1 rounded-md border ${colors[rarity] || colors.Common}`}>
      {rarity}
    </span>
  );
};

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, isOpen, onClose, isOwned, onToggleOwn }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-3xl glass-panel text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl animate-in fade-in zoom-in-95 duration-300 border border-github-border/50">
          
          {/* Header */}
          <div className="bg-gradient-to-b from-github-card to-github-darker px-6 py-6 sm:px-8 flex justify-between items-start border-b border-github-border/50">
            <div className="flex items-center space-x-6">
              <div className="text-6xl p-2 bg-github-dark/50 rounded-2xl shadow-inner border border-white/5">{badge.emoji}</div>
              <div>
                <h3 className="text-3xl font-extrabold text-github-light tracking-tight" id="modal-title">
                  {badge.name}
                </h3>
                <div className="flex items-center gap-3 mt-3">
                   <RarityBadge rarity={badge.rarity} />
                   <span className="text-xs text-github-muted bg-github-darker px-3 py-1 rounded-md border border-github-border/50 uppercase tracking-wide font-medium">
                     {badge.category}
                   </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="rounded-full p-1 bg-github-border/20 text-github-muted hover:text-github-light hover:bg-github-border/50 focus:outline-none transition-all"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 sm:p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            
            {/* Description */}
            <p className="text-github-light/90 text-lg leading-relaxed font-light">
              {badge.description}
            </p>

            {/* Ownership Control */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${isOwned ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-github-card/50 border-github-border/50'}`}>
               <div className="flex items-center justify-between">
                 <div>
                   <h4 className={`font-bold text-lg mb-1 ${isOwned ? 'text-emerald-400' : 'text-github-light'}`}>
                     {isOwned ? 'Achievement Unlocked' : 'Not yet collected'}
                   </h4>
                   <p className="text-sm text-github-muted">
                     {isOwned ? 'Great job! This badge is showcased in your collection.' : 'Track your journey by marking this as earned.'}
                   </p>
                 </div>
                 <button
                   onClick={onToggleOwn}
                   className={`flex items-center px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg transform active:scale-95 ${
                     isOwned 
                     ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20' 
                     : 'bg-github-light text-github-darker hover:bg-white shadow-white/10'
                   }`}
                 >
                   {isOwned ? (
                     <><Check className="w-4 h-4 mr-2" strokeWidth={3} /> Collected</>
                   ) : (
                     <><Award className="w-4 h-4 mr-2" /> Mark Owned</>
                   )}
                 </button>
               </div>
            </div>

            {/* Tiers */}
            {badge.tiers && badge.tiers.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase text-github-muted tracking-widest mb-4 flex items-center">
                  <span className="w-8 h-[1px] bg-github-border mr-2"></span>
                  Requirements & Tiers
                </h4>
                <div className="space-y-2">
                  {badge.tiers.map((tier, idx) => (
                    <TierBadge key={idx} tier={tier.tier} description={tier.description} />
                  ))}
                </div>
              </div>
            )}

            {/* Guide */}
            {badge.earnGuide && (
              <div>
                 <div className="flex items-center space-x-3 mb-4">
                   <div className="p-2 bg-blue-500/10 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-400" />
                   </div>
                   <h4 className="text-lg font-bold text-github-light">Strategy Guide</h4>
                 </div>
                 <ol className="relative border-l border-github-border/50 ml-3 space-y-6 pb-2">
                   {badge.earnGuide.map((step, i) => (
                     <li key={i} className="ml-6 relative">
                        <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-github-border border-2 border-github-darker ring-4 ring-github-darker"></span>
                        <p className="text-github-light/80 leading-relaxed">{step}</p>
                     </li>
                   ))}
                 </ol>
              </div>
            )}

            {/* Pro Tips */}
            {badge.proTips && (
              <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border-l-4 border-yellow-500 rounded-r-xl p-5">
                 <div className="flex items-start">
                    <Lightbulb className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-yellow-500 text-sm uppercase mb-2 tracking-wide">Pro Tip</h4>
                      <ul className="list-disc list-inside text-sm text-github-light/80 space-y-1">
                        {badge.proTips.map((tip, i) => <li key={i}>{tip}</li>)}
                      </ul>
                    </div>
                 </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="bg-github-darker/80 px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse border-t border-github-border/50 backdrop-blur-sm">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-xl border border-github-border bg-github-card px-6 py-2.5 text-base font-medium text-github-light shadow-sm hover:bg-github-border/30 hover:text-white focus:outline-none transition-all sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDetailModal;