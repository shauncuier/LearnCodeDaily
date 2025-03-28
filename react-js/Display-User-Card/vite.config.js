import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Swal from 'sweetalert2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Swal()],
})
