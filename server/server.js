const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const app = new Koa()
const router = require('./routers/dev-ssr.js')

const isDev = process.env.NODE_ENV === 'development'


// middleware
app.use(async (ctx, next) => {
  try {
    console.log(`ctx.request = ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later.'
    }
  }
})

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

// 使用Koa-send 处理静态资源
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    // root 根目录地址
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') } )
  } else {
    await next()
  }
})

// TODO
app.use(router.routes()).use(router.allowedMethods())


app.listen(PORT, HOST, () => {
  console.log(`server is running at ${HOST}:${PORT}`)
})
