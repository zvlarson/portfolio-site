export const siteContent = {
  hero: {
    name: 'Zachary Larson',
    headline: 'I build products that users love and businesses rely on.',
    subheadline: 'Full-stack engineer specializing in scalable web applications and exceptional user experiences.',
    ctaPrimary: 'View My Work',
    ctaSecondary: 'Get In Touch',
  },

  proof: {
    title: 'Impact at Scale',
    items: [
      { metric: '50M+', description: 'Users served by applications I\'ve built' },
      { metric: '40%', description: 'Average performance improvement delivered' },
      { metric: '12+', description: 'Years of professional experience' },
      { metric: '99.9%', description: 'Uptime on production systems' },
    ],
  },

  about: {
    title: 'About Me',
    bio: `I'm a full-stack engineer passionate about building products that make a real difference. With over a decade of experience, I've led teams and shipped features used by millions.

My approach combines technical excellence with a deep understanding of user needs. I believe the best software is invisible—it just works, delighting users while solving complex problems under the hood.

When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring the next generation of developers.`,
    email: 'zachary@example.com',
    linkedin: 'https://linkedin.com/in/zacharylarson',
    github: 'https://github.com/zacharylarson',
  },

  projects: {
    title: 'Selected Work',
    subtitle: 'A few projects I\'m proud of',
  },

  testimonials: {
    title: 'What People Say',
    subtitle: 'Hear from colleagues and clients',
  },

  requestVideo: {
    title: 'Share Your Experience',
    subtitle: 'Record a short video testimonial about working with me',
    prompts: [
      'What project did we work on together?',
      'What was the biggest challenge we solved?',
      'How did our collaboration impact your team or business?',
      'What would you tell someone considering working with me?',
    ],
  },
};

export const placeholderProjects = [
  {
    id: '1',
    title: 'Enterprise Dashboard Platform',
    description: 'A real-time analytics dashboard serving 10,000+ daily active users with sub-second load times.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    image: null,
  },
  {
    id: '2',
    title: 'E-Commerce Checkout Redesign',
    description: 'Led complete redesign that increased conversion rate by 35% and reduced cart abandonment.',
    tags: ['React', 'Stripe', 'A/B Testing', 'UX'],
    image: null,
  },
  {
    id: '3',
    title: 'Developer Tools Suite',
    description: 'Internal tooling platform that reduced deployment time by 60% across engineering teams.',
    tags: ['TypeScript', 'Docker', 'CI/CD', 'AWS'],
    image: null,
  },
];
