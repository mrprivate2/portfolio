export interface Project {
  id: string;
  name: string;
  monogram: string;
  year: string;
  status: string;
  tagline: string;
  description: string;
  categories: string[];
  tags: string[];
  tech: string[];
  github: string;
  live: string;
  accent: string;
  accent2: string;
  /** Case-study fields are optional — small repos render without them. */
  overview?: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  features: string[];
  challenges?: string[];
  learned?: string[];
}

export const projects: Project[] = [
  {
    id: 'uniconnect',
    name: 'UniConnect',
    monogram: 'UC',
    year: '2026',
    status: 'Public',
    tagline: 'One campus platform to connect every student.',
    description:
      'A full-stack campus social platform connecting students through secure messaging, networking, events, marketplace, recruitment, and community collaboration.',
    categories: ['Full Stack', 'React'],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
    github: 'https://github.com/mrprivate2/UniConnect',
    live: '',
    accent: '#39ff88',
    accent2: '#168044',
    overview:
      'UniConnect is a full-stack campus platform that brings messaging, events, a marketplace, recruitment and community collaboration into one place, so students stop juggling a dozen scattered tools.',
    problem:
      'Campus life is fragmented: chat lives in one app, buying and selling textbooks in another, events in a third, and finding teammates or opportunities means asking around in group chats.',
    solution:
      'A single unified app with connected modules — real-time messaging, events & networking, a buy/sell marketplace, and recruitment & collaboration boards — all behind one secure JWT-authenticated account.',
    architecture:
      'React SPA on the front with a Node.js + Express API, MongoDB for persistence, and Socket.io for real-time messaging. Auth is stateless via JWT.',
    features: [
      'Real-time messaging between students',
      'Events and networking spaces',
      'Campus marketplace for buying & selling',
      'Recruitment and collaboration boards',
      'JWT-secured accounts',
    ],
    challenges: [
      'Keeping chat state consistent across rooms without dropping messages on reconnect',
      'Designing a MongoDB schema that served messaging, events, marketplace and boards without cross-module coupling',
    ],
    learned: [
      'Real-time systems are mostly about connection state, not message plumbing',
      'Shipping a multi-feature app forces you to prioritize scope ruthlessly',
    ],
  },
  {
    id: 'ai-ips',
    name: 'AI-Intrusion-Prevention-System',
    monogram: 'AI',
    year: '2026',
    status: 'Public',
    tagline: 'AI-powered intrusion prevention with a SOC dashboard.',
    description:
      'AI-powered Intrusion Prevention System with SOC dashboard — machine learning spots and blocks malicious traffic instead of relying on signature rules alone.',
    categories: ['Cybersecurity', 'AI / ML', 'Python'],
    tags: ['Python', 'Machine Learning', 'Security'],
    tech: ['Python', 'Machine Learning', 'Intrusion Detection', 'SOC Dashboard'],
    github: 'https://github.com/mrprivate2/AI-Intrusion-Prevention-System',
    live: '',
    accent: '#22c55e',
    accent2: '#0d3b1f',
    overview:
      'An AI-powered Intrusion Prevention System with a SOC dashboard — ML-based detection identifies and prevents malicious traffic, surfaced through an operator-friendly monitoring view.',
    problem:
      'Traditional intrusion prevention relies on known signatures, so novel or adaptive attacks slip through undetected.',
    solution:
      'Machine-learning analysis of network activity that flags anomalies and triggers prevention actions, with a SOC-style dashboard so operators can see and respond to threats.',
    architecture:
      'Python-based detection pipeline feeding a SOC dashboard — the model scores network activity and drives automated prevention responses.',
    features: [
      'ML-based threat detection beyond static signatures',
      'SOC-style monitoring dashboard',
      'Automated prevention on detected intrusions',
    ],
    challenges: [
      'Keeping false positives low enough for operators to trust the system',
      'Making detection fast enough to prevent, not just report',
    ],
    learned: [
      'Security tooling lives or dies on alert quality',
      'Prevention needs detection speed plus clear operator visibility',
    ],
  },
  {
    id: 'bussiness-twin-ai',
    name: 'Bussiness-twin-AI',
    monogram: 'BT',
    year: '2026',
    status: 'Public',
    tagline: 'Simulate business decisions before you commit.',
    description:
      'AI-powered enterprise digital twin platform for simulating business decisions, predicting risks, optimizing supply chains, and enabling data-driven decision-making.',
    categories: ['AI / ML', 'Python'],
    tags: ['Python', 'AI', 'Digital Twin', 'Supply Chain'],
    tech: ['Python', 'Machine Learning', 'Predictive Modeling', 'Data Analytics'],
    github: 'https://github.com/mrprivate2/Bussiness-twin-AI',
    live: '',
    accent: '#168044',
    accent2: '#22c55e',
    overview:
      'An AI-powered enterprise digital twin platform that simulates business decisions, predicts risks, optimizes supply chains, and enables data-driven decision-making.',
    problem:
      'Business decisions are expensive to test in the real world — wrong calls on strategy or supply chains are hard to reverse.',
    solution:
      'A digital-twin simulation layer that models business scenarios, so decisions can be simulated, risks predicted, and supply chains optimized before committing resources.',
    architecture:
      'Python-based platform: a simulation engine for business scenarios, ML models for risk prediction, and an analytics layer for data-driven decisions.',
    features: [
      'Simulate business decisions before committing resources',
      'ML-driven risk prediction',
      'Supply chain optimization scenarios',
      'Data-driven decision dashboards',
    ],
    challenges: [
      'Representing real business processes faithfully enough for the model to be useful',
      'Keeping simulation performance practical at enterprise scale',
    ],
    learned: [
      'Digital twins are only as good as the model’s fidelity to the real process',
      'Risk prediction shifts decisions from gut feel to measurable likelihood',
    ],
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    monogram: 'LC',
    year: '2026',
    status: 'Private',
    tagline: 'Java solutions, optimized and explained.',
    description:
      'A collection of my LeetCode solutions in Java with optimized approaches, detailed explanations, and clean code for interview preparation.',
    categories: ['Java'],
    tags: ['Java', 'DSA', 'Algorithms'],
    tech: ['Java', 'Data Structures', 'Algorithms'],
    github: 'https://github.com/mrprivate2/LeetCode',
    live: '',
    accent: '#39ff88',
    accent2: '#168044',
    overview:
      'A personal, growing collection of LeetCode solutions written in Java — each problem solved with an optimized approach, a short explanation, and clean, interview-ready code.',
    problem:
      'Interview preparation needs consistent practice and the ability to revisit solutions — scattered notes and one-off attempts don’t compound.',
    solution:
      'An organized repository of Java solutions with per-problem explanations, so patterns are easy to review before interviews.',
    architecture:
      'Organized by topic, with each solution file containing the approach, complexity notes, and the implementation.',
    features: [
      'Optimized Java solutions across core DSA topics',
      'Approach and explanation for each problem',
      'Clean, readable interview-style code',
    ],
    challenges: [
      'Balancing optimal time/space complexity with readable code',
      'Staying consistent — solving and documenting regularly',
    ],
    learned: [
      'Pattern recognition accelerates problem solving',
      'Explaining a solution is where the real learning happens',
    ],
  },
  {
    id: 'cardioadapt',
    name: 'CardioAdapt',
    monogram: 'CA',
    year: '2026',
    status: 'Public',
    tagline: 'Adaptive AI-powered cardio intelligence platform.',
    description: 'Adaptive AI-Powered Cardio Intelligence Platform — a web interface for cardiovascular health intelligence.',
    categories: ['AI / ML'],
    tags: ['HTML', 'AI'],
    tech: ['HTML', 'AI / ML'],
    github: 'https://github.com/mrprivate2/CardioAdapt',
    live: '',
    accent: '#22c55e',
    accent2: '#0d3b1f',
    overview:
      'CardioAdapt is an adaptive, AI-powered cardio intelligence platform — a web front end for cardiovascular health insights.',
    features: ['AI-powered cardio intelligence dashboard', 'Adaptive, health-focused web interface'],
  },
  {
    id: 'neuroverse',
    name: 'NeuroVerse',
    monogram: 'NV',
    year: '2026',
    status: 'Public',
    tagline: 'An EEG gaming app.',
    description: 'A brain-signal (EEG) driven gaming app with shader-based visuals.',
    categories: ['AI / ML'],
    tags: ['ShaderLab', 'EEG', 'Game Dev'],
    tech: ['ShaderLab', 'EEG Integration', 'Game Development'],
    github: 'https://github.com/mrprivate2/NeuroVerse',
    live: '',
    accent: '#168044',
    accent2: '#22c55e',
    overview: 'NeuroVerse is an EEG gaming app — gameplay responds to brain-signal input, rendered with shader-based visuals.',
    features: ['EEG-powered gameplay input', 'Shader-based visual effects'],
  },
  {
    id: 'content-maker',
    name: 'CONTENT-MAKER',
    monogram: 'CM',
    year: '2026',
    status: 'Private',
    tagline: 'A simple YouTube video maker.',
    description: 'A simple YouTube video maker built in Python.',
    categories: ['Python'],
    tags: ['Python', 'Video'],
    tech: ['Python', 'Video Processing'],
    github: 'https://github.com/mrprivate2/CONTENT-MAKER',
    live: '',
    accent: '#39ff88',
    accent2: '#168044',
    overview: 'CONTENT-MAKER is a simple YouTube video maker in Python — a scriptable pipeline for assembling video content.',
    features: ['Python-based video generation pipeline', 'Simple, scriptable workflow'],
  },
  {
    id: 'cli-student-manager',
    name: 'CLI-BASED-STUDENT-MANAGER',
    monogram: 'CS',
    year: '2025',
    status: 'Public',
    tagline: 'Manage student records from the terminal.',
    description: 'A command-line student management system in Python.',
    categories: ['Python'],
    tags: ['Python', 'CLI'],
    tech: ['Python', 'CLI'],
    github: 'https://github.com/mrprivate2/CLI-BASED-STUDENT-MANAGER',
    live: '',
    accent: '#22c55e',
    accent2: '#0d3b1f',
    overview: 'A command-line student management system in Python — manage student records from the terminal.',
    features: ['Terminal-based student record management', 'Python CLI workflow'],
  },
  {
    id: 'todo-list-js',
    name: 'todo-list-js',
    monogram: 'TD',
    year: '2025',
    status: 'Public',
    tagline: 'A simple To-Do List web app.',
    description: 'A simple To-Do List web app built with HTML, CSS, and JavaScript.',
    categories: [],
    tags: ['HTML', 'CSS', 'JavaScript'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/mrprivate2/todo-list-js',
    live: '',
    accent: '#168044',
    accent2: '#22c55e',
    overview: 'A simple To-Do List web app built with HTML, CSS, and JavaScript — add and complete tasks in the browser.',
    features: ['Add and complete tasks', 'Clean HTML/CSS/JS interface'],
  },
  {
    id: 'weather-app-js',
    name: 'WEATHER-APP-IN-JS-',
    monogram: 'WA',
    year: '2025',
    status: 'Public',
    tagline: 'A simple weather app in JavaScript.',
    description: 'A simple weather app built with HTML, CSS, and JavaScript.',
    categories: [],
    tags: ['HTML', 'CSS', 'JavaScript'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/mrprivate2/WEATHER-APP-IN-JS-',
    live: '',
    accent: '#39ff88',
    accent2: '#168044',
    overview: 'A simple weather app built with HTML, CSS, and JavaScript — look up current conditions in a clean interface.',
    features: ['Weather lookup interface', 'Vanilla JS data handling'],
  },
  {
    id: 'shopping-page',
    name: 'SHOPPINNNG-PAGE-',
    monogram: 'SP',
    year: '2026',
    status: 'Public',
    tagline: 'A JavaScript shopping page.',
    description: 'A JavaScript shopping page — a product browsing interface built with plain JS.',
    categories: [],
    tags: ['JavaScript', 'HTML', 'CSS'],
    tech: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/mrprivate2/SHOPPINNNG-PAGE-',
    live: '',
    accent: '#22c55e',
    accent2: '#0d3b1f',
    overview: 'A JavaScript shopping page — a product browsing interface built with plain JS.',
    features: ['Product listing interface', 'Vanilla JavaScript interactions'],
  },
  {
    id: 'svg-task1',
    name: 'SVG-task1',
    monogram: 'SV',
    year: '2026',
    status: 'Public',
    tagline: 'A JavaScript SVG task.',
    description: 'A small JavaScript task exploring SVG drawing and manipulation in the browser.',
    categories: [],
    tags: ['JavaScript', 'SVG'],
    tech: ['JavaScript', 'SVG'],
    github: 'https://github.com/mrprivate2/SVG-task1',
    live: '',
    accent: '#168044',
    accent2: '#22c55e',
    overview: 'SVG-task1 is a small JavaScript task exploring SVG drawing and manipulation in the browser.',
    features: ['SVG rendering with JavaScript', 'Lightweight browser-based task'],
  },
];

export const projectCategories = ['Featured', 'Full Stack', 'AI / ML', 'Cybersecurity', 'Java', 'Python', 'React'] as const;

export function projectsInCategory(category: string): Project[] {
  if (category === 'Featured') return projects;
  return projects.filter((p) => p.categories.includes(category));
}
