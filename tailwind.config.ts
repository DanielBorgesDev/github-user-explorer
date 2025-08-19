import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0D1117',     
        'primary-medium': '#2F81F7',    
        'secondary-light': '#C9D1D9',   
        'secondary-dark': '#161B22',   
        'feedback-success': '#3FB950',  
        'feedback-error': '#F85149',    
        'feedback-warning': '#F0C929',  
        'highlight-purple': '#8257E5', 
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
