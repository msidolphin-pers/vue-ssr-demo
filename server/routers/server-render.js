const ejs = require('ejs')
const $global = require('../../client/utils/global')
const minifier = require('html-minifier').minify

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  let context = {
    url: ctx.path,
    request: ctx.cookies.request
  }
  try {
    const appString = await renderer.renderToString(context)
    // vue-meta
    const $meta = context.meta.inject()
    const meta = {
      title: $meta.title.text()
    }
    let html = ejs.render(template, {
      appString: appString,
      styles: context.renderStyles(),
      scripts: context.renderScripts(),
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