import React, { useState } from 'react';
import { Badge } from '../types';
import { BADGES } from '../constants';
import { ChevronDown, ChevronUp, Lightbulb, ExternalLink, BookOpen } from 'lucide-react';

const GuideItem: React.FC<{ badge: Badge }> = ({ badge }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!badge.earnGuide) return null;

  return (
    <div className="border border-github-border rounded-lg bg-github-dark overflow-hidden transition-all duration-300 hover:border-github-muted">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus:bg-github-border/30 hover:bg-github-border/20"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{badge.emoji}</span>
          <span className="font-bold text-white text-lg">
            How to earn <span className="text-github-accent">{badge.name}</span>
          </span>
        </div>
        {isOpen ? <ChevronUp className="text-github-muted" /> : <ChevronDown className="text-github-muted" />}
      </button>

      {isOpen && (
        <div className="p-4 sm:p-6 bg-github-darker border-t border-github-border animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-github-light mb-3 flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs mr-2">1</span>
                Steps to Unlock
              </h4>
              <ol className="relative border-l border-github-border ml-3 space-y-4">
                {badge.earnGuide.map((step, idx) => (
                  <li key={idx} className="mb-2 ml-6">
                    <span className="absolute flex items-center justify-center w-4 h-4 bg-github-border rounded-full -left-2 ring-4 ring-github-darker"></span>
                    <p className="text-sm text-github-light">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {badge.proTips && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h5 className="text-sm font-bold text-yellow-400 mb-1">Pro Tip</h5>
                    <ul className="list-disc list-inside text-sm text-github-light/90 space-y-1">
                      {badge.proTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
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
    <section id="guides" className="py-16 border-t border-github-border bg-github-darker/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center space-x-3 mb-8">
           <div className="p-2 bg-blue-500/10 rounded-lg">
             <BookOpen className="w-6 h-6 text-blue-400" />
           </div>
           <h2 className="text-3xl font-bold text-white">Detailed Earning Guides</h2>
        </div>
        
        <p className="text-github-muted mb-8 text-lg">
          Follow these step-by-step instructions to add these achievements to your profile.
        </p>

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