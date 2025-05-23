import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'
import mdx from '@mdx-js/rollup'
// // https://vitejs.dev/config/
export default defineConfig({
   
    base: './',
    build: {
      outDir: 'build',
      commonjsOptions: {
        include: ["tailwind.config.js", "node_modules/**"],
      },
    },
    // optimizeDeps: {
    //   include: ["tailwind-config"],
    // },
    // css: {
    //   postcss: {
    //     plugins: [
    //       autoprefixer({}), // add options if needed
    //     ],
    //   },
    //   preprocessorOptions: {
    //     scss: {
    //       quietDeps: true,
    //     },
    //   },
    // },
    // plugins: [
      
    //   react()
    // ],
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
  
})

