var e = function(sel) {
  var e =  document.querySelector(sel)
  return e
}
var log = console.log.bind(console)
// 判断相撞
var rectIntersects = function(a, b) {
  if (a.y < b.y && a.y + a.image.height > b.y) {
    if (a.x < b.x && a.x + a.image.width > b.x) {
      return true
    }
  }
  return false
}
// 画图
var imageFromPath = function(path) {
  var img = new Image()
  img.src = path
  return img
}
// var imageByName = function() {
//
// }
