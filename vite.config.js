const path = require('path');
const {defineConfig} = require('vite');

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/transdurex.js'),
      name: 'transdurex',
      fileName: format => `transdurex.${format}.js`,
    },
  },
});
