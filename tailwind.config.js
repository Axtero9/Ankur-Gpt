/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      colors: {
        chatgpt: {
          sidebar: '#171717',
          main: '#212121',
          surface: '#2f2f2f',
          hover: '#2a2a2a',
          border: '#383838',
          borderLight: '#424242',
          text: '#ececec',
          muted: '#b4b4b4',
          dim: '#8e8e8e',
          blue: '#10a37f' // ChatGPT green/accent or standard blue
        }
      }
    },
  },
  plugins: [],
}
