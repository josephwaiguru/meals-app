module.exports = {
  enabled: process.env.NODE_ENV === 'production',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
