/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState } from 'react';
import { Search, Github, Loader2, AlertTriangle, GitPullRequest, Star, ExternalLink, User } from 'lucide-react';
import { GithubProfile, UserStats, BadgeTier } from '../types';

const ProfileChecker: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);

  const checkProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setProfile(null);
    setStats(null);

    try {
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      if (!profileRes.ok) {
        if (profileRes.status === 404) throw new Error('User not found');
        if (profileRes.status === 403) throw new Error('API rate limit exceeded. Please try again later.');
        throw new Error('Failed to fetch profile');
      }
      const profileData: GithubProfile = await profileRes.json();
      setProfile(profileData);

      const prRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`);
      let mergedPRs = 0;
      if (prRes.ok) {
        const prData = await prRes.json();
        mergedPRs = prData.total_count;
      }

      const repoRes = await fetch(`https://api.github.com/search/repositories?q=user:${username}&sort=stars&order=desc&per_page=1`);
      let maxStars = 0;
      if (repoRes.ok) {
        const repoData = await repoRes.json();
        if (repoData.items && repoData.items.length > 0) {
          maxStars = repoData.items[0].stargazers_count;
        }
      }

      setStats({ mergedPRs, maxStars });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getTier = (value: number, thresholds: { bronze: number; silver: number; gold: number }) => {
    if (value >= thresholds.gold) return { tier: BadgeTier.Gold, next: null, progress: 100 };
    if (value >= thresholds.silver) return { tier: BadgeTier.Silver, next: thresholds.gold, progress: (value / thresholds.gold) * 100 };
    if (value >= thresholds.bronze) return { tier: BadgeTier.Bronze, next: thresholds.silver, progress: (value / thresholds.silver) * 100 };
    return { tier: BadgeTier.None, next: thresholds.bronze, progress: (value / thresholds.bronze) * 100 };
  };

  const pullSharkTier = stats ? getTier(stats.mergedPRs, { bronze: 2, silver: 16, gold: 1024 }) : null;
  const starstruckTier = stats ? getTier(stats.maxStars, { bronze: 16, silver: 128, gold: 512 }) : null;

  return (
    <section className="relative -mt-10 mb-20 max-w-4xl mx-auto px-4 sm:px-6 z-20">
      <div className="glass-panel rounded-2xl shadow-2xl p-6 sm:p-10 border border-github-border/50 bg-github-dark/60 backdrop-blur-xl">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-github-light mb-2 flex items-center justify-center gap-2">
            <User className="text-blue-400" />
            Check Your Progress
          </h2>
          <p className="text-github-muted text-sm max-w-lg mx-auto">
            Enter your GitHub username to fetch real-time stats and see how close you are to the next tier.
          </p>
        </div>

        <form onSubmit={checkProfile} className="relative max-w-lg mx-auto mb-10 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative flex">
             <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="github_username"
              className="w-full bg-github-darker border border-github-border text-github-light px-6 py-4 pr-14 rounded-l-lg focus:outline-none focus:bg-github-dark transition-all placeholder:text-github-muted/50 font-mono text-sm"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-4 rounded-r-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold tracking-wide"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'CHECK'}
            </button>
          </div>
        </form>

        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-400 bg-red-500/5 p-4 rounded-xl border border-red-500/20 mb-8 max-w-lg mx-auto">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {profile && stats && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 p-6 bg-gradient-to-r from-github-card to-transparent rounded-2xl border border-github-border/30">
              <div className="relative">
                 <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-sm opacity-50"></div>
                 <img src={profile.avatar_url} alt={profile.login} className="relative w-24 h-24 rounded-full border-2 border-github-darker shadow-xl" />
              </div>
              
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl font-bold text-github-light flex items-center justify-center sm:justify-start gap-3">
                  {profile.name || profile.login}
                  <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="text-github-muted hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </h3>
                <p className="text-github-muted text-sm mb-4 max-w-md mx-auto sm:mx-0 leading-relaxed">{profile.bio || 'Ready to earn some badges!'}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-xs font-mono text-github-light/80">
                  <span className="px-3 py-1.5 bg-github-darker rounded-md border border-github-border/30">Repos: {profile.public_repos}</span>
                  <span className="px-3 py-1.5 bg-github-darker rounded-md border border-github-border/30">Followers: {profile.followers}</span>
                </div>
              </div>
              <a 
                href={`https://github.com/${profile.login}?tab=achievements`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-2 bg-github-border/20 hover:bg-github-border/40 text-github-light px-5 py-3 rounded-xl text-sm font-bold transition-all border border-github-border/20 hover:border-github-border/50"
              >
                <span>View Official</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pull Shark Card */}
              <div className="group bg-github-darker/40 border border-github-border/40 p-6 rounded-2xl relative overflow-hidden hover:bg-github-darker/60 transition-colors">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-emerald-500/10 transition-colors"></div>
                 <div className="flex justify-between items-start mb-6 relative">
                   <div className="flex items-center space-x-4">
                     <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                        <GitPullRequest className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-bold text-github-light text-lg">Pull Shark</h4>
                       <p className="text-xs text-github-muted uppercase tracking-wider font-semibold">Merged PRs</p>
                     </div>
                   </div>
                   <div className="text-3xl font-mono font-bold text-white drop-shadow-lg">{stats.mergedPRs}</div>
                 </div>
                 
                 {pullSharkTier && (
                   <div className="relative">
                     <div className="flex justify-between text-xs text-github-muted font-medium mb-2 uppercase tracking-wide">
                       <span>Current: <span className={pullSharkTier.tier === 'None' ? 'text-github-muted' : 'text-emerald-400'}>{pullSharkTier.tier}</span></span>
                       {pullSharkTier.next && <span>Goal: {pullSharkTier.next}</span>}
                     </div>
                     <div className="w-full bg-github-border/30 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
                       <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${Math.min(pullSharkTier.progress, 100)}%` }}></div>
                     </div>
                   </div>
                 )}
              </div>

              {/* Starstruck Card */}
              <div className="group bg-github-darker/40 border border-github-border/40 p-6 rounded-2xl relative overflow-hidden hover:bg-github-darker/60 transition-colors">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-yellow-500/10 transition-colors"></div>
                 <div className="flex justify-between items-start mb-6 relative">
                   <div className="flex items-center space-x-4">
                     <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-400 border border-yellow-500/20">
                        <Star className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-bold text-github-light text-lg">Starstruck</h4>
                       <p className="text-xs text-github-muted uppercase tracking-wider font-semibold">Max Stars</p>
                     </div>
                   </div>
                   <div className="text-3xl font-mono font-bold text-white drop-shadow-lg">{stats.maxStars}</div>
                 </div>
                 
                 {starstruckTier && (
                   <div className="relative">
                     <div className="flex justify-between text-xs text-github-muted font-medium mb-2 uppercase tracking-wide">
                       <span>Current: <span className={starstruckTier.tier === 'None' ? 'text-github-muted' : 'text-yellow-400'}>{starstruckTier.tier}</span></span>
                       {starstruckTier.next && <span>Goal: {starstruckTier.next}</span>}
                     </div>
                     <div className="w-full bg-github-border/30 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
                       <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ width: `${Math.min(starstruckTier.progress, 100)}%` }}></div>
                     </div>
                   </div>
                 )}
              </div>

            </div>
            
            <div className="mt-6 text-center">
              <p className="text-[10px] text-github-muted/50 uppercase tracking-widest">
                Public API Estimate • Results may vary
              </p>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileChecker;