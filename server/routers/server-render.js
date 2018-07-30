const ejs = require('ejs')
const minifier = require('html-minifier').minify

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  let context = {
    url: ctx.path,
    request: ctx.cookies.request,
    user: ctx.session.user
  }
  try {
    const appString = await renderer.renderToString(context)
    if (context.router.currentRoute.fullPath !== ctx.path) {
      // 解决客户端首屏可能出现的页面跳转问题（未登录 => 登录页）
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    // vue-meta
    const $meta = context.meta.inject()
    const meta = {
      title: $meta.title.text()
    }
    let html = ejs.render(template, {
      appString: appString,
      styles: context.renderStyles(),
      scripts: context.renderScripts(),
      initialState: context.renderState(),
      meta
    })
    // 压缩Html
    html = minifier(html, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCss: true
    })
    ctx.body = html
  } catch (err) {
    console.error('render error', err)
    throw err
  }
}