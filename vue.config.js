module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss";@import "@/styles/_mixins.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-media/'
  : '/'
};
