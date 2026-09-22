import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        paper: '#ffffff',
        toast: '#ff6a00',
        toastDark: '#d9480f',
        mint: '#b6e2d3',
        berry: '#8f4c6d'
      },
      boxShadow: {
        panel: '0 18px 45px rgba(17, 24, 39, 0.14)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top, rgba(255, 106, 0, 0.22), transparent 30%), linear-gradient(135deg, #ffffff, #fff5eb)'
      }
    }
  },
  plugins: []
};

export default config;