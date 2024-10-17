import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MeteoReact/', // Assurez-vous que cela correspond à votre nom de dépôt

})
