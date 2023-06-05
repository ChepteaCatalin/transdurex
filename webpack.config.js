const { resolve } = require("path");

module.exports = {
  entry: "./src/transducer.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "transducer.js",
    globalObject: "this",
    library: {
      name: "transducer",
      type: "umd",
    },
  },
};
