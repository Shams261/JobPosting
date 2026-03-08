import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the React client.  This setup enables
// JSX/TSX support via the React plugin and leaves most options at
// their defaults.  Running `npm run dev` will start the dev server
// on localhost:5173 by default.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});