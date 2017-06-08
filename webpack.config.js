const config = {
  entry: {
    app: './src/app.js'
  },

  output: {
    filename: 'dist/app.js'
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}

module.exports = config
