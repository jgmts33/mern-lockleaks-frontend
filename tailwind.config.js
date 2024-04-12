/** @type {import('tailwindcss').Config} */


const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        medium: ['18px', '27px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        md:['34px','39.88px'],
        huge:['70px','100px'],
      },
      colors: {
        'purple-light' : '#B759FF',
        'purple-weight' : '#F68171'
      },
    }
  },
  plugins: [nextui()],
}