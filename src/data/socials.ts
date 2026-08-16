/**
 * All external links live here. Leave a value empty ('') to hide that
 * platform everywhere (dock, profiles app, contact, etc.).
 */
export const socials = {
  email: 'sawanyadav3010@gmail.com',
  github: 'https://github.com/mrprivate2',
  linkedin: 'https://www.linkedin.com/in/sawan-yadav-84a958329',
  x: 'https://x.com/SAWANYDUV',
  leetcode: 'https://leetcode.com/u/sawan_yaduvanshi_29/',
  codechef: '',
  geeksforgeeks: '',
  hackerrank: '',
  codeforces: '',
  kaggle: '',
} as const;

export type SocialKey = keyof typeof socials;

/** Platforms that have a real URL configured. */
export const activeSocials = Object.entries(socials).filter(
  ([, url]) => typeof url === 'string' && url.length > 0
) as Array<[SocialKey, string]>;
