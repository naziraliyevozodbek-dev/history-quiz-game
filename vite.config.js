import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/history-quiz-game/', // GitHub repozitoriy nomi bilan bir xil bo'lishi kerak
})
