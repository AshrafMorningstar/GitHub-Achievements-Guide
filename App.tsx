import React from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import BadgeCard from './components/BadgeCard';
import GuideSection from './components/GuideSection';
import Footer from './components/Footer';
import ProfileChecker from './components/ProfileChecker';
import { BADGES, FAQS } from './constants';
import { HelpCircle, Scroll, Star } from 'lucide-react';

const App: React.FC = () => {
  const activeBadges = BADGES.filter(b => b.status === 'Active');
  const retiredBadges = BADGES.filter(b => b.status === 'Retired');
  const programBadges = BADGES.filter(b => b.status === 'Program');

  return (
    <div className="min-h-screen bg-github-dark font-sans selection:bg-blue-500/30">
      <Hero />
      <ProfileChecker />
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Active Achievements Section */}
        <section id="active-achievements" className="py-16">
          <div className="flex items-center mb-8 space-x-3">
             <div className="h-8 w-1 bg-github-success rounded-full"></div>
             <h2 className="text-3xl font-bold text-white">Active Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeBadges.map(badge => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-8">
          
          {/* Retired Section */}
          <section id="retired-badges" className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Scroll className="text-amber-400 w-6 h-6" />
              <h2 className="text-2xl font-bold text-white">Retired & Legacy</h2>
            </div>
            <div className="space-y-4">
              {retiredBadges.map(badge => (
                <div key={badge.id} className="flex items-center p-4 bg-github-darker/50 border border-github-border rounded-lg opacity-75 hover:opacity-100 transition-opacity">
                  <div className="text-3xl mr-4 grayscale">{badge.emoji}</div>
                  <div>
                    <h3 className="text-white font-semibold flex items-center">
                      {badge.name}
                      <span className="ml-2 text-[10px] uppercase bg-github-border text-github-muted px-1.5 py-0.5 rounded">Legacy</span>
                    </h3>
                    <p className="text-sm text-github-muted">{badge.description}</p>
                    {badge.notes && <p className="text-xs text-amber-500/80 mt-1">{badge.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Program Highlights */}
          <section id="profile-highlights" className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Star className="text-purple-400 w-6 h-6" />
              <h2 className="text-2xl font-bold text-white">Program Highlights</h2>
            </div>
             <div className="space-y-4">
              {programBadges.map(badge => (
                <div key={badge.id} className="flex items-center p-4 bg-gradient-to-r from-purple-900/10 to-transparent border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-colors">
                  <div className="text-3xl mr-4">{badge.emoji}</div>
                  <div>
                    <h3 className="text-white font-semibold">{badge.name}</h3>
                    <p className="text-sm text-github-muted">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </main>

      {/* Full width sections */}
      <GuideSection />

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-github-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
           <div className="flex items-center justify-center space-x-3 mb-10">
             <HelpCircle className="w-8 h-8 text-rose-400" />
             <h2 className="text-3xl font-bold text-white text-center">FAQ & Troubleshooting</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {FAQS.map((faq, idx) => (
               <div key={idx} className="bg-github-darker border border-github-border p-6 rounded-xl hover:shadow-md transition-shadow">
                 <h4 className="font-bold text-white mb-3 flex items-start">
                   <span className="text-rose-400 mr-2">Q:</span>
                   {faq.question}
                 </h4>
                 <div className="text-sm text-github-muted space-y-2">
                   <p><span className="text-github-success font-semibold">A:</span> {faq.answer}</p>
                   {faq.fix && (
                     <div className="mt-3 p-3 bg-github-border/30 rounded text-xs">
                       <span className="font-bold text-github-light block mb-1">💡 Fix:</span>
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
  );
};

export default App;