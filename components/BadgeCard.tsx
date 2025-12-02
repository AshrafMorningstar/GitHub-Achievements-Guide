import React from 'react';
import { Badge, BadgeTier } from '../types';
import { CheckCircle2, Lock } from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
}

const TierIcon = ({ tier }: { tier: BadgeTier }) => {
  switch (tier) {
    case BadgeTier.Bronze: return <span className="text-orange-400" title="Bronze">🥉</span>;
    case BadgeTier.Silver: return <span className="text-slate-300" title="Silver">🥈</span>;
    case BadgeTier.Gold: return <span className="text-yellow-400" title="Gold">🥇</span>;
    case BadgeTier.Base: return <span className="text-emerald-400" title="Base">🌱</span>;
    default: return null;
  }
};

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  return (
    <div className={`group relative bg-github-dark border border-github-border rounded-xl p-6 hover:border-github-muted transition-all hover:shadow-lg ${badge.color || 'hover:shadow-white/5'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl bg-github-border/30 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
            {badge.emoji}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-github-accent transition-colors">
              {badge.name}
            </h3>
            <p className="text-sm text-github-muted mt-1 leading-relaxed">
              {badge.description}
            </p>
          </div>
        </div>
        {badge.status === 'Active' ? (
           <div className="hidden sm:flex items-center space-x-1 text-xs font-semibold text-github-success bg-github-success/10 px-2 py-1 rounded-full border border-github-success/20">
             <CheckCircle2 size={12} />
             <span>Active</span>
           </div>
        ) : (
          <div className="hidden sm:flex items-center space-x-1 text-xs font-semibold text-github-muted bg-github-border px-2 py-1 rounded-full">
            <Lock size={12} />
            <span>{badge.status}</span>
          </div>
        )}
      </div>

      {/* Tiers Section */}
      {badge.tiers && badge.tiers.length > 0 && (
        <div className="mt-6 pt-4 border-t border-github-border border-dashed">
          <h4 className="text-xs font-semibold text-github-muted uppercase tracking-wider mb-3">
            Tiers & Requirements
          </h4>
          <div className="space-y-2">
            {badge.tiers.map((tier, idx) => (
              <div key={idx} className="flex items-center text-sm text-github-light bg-github-darker/50 p-2 rounded-md border border-transparent hover:border-github-border transition-colors">
                <div className="w-8 flex justify-center mr-2">
                    <TierIcon tier={tier.tier} />
                </div>
                <span className="flex-1 font-mono text-xs sm:text-sm">{tier.description}</span>
                <span className="text-xs text-github-muted font-medium px-2">{tier.tier}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeCard;