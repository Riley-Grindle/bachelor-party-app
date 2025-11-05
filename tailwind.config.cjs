/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: '#fbbf24',  // GOLD
          light: '#fcd34d',
          dark: '#d97706',
        },
        accent: {
          DEFAULT: '#6497bf',  // BLUE
          light: '#9fcbee',
          dark: '#3D5C74',
        },
        primary: {
          DEFAULT: '#F37760',  // RED
          light: '#ffb09c',
          dark: '#900000',
        },
        background: {
          dark: '#05080b',
          card: '#0f172a',
        }
      },
    },
  },
  plugins: [],
}
