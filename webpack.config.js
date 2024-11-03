const path = require('path');

module.exports = {
  // ... otras configuraciones de Webpack

  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    },
    output: {
      publicPath: './cacao/', // adjust to your desired subpath
    } 
  },
  // ...
};
