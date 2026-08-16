import type { ComponentType } from 'react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import {
  SiCodechef,
  SiCodeforces,
  SiGeeksforgeeks,
  SiHackerrank,
  SiKaggle,
  SiLeetcode,
} from 'react-icons/si';

export type PlatformId =
  | 'github'
  | 'linkedin'
  | 'x'
  | 'leetcode'
  | 'codechef'
  | 'geeksforgeeks'
  | 'hackerrank'
  | 'codeforces'
  | 'kaggle';

/** Official brand marks, all sized via className so they stay visually consistent. */
export const brandIcons: Record<PlatformId, ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  leetcode: SiLeetcode,
  codechef: SiCodechef,
  geeksforgeeks: SiGeeksforgeeks,
  hackerrank: SiHackerrank,
  codeforces: SiCodeforces,
  kaggle: SiKaggle,
};

export const platformNames: Record<PlatformId, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  x: 'X (Twitter)',
  leetcode: 'LeetCode',
  codechef: 'CodeChef',
  geeksforgeeks: 'GeeksforGeeks',
  hackerrank: 'HackerRank',
  codeforces: 'Codeforces',
  kaggle: 'Kaggle',
};

export const platformTaglines: Record<PlatformId, string> = {
  github: 'Open source projects · repositories & commits',
  linkedin: 'Professional network & experience',
  x: 'Dev community & quick thoughts',
  leetcode: 'DSA · Problem solving',
  codechef: 'Competitive programming',
  geeksforgeeks: 'DSA practice & articles',
  hackerrank: 'Skill certifications & challenges',
  codeforces: 'Competitive programming',
  kaggle: 'Data science & ML notebooks',
};

export const platformColors: Record<PlatformId, string> = {
  github: '#ffffff',
  linkedin: '#0a66c2',
  x: '#e7e9ea',
  leetcode: '#ffa116',
  codechef: '#d8b04c',
  geeksforgeeks: '#2f8d46',
  hackerrank: '#00ea64',
  codeforces: '#1f8acb',
  kaggle: '#20c7ff',
};
