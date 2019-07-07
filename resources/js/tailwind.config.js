module.exports = {
  theme: {
  	flex: {
  		default: 1,
  		'0': 0,
  		'1': 1,
  		'2': 2,
  		'3': 3,
  		'4': 4,
  		'5': 5,
  		'6': 6,
      '7': 8,
      '8': 8,
      '9': 9,
      '10': 10,
      '11': 11,
      '12': 12
  	},
    fontFamily: {
      'open': 'Open Sans'
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    extend: {}
  },
  variants: {},
  plugins: [
  	require('tailwindcss'),
    require('autoprefixer')
  ]
}
