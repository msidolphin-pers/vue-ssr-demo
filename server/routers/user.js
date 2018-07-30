const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

const serverResponse = data => {
  return {
    success: true,
    data,
    status: 200
  }
}

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'admin' && user.password === '123456') {
    ctx.session.user = {
      username: 'admin'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'admin'
      },
      status: 200
    }
  } else {
    ctx.body = {
      success: false,
      message: 'username or password error.',
      status: 200
    }
  }
})
module.exports = userRouter
