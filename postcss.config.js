const COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'Android >= 2.3',
  'ios >= 7',
];

module.exports = {
  // eslint-disable-next-line global-require
  plugins: [require('autoprefixer')({ overrideBrowserslist: COMPATIBILITY })],
};
