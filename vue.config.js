const {
    defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ]
})

module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.sol$/,
            use: 'solidity-loader',
          },
        ],
      },
      resolve: {
        fallback: {
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
        },
      },
    },
  };
  