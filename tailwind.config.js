/** @type {import('tailwindcss').Config} */

const alertColors = {
  120: '#C22538',
  100: '#DA3E51',
  20: '#F5CCD1',
  10: '#FDECEF'
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-120': '#7B6651',
        'primary-100': '#BF9D7D',
        'primary-80': '#D0B79F',
        'primary-60': '#E1D1C2',
        'primary-40': '#F1EAE4',
        'primary-10': '#F7F2EE',

        'success-120': '#299F65',
        'success-100': '#52DD7E',
        'success-20': '#BCFBBD',
        'success-10': '#E8FEE7',

        'info-120': '#1D66AC',
        'info-100': '#3BADEF',
        'info-20': '#B1EFFD',
        'info-10': '#E6FBFE',

        alert: alertColors,
        error: alertColors,

        netural: {
          120: '#140F0A',
          100: '#000000',
          80: '#4B4B4B',
          60: '#909090',
          40: '#ECECEC',
          10: '#F9F9F9',
          0: '#FFFFFF'
        }

        
      },
    },
  },
  plugins: [],
}
