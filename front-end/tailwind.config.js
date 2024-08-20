/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'white-1': '#FFFFFF',
        'white-2': '#F8F8F8',
        'white-3': '#E6E6E6',
        'white-4': '#F2F2F2',
        'black-1': '#333333',
        'grey-1': '#767676',
        'red-1': '#C35255',
        'red-2': '#C80036'
      },
      fontSize: {
        'xss': '14px'
      },
      keyframes: {
        'loading' : {
          '0%' : {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        'loading': 'loading 1s ease-in infinite'
      }
    },
  },
  plugins: [],
};
