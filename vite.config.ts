/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const cherryPickedKeys = [
  "REACT_APP_API_BASE_URL",
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv: any = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
  }
})