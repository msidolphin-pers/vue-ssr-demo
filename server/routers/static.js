/**
 * 处理静态资源
 */
const Router = require('koa-router')
const send = require('koa-send')

// 仅处理/dist开头的路径
const router = new Router({prefix: '/dist'})

router.get('*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = router
