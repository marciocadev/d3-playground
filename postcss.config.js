module.exports = {
  plugins: {
    'postcss-nested': {},
    autoprefixer: {},
    'postcss-import': {},
    tailwindcss: {
      content: [
        './src/**/*.{js,jsx,ts,tsx}',
      ],
      theme: {
        extend: {},
      },
      plugins: [
        require('daisyui'),
      ],
    },
    ...(process.env.ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
  }
}
