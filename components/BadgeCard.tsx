/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { Badge, BadgeTier, BadgeRarity } from '../types';
import { Check, Plus, Lock, Info, ExternalLink } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
  isOwned: boolean;
  onClick: () => void;
  onToggleOwn: (e: React.MouseEvent) => void;
}

const TierIcon = ({ tier }: { tier: BadgeTier }) => {
  switch (tier) {
    case BadgeTier.Bronze: return <span className="text-orange-400 drop-shadow-md" title="Bronze">🥉</span>;
    case BadgeTier.Silver: return <span className="text-slate-300 drop-shadow-md" title="Silver">🥈</span>;
    case BadgeTier.Gold: return <span className="text-yellow-400 drop-shadow-md" title="Gold">🥇</span>;
    case BadgeTier.Base: return <span className="text-emerald-400 drop-shadow-md" title="Base">🌱</span>;
    default: return null;
  }
};

const RarityTag: React.FC<{ rarity: BadgeRarity }> = ({ rarity }) => {
  const styles = {
    Common: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    Uncommon: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Rare: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Legendary: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
  };
  
  return (
    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${styles[rarity] || styles.Common}`}>
      {rarity}
    </span>
  );
};

const BadgeCard: React.FC<BadgeCardProps> = ({ badge, isOwned, onClick, onToggleOwn }) => {
  const quickGuide = badge.earnGuide ? badge.earnGuide[0] : badge.description;

  return (
    <div 
      onClick={onClick}
      className={`group relative glass rounded-2xl p-6 transition-all duration-300 ease-out cursor-pointer flex flex-col h-full
        hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]
        ${isOwned 
          ? 'border-emerald-500/30 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)] bg-gradient-to-br from-emerald-900/10 to-transparent' 
          : 'hover:border-github-border/80 border-transparent'
        }
      `}
    >
      {/* Tooltip */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 glass-panel border border-github-border/40 text-xs text-github-muted rounded-xl shadow-2xl pointer-events-none z-20 hidden sm:block translate-y-2 group-hover:translate-y-0">
        <div className="font-bold text-github-light mb-1.5 flex items-center">
          <Info className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> How to Earn:
        </div>
        <p className="leading-relaxed">{quickGuide}</p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-github-border/40"></div>
      </div>

      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center space-x-4">
          <div className={`
            text-4xl p-3.5 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
            ${isOwned ? 'bg-emerald-500/10 ring-1 ring-emerald-500/20' : 'bg-github-card ring-1 ring-github-border/50'}
          `}>
            {badge.emoji}
          </div>
          <div>
            <h3 className="text-lg font-bold text-github-light group-hover:text-github-accent transition-colors duration-300">
              {badge.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1.5">
              <RarityTag rarity={badge.rarity} />
            </div>
          </div>
        </div>
        
        {/* Quick Toggle Button */}
        <button
          onClick={onToggleOwn}
          className={`
            p-2 rounded-full border transition-all duration-300 z-10 opacity-100 sm:opacity-0 group-hover:opacity-100
            ${isOwned 
              ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30' 
              : 'bg-github-card text-github-muted border-github-border hover:border-github-light hover:text-github-light hover:bg-github-border/20'
            }
          `}
          title={isOwned ? "Remove from collection" : "Add to collection"}
        >
          {isOwned ? <Check size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
        </button>
      </div>

      <p className="text-sm text-github-muted leading-relaxed line-clamp-2 mb-6 font-medium">
         {badge.description}
      </p>

      {/* Footer info */}
      <div className="mt-auto pt-4 border-t border-github-border/20 border-dashed flex justify-between items-center">
        <span className="text-[10px] uppercase font-bold text-github-muted tracking-widest opacity-60">
          {badge.category}
        </span>
        
        {badge.tiers && badge.tiers.length > 0 ? (
          <div className="flex -space-x-1 hover:space-x-1 transition-all duration-300">
            {badge.tiers.map((tier, idx) => (
              <div key={idx} className="bg-github-darker/80 p-1 rounded-full border border-github-border/50 shadow-sm" title={`${tier.tier} Tier`}>
                 <div className="text-[10px] leading-none"><TierIcon tier={tier.tier} /></div>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-xs text-github-muted bg-github-darker/50 px-2 py-0.5 rounded border border-github-border/30">
            Single Tier
          </span>
        )}
      </div>

      {/* Status Label (if inactive) */}
      {badge.status !== 'Active' && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 text-[10px] uppercase font-bold text-github-muted/70 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5">
            <Lock size={10} />
            <span>{badge.status}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeCard;