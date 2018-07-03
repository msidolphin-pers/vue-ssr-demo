var { EventEmitter } = require('events')

var life = new EventEmitter()


// 设置事件最大监听器
life.setMaxListeners(11)

life.on('event1', function(msg) {
  console.log('event1 ' + msg)
})

// 查看事件是否被监听过
/*
 * var has = life.emit('event1', 'invoke')
 */

 // 移除事件
 // removeListener(事件名, 回调方法（要和监听回调一致）)
 // removeAllListener([事件名])

 // 查询所有的事件
 // life.listeners(事件名)
 // EventEmitter.listenerCount(事件实例, 事件名)

life.emit('event1', 'invoke')