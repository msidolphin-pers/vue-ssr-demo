/**
 * exports = ...是一个理想的方式
 * 但是exports其实是作为一个形参传递到模块的
 * 直接改变exports的值会改变形参的引用，但是并不能改变作用域外的值
 * 所以exports直接赋值会得出错误的结果
 */
// exports = function () {
//   var a = 10
//   console.log(a)
// }

// 正确的方式1
// exports.fun = function () {
//   var a = 10
//   console.log(a)
// }

// 正确的方式2 迂回方案，没有改变形参exports的引用
module.exports = {
  fun: function () {
    var a = 10
    console.log(a)
  }
}
