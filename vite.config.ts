import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 這一段是救星：防止瀏覽器因為看不懂 process 而當機
  define: {
    'process.env': {}
  }
})
