import type { Config } from 'tailwindcss';

const config: Config = {
  content: [  
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      opacity: {
        '1': '.1'
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        black:{
          100: '#14161B',
          110: '#151619',
        },

      },
      boxShadow: {
        'custom': '0px 4px 20px rgba(255, 100, 0, 0.5)'
      },
    },
    keyframes: {  
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
