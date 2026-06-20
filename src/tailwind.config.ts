/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./App.jsx",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'herb-green': '#5D8A66',
        'herb-light': '#6B9B76',
        'herb-pale': '#7AAB86',
        'rice-brown': '#C4A77D',
        'rice-light': '#D4B88D',
        'cream': '#FAF6F0',
        'cream-dark': '#F5F0E8',
        'wood-dark': '#5C4033',
        'wood-light': '#7A5C48',
        'sandal-red': '#A85C4A',
        'text-muted': '#8B7355',
      },
      fontFamily: {
        'sans': ['Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'serif': ['Noto Serif SC', 'Songti SC', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(92, 64, 51, 0.08)',
        'floating': '0 4px 12px rgba(93, 138, 102, 0.3)',
      },
    },
  },
  plugins: [],
}
