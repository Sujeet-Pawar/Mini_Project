/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2C5F6F',      // Dark teal blue
        secondary: '#5B8A9F',    // Medium blue-gray
        accent: '#D4C4B0',       // Beige/tan
        bgLight: '#F5F3F0',      // Light cream
        bgDark: '#1A3A47',       // Darker teal
        textPrimary: '#2C5F6F',  // Dark teal blue
        textSecondary: '#5B8A9F', // Medium blue-gray
        success: '#5B8A9F',      // Medium blue-gray
        error: '#D4756B',        // Muted red-brown
      },
    },
  },
  plugins: [],
}
