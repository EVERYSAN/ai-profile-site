// postcss.config.js
module.exports = {
  plugins: {
    // ここを tailwindcss から @tailwindcss/postcss に変更
    '@tailwindcss/postcss': {},
    'autoprefixer': {}
  }
}
