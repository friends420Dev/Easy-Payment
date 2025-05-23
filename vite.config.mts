

import { defineConfig, loadEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // You might need this if you uncomment the alias section
import mdx from '@mdx-js/rollup'

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL: string = `${env.VITE_APP_BASE_NAME}`;
  const PORT: string = '3000';

  return {
    base: './',
    build: {
      outDir: 'build',
      commonjsOptions: {
        include: ["tailwind.config.js", "node_modules/**"],
      },
    },

    plugins: [
      { enforce: 'pre', ...mdx() },
      react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    ],
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000,
      proxy: {
        // https://vitejs.dev/config/server-options.html
      },
    },
  }
});