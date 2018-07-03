// vue-style-loader
module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCSS: !isDev,
    cssModules: {},
    // postcss
    hotReload: isDev, // 是否打开热重载 不需要设置 应该vue会根据ENV环境变量判断
    loaders: {
      // 自定义
      // js: 
      // html:
      // style:
    },
    preLoader: {
      // js: 
      // html:
      // style:
    }
  }
}