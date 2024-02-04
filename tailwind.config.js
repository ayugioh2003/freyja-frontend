/** @type {import('tailwindcss').Config} */

const getColors = (semanticColorList, colorLevelMap) => {
  if (!colorLevelMap[100]) {
    console.error('沒有 100 level，不能用啦')
  }

  const obj = {}

  for (const name of semanticColorList) {
    obj[name] = colorLevelMap['100']

    for (const level in colorLevelMap) {
      obj[`${name}-${level}`] = colorLevelMap[level]
    }
  }

  return obj
}

const colors = {
  ...getColors(['primary'], {
    120: '#7B6651',
    100: '#BF9D7D',
    80: '#D0B79F',
    60: '#E1D1C2',
    40: '#F1EAE4',
    10: '#F7F2EE',
  }),

  ...getColors(['success'], {
    120: '#299F65',
    100: '#52DD7E',
    20: '#BCFBBD',
    10: '#E8FEE7',
  }),

  info: '#3BADEF',
  ...getColors(['info'], {
    120: '#1D66AC',
    100: '#3BADEF',
    20: '#B1EFFD',
    10: '#E6FBFE',
  }),

  ...getColors(['alert', 'error'], {
    120: '#C22538',
    100: '#DA3E51',
    20: '#F5CCD1',
    10: '#FDECEF',
  }),

  ...getColors(['netural'], {
    120: '#140F0A',
    100: '#000000',
    80: '#4B4B4B',
    60: '#909090',
    40: '#ECECEC',
    10: '#F9F9F9',
    0: '#FFFFFF',
  }),
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
    },
  },
  daisyui: {
    // styled: true,
    themes: [
      {
        mytheme: {
          ...colors,
        },
      },
    ],
    btn: colors,
  },
  plugins: [require('daisyui')],
}
