/**
 * 最简单的示例
 */

const Vue = require('vue')
const express = require('express')
const {createRenderer} = require('vue-server-renderer')

const server = express()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `
      <div>访问的URL是: {{url}}</div>
    `
  })
  const renderer = createRenderer()
  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="zh-cn">
        <meta charset="utf-8">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

console.log('server is running at l27.0.0.1:9000.')

server.listen(9000)