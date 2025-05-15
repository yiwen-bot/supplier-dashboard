/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // 扫描 app/ 目录下的所有文件
    './pages/**/*.{js,ts,jsx,tsx}', // 扫描 pages/ 目录（如果有）
    './components/**/*.{js,ts,jsx,tsx}', // 扫描 components/ 目录
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

