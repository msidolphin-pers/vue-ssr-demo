/**
 * 使用模板
 * 模板应该包含 <!--vue-ssr-outlet--> 占位符
 */

const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const {createRenderer} = require('vue-server-renderer')

const server = express()

const template = fs.readFileSync('../server.template.html', 'utf-8')

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `
      <div>访问的URL是: {{url}}</div>
    `
  })
  const renderer = createRenderer({
    template
  })

  const context = {
    title: 'Hello Vue Server Renderer'
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

console.log('server is running at l27.0.0.1:9000.')

server.listen(9000)