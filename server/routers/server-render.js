const ejs = require('ejs')
const minifier = require('html-minifier').minify

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  let context = {url: ctx.path}
  try {
    const appString = await renderer.renderToString(context)
    let html = ejs.render(template, {
      appString: appString,
      styles: context.renderStyles(),
      scripts: context.renderScripts()
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