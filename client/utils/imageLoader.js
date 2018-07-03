/**
 * 图片预加载函数
 */
'use strict'

const extend = require('./extend.js')

var _id = 0

function _getId () {
  return ++_id
}

/**
 * 预加载图片
 * options: {
 *  images:  array    待加载的图片数组 元素格式 {src: '...'}
 *  success: callback 加载完毕执行的回调函数
 *  error:   callback 加载错误执行的回调函数
 *  enter:   callback 加载一张图片执行的回调函数
 *  timeout: [undefined, number, string]  超时时间 undefined 0 '0' 表示不设置超时
 * }
 * @param {Object} options [选项]
 */
function loadImages (options) {
  var count = 0
  var _options = {
    timeout: undefined
  }
  // merge
  extend(_options, options)
  var images = _options.images
  // 遍历数值
  for (let key in images) {
    console.log(key)
  }
}

module.exports = loadImages

