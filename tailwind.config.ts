import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0f3460',
        'navy-dark': '#16213e',
        ink: '#1a1a2e',
        category: {
          childProtection: '#667eea',
          childProtectionEnd: '#764ba2',
          familyCourt: '#11998e',
          familyCourtEnd: '#38ef7d',
          legalServices: '#fc4a1a',
          legalServicesEnd: '#f7b733',
          legalAid: '#141e30',
          legalAidEnd: '#243b55',
          education: '#8e44ad',
          educationEnd: '#9b59b6',
        },
      },
    },
  },
  plugins: [],
}
export default config
