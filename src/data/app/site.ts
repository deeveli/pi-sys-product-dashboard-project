export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://pi-sys-product-dashboard-project.vercel.app'
    : 'http://localhost:3000';

export const siteConfig = {
  name: 'deeveli',
  title: 'Next.js Starter Template',
  description:
    'Next.js bootstrapped by Tailwind CSS and Typescript setup with useful development features.',
  author: {
    name: 'Divine Elikplim Abah',
    url: 'https://deeveli.vercel.app',
    github: 'https://github.com/deeveli',
    twitter: '@mr_deeveli',
    linkedin: 'https://www.linkedin.com/in/deeveli/',
    email: 'divine.e.abah@gmail.com',
  },
  keywords: [
    'react',
    'typescript',
    'boilerplate-template',
    'nextjs',
    'nextjs-boilerplate',
    'nextjs-starter',
    'nextjs-template',
    'nextjs13',
    'app-directory',
    'tailwindcss',
    'tailwindcss-starter-kit',
    'eslint',
    'prettier',
  ],
};
