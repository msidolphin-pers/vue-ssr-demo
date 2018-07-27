const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'
  let context = {url: ctx.path}
  try {
    const appString = await renderer.renderToString(context)
    const html = ejs.render(template, {
      appString: appString,
      styles: context.renderStyles(),
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch (err) {
    console.error('render error', err)
    throw err
  }
}