import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        paper: '#f8f2e8',
        toast: '#c77d3f',
        toastDark: '#7c3d1c',
        mint: '#b6e2d3',
        berry: '#8f4c6d'
      },
      boxShadow: {
        panel: '0 18px 45px rgba(17, 24, 39, 0.14)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top, rgba(199, 125, 63, 0.18), transparent 32%), linear-gradient(135deg, rgba(17, 24, 39, 0.96), rgba(33, 41, 55, 0.9))'
      }
    }
  },
  plugins: []
};

export default config;