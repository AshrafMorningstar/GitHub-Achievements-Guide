import React, { useState } from 'react';
import { Search, Github, Loader2, AlertTriangle, Trophy, GitPullRequest, Star, ExternalLink } from 'lucide-react';
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
      // 1. Fetch Basic Profile
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      if (!profileRes.ok) {
        if (profileRes.status === 404) throw new Error('User not found');
        if (profileRes.status === 403) throw new Error('API rate limit exceeded. Please try again later.');
        throw new Error('Failed to fetch profile');
      }
      const profileData: GithubProfile = await profileRes.json();
      setProfile(profileData);

      // 2. Fetch Merged PRs Count (Pull Shark)
      // Note: Search API has strict rate limits for unauthenticated requests
      const prRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`);
      let mergedPRs = 0;
      if (prRes.ok) {
        const prData = await prRes.json();
        mergedPRs = prData.total_count;
      }

      // 3. Fetch Top Repo for Starstruck
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
    <section className="relative -mt-8 mb-12 max-w-4xl mx-auto px-4 sm:px-6 z-10">
      <div className="bg-github-dark border border-github-border rounded-xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm bg-opacity-95">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Check Your Real Progress</h2>
          <p className="text-github-muted text-sm">
            Enter your username to fetch public stats and estimate your badge eligibility.
          </p>
        </div>

        <form onSubmit={checkProfile} className="relative max-w-md mx-auto mb-8">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username..."
            className="w-full bg-github-darker border border-github-border text-white px-5 py-3 pr-12 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
        </form>

        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20 mb-6">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {profile && stats && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8 p-4 bg-github-darker/50 rounded-lg border border-github-border/50">
              <img src={profile.avatar_url} alt={profile.login} className="w-20 h-20 rounded-full border-2 border-github-border" />
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  {profile.name || profile.login}
                  <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="text-github-muted hover:text-blue-400">
                    <Github className="w-4 h-4" />
                  </a>
                </h3>
                <p className="text-github-muted text-sm mb-3 max-w-md mx-auto sm:mx-0">{profile.bio || 'No bio available'}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-4 text-xs font-mono text-github-light">
                  <span className="px-2 py-1 bg-github-border/30 rounded">Repos: {profile.public_repos}</span>
                  <span className="px-2 py-1 bg-github-border/30 rounded">Followers: {profile.followers}</span>
                </div>
              </div>
              <a 
                href={`https://github.com/${profile.login}?tab=achievements`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-github-border/50 hover:bg-github-border text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <span>View Official Badges</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pull Shark Card */}
              <div className="bg-github-darker border border-github-border p-5 rounded-lg relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center space-x-3">
                     <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <GitPullRequest className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-bold text-white">Pull Shark</h4>
                       <p className="text-xs text-github-muted">Merged Pull Requests</p>
                     </div>
                   </div>
                   <div className="text-2xl font-mono font-bold text-emerald-400">{stats.mergedPRs}</div>
                 </div>
                 
                 {pullSharkTier && (
                   <div>
                     <div className="flex justify-between text-xs text-github-light mb-1">
                       <span>Current Tier: <span className={pullSharkTier.tier === 'None' ? 'text-github-muted' : 'text-emerald-400 font-bold'}>{pullSharkTier.tier}</span></span>
                       {pullSharkTier.next && <span>Next: {pullSharkTier.next}</span>}
                     </div>
                     <div className="w-full bg-github-border rounded-full h-2 overflow-hidden">
                       <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(pullSharkTier.progress, 100)}%` }}></div>
                     </div>
                   </div>
                 )}
              </div>

              {/* Starstruck Card */}
              <div className="bg-github-darker border border-github-border p-5 rounded-lg relative overflow-hidden group">
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center space-x-3">
                     <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                        <Star className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-bold text-white">Starstruck</h4>
                       <p className="text-xs text-github-muted">Max Repo Stars</p>
                     </div>
                   </div>
                   <div className="text-2xl font-mono font-bold text-yellow-400">{stats.maxStars}</div>
                 </div>
                 
                 {starstruckTier && (
                   <div>
                     <div className="flex justify-between text-xs text-github-light mb-1">
                       <span>Current Tier: <span className={starstruckTier.tier === 'None' ? 'text-github-muted' : 'text-yellow-400 font-bold'}>{starstruckTier.tier}</span></span>
                       {starstruckTier.next && <span>Next: {starstruckTier.next}</span>}
                     </div>
                     <div className="w-full bg-github-border rounded-full h-2 overflow-hidden">
                       <div className="bg-yellow-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(starstruckTier.progress, 100)}%` }}></div>
                     </div>
                   </div>
                 )}
              </div>

            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-github-muted italic">
                * Estimates based on public API data. Official achievements may vary slightly due to GitHub's internal caching or private contribution settings.
              </p>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileChecker;