/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { Filter, SortAsc, Layers, ChevronDown } from 'lucide-react';
import { BadgeCategory } from '../types';

interface FilterBarProps {
  filterStatus: 'all' | 'owned' | 'missing';
  setFilterStatus: (status: 'all' | 'owned' | 'missing') => void;
  filterCategory: BadgeCategory | 'All';
  setFilterCategory: (category: BadgeCategory | 'All') => void;
  sortBy: 'name' | 'rarity' | 'category' | 'default';
  setSortBy: (sort: 'name' | 'rarity' | 'category' | 'default') => void;
  resultCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  filterStatus, 
  setFilterStatus, 
  filterCategory,
  setFilterCategory,
  sortBy, 
  setSortBy,
  resultCount 
}) => {
  return (
    <div className="glass rounded-2xl p-4 mb-8 flex flex-col xl:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Left: Count */}
      <div className="flex items-center space-x-2 text-github-muted text-sm font-medium w-full xl:w-auto justify-center xl:justify-start">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-github-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-github-accent"></span>
        </span>
        <span>Found <span className="text-github-light font-bold text-base">{resultCount}</span> achievements</span>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-center xl:justify-end w-full xl:w-auto">
        
        {/* Category Filter */}
        <div className="relative group">
           <Layers className="w-4 h-4 text-github-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-github-light transition-colors" />
           <ChevronDown className="w-4 h-4 text-github-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
           <select 
             value={filterCategory}
             onChange={(e) => setFilterCategory(e.target.value as any)}
             className="pl-10 pr-10 py-2.5 bg-github-darker/50 border border-github-border/50 rounded-xl text-sm text-github-light focus:outline-none focus:ring-2 focus:ring-github-accent/50 focus:border-github-accent/50 appearance-none cursor-pointer hover:bg-github-card transition-all min-w-[160px]"
           >
             <option value="All">All Categories</option>
             <option value="Contribution">Contribution</option>
             <option value="Collaboration">Collaboration</option>
             <option value="Community">Community</option>
             <option value="Program">Program</option>
           </select>
        </div>

        {/* Status Filter */}
        <div className="relative group">
           <Filter className="w-4 h-4 text-github-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-github-light transition-colors" />
           <ChevronDown className="w-4 h-4 text-github-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
           <select 
             value={filterStatus}
             onChange={(e) => setFilterStatus(e.target.value as any)}
             className="pl-10 pr-10 py-2.5 bg-github-darker/50 border border-github-border/50 rounded-xl text-sm text-github-light focus:outline-none focus:ring-2 focus:ring-github-accent/50 focus:border-github-accent/50 appearance-none cursor-pointer hover:bg-github-card transition-all min-w-[150px]"
           >
             <option value="all">All Status</option>
             <option value="owned">Collected</option>
             <option value="missing">Uncollected</option>
           </select>
        </div>

        {/* Sort */}
        <div className="relative group">
           <SortAsc className="w-4 h-4 text-github-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-github-light transition-colors" />
           <ChevronDown className="w-4 h-4 text-github-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
           <select 
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value as any)}
             className="pl-10 pr-10 py-2.5 bg-github-darker/50 border border-github-border/50 rounded-xl text-sm text-github-light focus:outline-none focus:ring-2 focus:ring-github-accent/50 focus:border-github-accent/50 appearance-none cursor-pointer hover:bg-github-card transition-all min-w-[160px]"
           >
             <option value="default">Recommended</option>
             <option value="name">Name (A-Z)</option>
             <option value="rarity">Complexity</option>
             <option value="category">Category</option>
           </select>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;