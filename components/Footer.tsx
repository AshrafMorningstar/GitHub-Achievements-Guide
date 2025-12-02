import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-github-border bg-github-darker py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="p-6 bg-github-dark border border-github-border rounded-2xl max-w-2xl w-full mb-10 transform hover:scale-[1.01] transition-transform">
          <h3 className="text-2xl font-bold text-white mb-2">Contribute & Star</h3>
          <p className="text-github-muted mb-6">
            Found this guide useful? Give it a star on GitHub or contribute new findings!
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="flex items-center space-x-2 bg-white text-github-darker px-5 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              <Github size={20} />
              <span>Star Repository</span>
            </a>
            <a href="#" className="flex items-center space-x-2 bg-github-border/50 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-github-border transition-colors">
              <Heart size={20} className="text-pink-500" />
              <span>Sponsor</span>
            </a>
          </div>
        </div>

        <p className="text-sm text-github-muted flex items-center gap-1">
          Made with <Heart size={14} className="text-red-500 fill-red-500" /> for the GitHub Community.
        </p>
        <p className="text-xs text-github-muted mt-2 opacity-50">
          Not affiliated with GitHub, Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;