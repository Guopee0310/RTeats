const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/assets/scss/style.scss";
        `
      },
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
  ?'/'
  // ? '/Guopee0310/RTeat/'
  : '/',
  outputDir: 'RTeat'
})