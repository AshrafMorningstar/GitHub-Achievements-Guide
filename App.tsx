import React, { useState, useEffect, useMemo } from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import BadgeCard from './components/BadgeCard';
import GuideSection from './components/GuideSection';
import Footer from './components/Footer';
import ProfileChecker from './components/ProfileChecker';
import BadgeDetailModal from './components/BadgeDetailModal';
import FilterBar from './components/FilterBar';
import { BADGES, FAQS } from './constants';
import { HelpCircle, Scroll, Star, Info, Search } from 'lucide-react';
import { Badge, BadgeCategory } from './types';

const App: React.FC = () => {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'owned' | 'missing'>('all');
  const [filterCategory, setFilterCategory] = useState<BadgeCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'category' | 'default'>('default');
  
  const [ownedBadges, setOwnedBadges] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('github-badges-collected');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('github-badges-collected', JSON.stringify(Array.from(ownedBadges)));
  }, [ownedBadges]);

  // --- Handlers ---
  const handleToggleOwn = (e: React.MouseEvent, badgeId: string) => {
    e.stopPropagation(); 
    const newSet = new Set(ownedBadges);
    if (newSet.has(badgeId)) {
      newSet.delete(badgeId);
    } else {
      newSet.add(badgeId);
    }
    setOwnedBadges(newSet);
  };

  const handleModalToggleOwn = () => {
    if (!selectedBadge) return;
    const badgeId = selectedBadge.id;
    const newSet = new Set(ownedBadges);
    if (newSet.has(badgeId)) {
      newSet.delete(badgeId);
    } else {
      newSet.add(badgeId);
    }
    setOwnedBadges(newSet);
  };

  const openBadgeDetail = (badge: Badge) => {
    setSelectedBadge(badge);
    setIsModalOpen(true);
  };

  // --- Filtering & Sorting ---
  const processBadges = (badges: Badge[]) => {
    let result = badges;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(b => 
        b.name.toLowerCase().includes(lower) || 
        b.description.toLowerCase().includes(lower) ||
        b.earnGuide?.some(g => g.toLowerCase().includes(lower)) ||
        b.proTips?.some(t => t.toLowerCase().includes(lower))
      );
    }

    if (filterStatus === 'owned') {
      result = result.filter(b => ownedBadges.has(b.id));
    } else if (filterStatus === 'missing') {
      result = result.filter(b => !ownedBadges.has(b.id));
    }

    if (filterCategory !== 'All') {
      result = result.filter(b => b.category === filterCategory);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'rarity') {
        const tiersA = a.tiers?.length || 0;
        const tiersB = b.tiers?.length || 0;
        return tiersB - tiersA;
      }
      return 0; 
    });

    return result;
  };

  const activeBadgesRaw = BADGES.filter(b => b.status === 'Active');
  const retiredBadges = BADGES.filter(b => b.status === 'Retired');
  const programBadges = BADGES.filter(b => b.status === 'Program');

  const activeBadgesProcessed = useMemo(() => processBadges(activeBadgesRaw), [activeBadgesRaw, searchTerm, filterStatus, filterCategory, sortBy, ownedBadges]);

  return (
    <div className="min-h-screen bg-github-dark font-sans text-github-light overflow-x-hidden selection:bg-blue-500/30 selection:text-white relative">
      
      {/* Global Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/5 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-emerald-900/5 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10">
        <Hero />
        <ProfileChecker />
        <Navigation searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          
          {/* Active Achievements Section */}
          <section id="active-achievements" className="py-12 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-2">
              <div>
                 <h2 className="text-4xl font-extrabold text-github-light tracking-tight mb-2">Active Badges</h2>
                 <p className="text-github-muted text-lg max-w-xl">
                   These are the achievements currently available to earn on your public profile.
                 </p>
              </div>
            </div>
            
            <FilterBar 
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              resultCount={activeBadgesProcessed.length}
            />

            {activeBadgesProcessed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                {activeBadgesProcessed.map((badge, idx) => (
                  <BadgeCard 
                    key={badge.id} 
                    badge={badge} 
                    isOwned={ownedBadges.has(badge.id)}
                    onClick={() => openBadgeDetail(badge)}
                    onToggleOwn={(e) => handleToggleOwn(e, badge.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass rounded-3xl border border-dashed border-github-border/50">
                <div className="bg-github-darker inline-flex p-4 rounded-full mb-4 text-github-muted">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-github-light">No badges found</h3>
                <p className="text-github-muted mt-2 mb-6">Adjust your filters to see more results.</p>
                <button 
                  onClick={() => {
                    setSearchTerm(''); 
                    setFilterStatus('all');
                    setFilterCategory('All');
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 py-12">
            
            {/* Retired Section */}
            <section id="retired-badges" className="space-y-8">
              <div className="flex items-center space-x-4 mb-2">
                <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                  <Scroll className="text-amber-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-github-light">Legacy Vault</h2>
                  <p className="text-sm text-github-muted">Badges that are no longer earnable.</p>
                </div>
              </div>
              
              <div className="glass overflow-hidden rounded-2xl border border-github-border/40">
                <table className="min-w-full divide-y divide-github-border/30">
                  <thead className="bg-github-darker/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-github-muted uppercase tracking-wider w-20">Badge</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-github-muted uppercase tracking-wider">Information</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-github-border/30 bg-transparent">
                    {retiredBadges.map(badge => (
                      <tr 
                        key={badge.id} 
                        onClick={() => openBadgeDetail(badge)}
                        className="hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-5 whitespace-nowrap text-3xl text-center opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                          {badge.emoji}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-base font-bold text-github-light group-hover:text-amber-400 transition-colors">{badge.name}</h4>
                            <span className="text-[10px] uppercase bg-amber-900/20 text-amber-500/80 px-2 py-0.5 rounded border border-amber-500/20 font-bold">Retired</span>
                          </div>
                          <p className="text-sm text-github-muted">{badge.description}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Program Highlights */}
            <section id="profile-highlights" className="space-y-8">
              <div className="flex items-center space-x-4 mb-2">
                <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                  <Star className="text-purple-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-github-light">Program Status</h2>
                  <p className="text-sm text-github-muted">Exclusive membership indicators.</p>
                </div>
              </div>
               
               <div className="space-y-4">
                {programBadges.map(badge => (
                  <div 
                    key={badge.id} 
                    onClick={() => openBadgeDetail(badge)}
                    className="glass group flex items-center p-6 rounded-2xl cursor-pointer hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="w-16 h-16 flex items-center justify-center bg-github-darker rounded-2xl mr-5 shadow-inner border border-white/5 group-hover:scale-105 transition-transform text-4xl">
                      {badge.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-github-light font-bold text-lg group-hover:text-purple-400 transition-colors">{badge.name}</h3>
                      <p className="text-sm text-github-muted mt-1 leading-snug">{badge.description}</p>
                    </div>
                    <div className="bg-purple-500/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -mr-2">
                       <Info size={16} className="text-purple-400" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </main>

        <GuideSection />

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-gradient-to-b from-github-dark to-github-darker/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
             <div className="text-center mb-16">
               <h2 className="text-3xl font-extrabold text-github-light mb-4">Frequently Asked Questions</h2>
               <p className="text-github-muted">Common questions about earning and displaying badges.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {FAQS.map((faq, idx) => (
                 <div key={idx} className="glass p-8 rounded-3xl hover:border-github-border/60 transition-colors">
                   <h4 className="font-bold text-github-light mb-4 flex items-start text-lg">
                     <span className="text-github-accent mr-3 mt-1 text-xl font-serif italic">Q.</span>
                     {faq.question}
                   </h4>
                   <div className="pl-8 text-sm text-github-muted space-y-3 leading-relaxed">
                     <p>{faq.answer}</p>
                     {faq.fix && (
                       <div className="mt-4 p-4 bg-github-darker/50 rounded-xl border border-github-border/30 text-xs">
                         <span className="font-bold text-emerald-400 block mb-1 uppercase tracking-wider text-[10px]">Quick Fix</span>
                         {faq.fix}
                       </div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Modals */}
      {selectedBadge && (
        <BadgeDetailModal 
          badge={selectedBadge} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          isOwned={ownedBadges.has(selectedBadge.id)}
          onToggleOwn={handleModalToggleOwn}
        />
      )}
    </div>
  );
};

export default App;