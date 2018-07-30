const Router = require('koa-router')

const apiRouter = new Router({prefix: '/api'})

const validateUser = async (ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need login'
  } else {
    await next()
  }
}

const serverResponse = data => {
  return {
    success: true,
    data,
    status: 200
  }
}

apiRouter.use(validateUser)

apiRouter
  .get('/todos', async ctx => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = serverResponse(todos)
  })
  .post('/todos', async ctx => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = serverResponse(data)
  })
  .put('/todos/:id', async ctx => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = serverResponse(data)
  })
  .delete('/todos/:id', async ctx => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = serverResponse(data)
  })
  .post('/delete/todos', async ctx => {
    const data = await ctx.db.deleteTodos(ctx.request.body.ids)
    ctx.body = serverResponse(data)
  })

module.exports = apiRouter
