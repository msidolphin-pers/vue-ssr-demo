const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const app = new Koa()
const proxy = require('http-proxy-middleware')
const apiRouter = require('./routers/api.js')
const userRouter = require('./routers/user.js')
const createDb = require('./db')
const appConfig = require('../config/app.config.js')
const koaBody = require('koa-body')
const koaSession = require('koa-session')

app.keys = ['vue ssr'];
 
const SESSION_CONFIG = {
  key: 'vue-ssr-user',
  maxAge: 1 * 60 * 60 * 1000,
}

const db = createDb(appConfig.db.appId, appConfig.db.appKey)

const isDev = process.env.NODE_ENV === 'development'

app.use(koaSession(SESSION_CONFIG, app))

// middleware
app.use(koaBody())

app.use(async (ctx, next) => {
  try {
    console.log(`ctx.request = ${ctx.path}`)
    // 代理
    if (isDev && (ctx.path.endsWith('.js') || ctx.path.endsWith('.css') ||
      ctx.path.endsWith('.jpg') || ctx.path.endsWith('.jpeg')))  {
      ctx.respond = false
      return proxy({
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/public' : '/public'
        }
      })(ctx.req, ctx.res, next)
    }
    // apiCloud db
    ctx.db = db
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

// 使用Koa-send 处理静态资源
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    // root 根目录地址
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') } )
  } else {
    await next()
  }
})

let router

if (isDev) {
  router = require('./routers/dev-ssr.js')
} else {
  router = require('./routers/ssr.js')
  let staticRouter = require('./routers/static.js')
  app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
}

app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

app.use(userRouter.routes()).use(userRouter.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())


const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is running at ${HOST}:${PORT}`)
})


