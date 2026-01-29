import { Badge, BadgeStatus, BadgeTier, FaqItem } from './types';

export const BADGES: Badge[] = [
  {
    id: 'quickdraw',
    name: 'Quickdraw',
    emoji: '🚀',
    description: 'Closed an issue or pull request within 5 minutes of opening.',
    status: BadgeStatus.Active,
    rarity: 'Common',
    category: 'Contribution',
    color: 'shadow-blue-500/20',
    tiers: [
      { tier: BadgeTier.Base, description: 'Close within 5 mins of opening.' }
    ],
    earnGuide: [
      'Create a new issue in your own repository.',
      'Immediately write a comment closing it or click the "Close issue" button.',
      'Alternatively, open a PR and merge it immediately.'
    ],
    proTips: ['You can do this in a private repository you own.']
  },
  {
    id: 'pair-extraordinaire',
    name: 'Pair Extraordinaire',
    emoji: '👯',
    description: 'Co-authored a commit that was merged.',
    status: BadgeStatus.Active,
    rarity: 'Uncommon',
    category: 'Collaboration',
    color: 'shadow-purple-500/20',
    tiers: [
      { tier: BadgeTier.Base, description: 'Co-author a merged commit.' },
      { tier: BadgeTier.Bronze, description: 'Co-author 10 commits.' },
      { tier: BadgeTier.Silver, description: 'Co-author 24 commits.' },
      { tier: BadgeTier.Gold, description: 'Co-author 48 commits.' }
    ],
    earnGuide: [
      'Write a commit message with the Co-authored-by trailer.',
      'Format: `Co-authored-by: Name <name@example.com>`',
      'Ensure there is an empty line between the commit body and the trailer.'
    ]
  },
  {
    id: 'pull-shark',
    name: 'Pull Shark',
    emoji: '🦈',
    description: 'Opened pull requests that have been merged.',
    status: BadgeStatus.Active,
    rarity: 'Rare',
    category: 'Contribution',
    color: 'shadow-emerald-500/20',
    tiers: [
      { tier: BadgeTier.Bronze, description: '2 merged PRs.' },
      { tier: BadgeTier.Silver, description: '16 merged PRs.' },
      { tier: BadgeTier.Gold, description: '1024 merged PRs.' }
    ],
    earnGuide: [
      'Contribute to repositories by opening Pull Requests.',
      'The PR must be merged to count.',
      'PRs in your own repositories count!'
    ]
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    emoji: '🧠',
    description: 'Answers accepted on GitHub Discussions.',
    status: BadgeStatus.Active,
    rarity: 'Rare',
    category: 'Community',
    color: 'shadow-pink-500/20',
    tiers: [
      { tier: BadgeTier.Bronze, description: '2 accepted answers.' },
      { tier: BadgeTier.Silver, description: '8 accepted answers.' },
      { tier: BadgeTier.Gold, description: '16 accepted answers.' }
    ],
    earnGuide: [
      'Find a repository with Discussions enabled.',
      'Answer a question in the Q&A category.',
      'The author of the discussion must mark your reply as the answer.'
    ]
  },
  {
    id: 'yolo',
    name: 'YOLO',
    emoji: '🤪',
    description: 'Merged a pull request without code review.',
    status: BadgeStatus.Active,
    rarity: 'Uncommon',
    category: 'Contribution',
    color: 'shadow-yellow-500/20',
    tiers: [
      { tier: BadgeTier.Base, description: 'Merge a PR without review.' }
    ],
    earnGuide: [
      'Create a PR in a repository where you have write access.',
      'Merge it immediately without waiting for a review approval.',
      'Often requires branch protection rules to be disabled or bypassed.'
    ]
  },
  {
    id: 'public-sponsor',
    name: 'Public Sponsor',
    emoji: '💖',
    description: 'Sponsoring an open source project via GitHub Sponsors.',
    status: BadgeStatus.Active,
    rarity: 'Common',
    category: 'Community',
    color: 'shadow-rose-500/20',
    tiers: [
      { tier: BadgeTier.Base, description: 'Sponsor a project.' }
    ],
    earnGuide: [
      'Navigate to a user or organization profile that has GitHub Sponsors enabled.',
      'Click "Sponsor" and complete a payment.',
      'The badge appears on your profile to show your support.'
    ]
  },
  {
    id: 'starstruck',
    name: 'Starstruck',
    emoji: '🌟',
    description: 'Created a repository that received many stars.',
    status: BadgeStatus.Active,
    rarity: 'Legendary',
    category: 'Community',
    color: 'shadow-amber-400/20',
    tiers: [
      { tier: BadgeTier.Bronze, description: '16 stars.' },
      { tier: BadgeTier.Silver, description: '128 stars.' },
      { tier: BadgeTier.Gold, description: '512 stars.' }
    ],
    earnGuide: [
      'Create a useful open source project.',
      'Promote it to the community.',
      'Stars must be from distinct users.'
    ]
  },
  {
    id: 'arctic-code-vault',
    name: 'Arctic Code Vault',
    emoji: '❄️',
    description: 'Contributed code to a repository archived in the Arctic Code Vault.',
    status: BadgeStatus.Retired,
    rarity: 'Rare',
    category: 'Contribution',
    notes: 'Snapshot taken on 02/02/2020. No longer earnable.'
  },
  {
    id: 'mars-2020',
    name: 'Mars 2020',
    emoji: '🚁',
    description: 'Contributed to a repository used in the Mars 2020 Helicopter mission.',
    status: BadgeStatus.Retired,
    rarity: 'Legendary',
    category: 'Contribution',
    notes: 'Legacy badge for specific contributors.'
  },
  {
    id: 'github-pro',
    name: 'GitHub Pro',
    emoji: '💎',
    description: 'Active subscriber to GitHub Pro.',
    status: BadgeStatus.Program,
    rarity: 'Common',
    category: 'Program',
  },
  {
    id: 'developer-program',
    name: 'Developer Program',
    emoji: '⚡',
    description: 'Member of the GitHub Developer Program.',
    status: BadgeStatus.Program,
    rarity: 'Uncommon',
    category: 'Program',
  },
  {
    id: 'security-bug-bounty',
    name: 'Security Bug Bounty',
    emoji: '🛡️',
    description: 'Hunted down a security vulnerability.',
    status: BadgeStatus.Program,
    rarity: 'Legendary',
    category: 'Program',
    notes: 'Awarded manually by GitHub security team.'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "My badge didn't appear immediately!",
    answer: "GitHub achievements are processed asynchronously. It can take anywhere from a few minutes to 24 hours for a badge to show up on your profile.",
    fix: "Wait at least 24 hours before trying again."
  },
  {
    question: "Do private repositories count?",
    answer: "Yes! For most badges like Quickdraw, Pair Extraordinaire, and Pull Shark, contributions in private repositories you own or collaborate on count towards the achievement.",
    fix: "Make sure you have 'Include private contributions on my profile' checked in your profile settings if you want the commit graph to reflect it, though badges usually appear regardless."
  },
  {
    question: "Can I lose a badge?",
    answer: "Generally, no. Once earned, badges stay on your profile. However, if you delete the repository or the specific contribution that triggered the badge (e.g., deleting the Pull Request), there is a slim chance it could be recalculated, but this is rare.",
  },
  {
    question: "How do I hide a badge?",
    answer: "GitHub allows you to toggle the visibility of specific achievements.",
    fix: "Go to your Profile > Scroll to Achievements > Click the gear/settings icon (if available) or manage visibility in Profile Settings."
  }
];