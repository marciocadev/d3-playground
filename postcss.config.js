module.exports = {
  plugins: {
    'postcss-nested': {},
    autoprefixer: {},
    'postcss-import': {},
    ...(process.env.ENV === 'production' ? { cssnano: {preset:'default'} } : {})
  }
};