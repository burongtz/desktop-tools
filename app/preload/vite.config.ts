import {builtinModules} from 'node:module'
import {defineConfig} from 'vite'

export default defineConfig({
  envDir: process.cwd(),
  root: __dirname,
  base: './',
  build: {
    outDir: '../../dist',
    sourcemap: false,
    emptyOutDir: false,
    // target: 'node14',
    lib: {
      entry: './src/main.ts',
      // Define the build format, Electron support CJS.
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules.flatMap((p) => [p, `node:${p}`]),
      ],
      output: {
        entryFileNames: 'preload.js',
      },
    },
  },
})
