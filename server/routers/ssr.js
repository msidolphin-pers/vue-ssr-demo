const serverRender = require('./server-render.js')
const Router = require('koa-router')
const path = require('path')
const fs = require('fs')
const VueServerRenderer = require('vue-server-renderer')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')

const router = new Router()

const renderer = VueServerRenderer.createBundleRenderer(path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'), {
  inject: false,
  clientManifest
})

const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

router.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = router
