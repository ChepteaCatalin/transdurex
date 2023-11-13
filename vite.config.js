const path = require('path');
const {defineConfig} = require('vite');

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/transducer.js'),
      name: 'transducer',
      fileName: format => `transducer.${format}.js`,
    },
  },
});
