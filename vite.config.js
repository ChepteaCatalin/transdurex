import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/transdurex.js'),
      name: 'transdurex',
      fileName: 'transdurex',
    },
  },
  test: {
    globals: true,
  },
});
