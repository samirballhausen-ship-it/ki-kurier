/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'newspaper': {
          'bg': '#f5f1e8',
          'paper': '#fdfbf7',
          'ink': '#1a1a1a',
          'muted': '#4a4a4a',
          'border': '#d4c5a9',
          'accent': '#8b4513',
        }
      },
      typography: {
        newspaper: {
          css: {
            '--tw-prose-body': '#1a1a1a',
            '--tw-prose-headings': '#1a1a1a',
          }
        }
      }
    },
  },
  plugins: [],
}
