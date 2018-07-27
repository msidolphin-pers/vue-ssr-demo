const path = require('path')
const Router = require('koa-router')
const Axios = require('axios')
const MemoryFs = require('memory-fs')
const Webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const fs = require('fs')

const serverConfig = require('../../build/webpack.config.server.js')
const serverRender = require('./server-render.js')

const serverCompiler = Webpack(serverConfig)
const memoryFs = new MemoryFs()

serverCompiler.outputFileSystem = memoryFs

// vue-ssr-server-bundle.json VueServerPlugin默认打包的文件名 filename指定文件名
const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

// webpack 打包生成的文件
let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(error => console.error(error))
  stats.warnings.forEach(warn => console.warn(warn))
  // 文件改变重新打包
  bundle = JSON.parse(memoryFs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated.')
})



const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'wait....'
    return
  }
  // vue-ssr-client-manifest.json VueClientPlugin默认打包的文件
  const clientManifestResp = await Axios.get('http://127.0.0.1:9000/vue-ssr-client-manifest.json')
  const manifest = clientManifestResp.data
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false, // 不进行注入
    clientManifest: manifest
  })
  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
