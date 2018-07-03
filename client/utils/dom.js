/**
 * dom.js 与dom有关的公共函数
 */
'use strict'

import Vue from 'vue'

const isServer = Vue.prototype.$isServer

var scrollBarWidth = null

const dom = {
  on: function (el, event, handler) {
    if (!isServer && document.addEventListener) {
      return (function (el, event, handler) {
        if (el && event && handler) el.addEventListener(event, handler, false)
      }(el, event, handler))
    } else {
      // IE 6 thru 10
      return (function (el, event, handler) {
        if (el && event && handler) el.attachEvent('on' + event, handler)
      }(el, event, handler))
    }
  },
  off: function (el, event, handler) {
    if (!isServer && document.removeEventListener) {
      return (function (el, event, handler) {
        console.log(handler)
        if (el && event && handler) el.removeEventListener(event, handler, false)
      }(el, event, handler))
    } else {
      // IE 6 thru 10
      return (function (el, event, handler) {
        if (el && event && handler) el.detachEvent('on' + event, handler)
      }(el, event, handler))
    }
  },
  hasClass: function (el, cls) {
    if (!el || !cls) return false
    if (!cls) throw new Error('className cannot be empty.')
    if (el.classList) return el.classList.contains(cls)
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  },
  addClass: function (el, cls) {
    if (!el || !cls) return
    if (!cls) throw new Error('className cannot be empty.')
    var curClass = el.className
    var classes = cls.split(' ')
    for (var i = 0; i < classes.length; ++i) {
      var clsName = classes[i]
      if (!clsName) continue
      if (!this.hasClass(el, clsName)) {
        if (el.classList) el.classList.add(clsName)
        else {
          if (!curClass) curClass += clsName // className is empty
          else curClass += ' ' + clsName
        }
      } else continue
    }
    if (!el.classList) el.className = curClass
  },
  removeClass: function (el, cls) {
    if (!el || !cls) return
    if (!cls) throw new Error('className cannot be empty.')
    var curClass = el.className
    var classes = cls.split(' ')
    for (var i = 0; i < classes.length; ++i) {
      var clsName = classes[i]
      if (this.hasClass(el, clsName)) {
        if (el.classList) el.classList.remove(clsName)
        else {
          if (curClass.indexOf(' ' + clsName + ' ') > -1) curClass = curClass.replace(new RegExp(' ' + clsName + ' '), ' ')
          else if ((curClass.indexOf(' ' + clsName) > -1)) curClass = curClass.replace(new RegExp(' ' + clsName), '')
          else if ((curClass.indexOf(clsName + ' ') > -1)) curClass = curClass.replace(new RegExp(clsName + ' '), '')
          else curClass = curClass.replace(new RegExp(clsName), '')
        }
      }
    }
    if (!el.classList) el.className = curClass
  },
  getScreenRect: function () {
    // Opera incompatible screenLeft
    var leftPos = (typeof window.screenLeft === 'number') ? window.screenLeft : window.screenX
    var topPos = (typeof window.screenTop === 'number') ? window.screenTop : window.screenY
    return {
      left: leftPos,
      top: topPos
    }
  },
  getScrollBarWidth () {
    /* 获取滚动条宽度 */
    if (isServer) return 0
    if (scrollBarWidth !== null) return scrollBarWidth
    const outer = document.createElement('div')
    outer.className = 'v-scrollbar-container'
    outer.style.visibility = 'hidden'
    outer.style.width = '100px'
    outer.style.position = 'absolute'
    outer.style.top = '-99999px'
    document.body.appendChild(outer)
    const widthNoScroll = outer.offsetWidth // 可视宽度
    outer.style.overflow = 'scroll'
    const inner = document.createElement('div')
    inner.style.width = '100%'
    outer.appendChild(inner)
    const widthWithScroll = inner.offsetWidth
    outer.parentNode.removeChild(outer)
    scrollBarWidth = widthNoScroll - widthWithScroll
    return scrollBarWidth
  },
  nextTick (callback, params) {
    if (!callback) return
    setTimeout(() => {
      typeof callback === 'function' && callback(params)
    }, 20)
  }
}

Vue.prototype.$dom = dom

export default dom
