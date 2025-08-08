module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [
    require('@tailwindcss/forms'),        // ⬅️ example; add any you use
    // more plugins here
  ],
};
