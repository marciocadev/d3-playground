module.exports = {
  plugins: {
    'postcss-nested': {},
    autoprefixer: {},
    'postcss-import': {},
    tailwindcss: {},
    ...(process.env.ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
  }
}
