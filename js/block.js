// 砖块
var Block = function(game, position) {
  // position 是 [0, 0]格式
  var p = position
  var o = game.imageByName('block')
  o.x = p[0],
  o.y = p[1],
  o.w = o.w,
  o.h = o.h,
  o.alive = true,
  o.lives = p[2] || 1,
  // var o = {
  //   img: imageFromPath('./static/image/block.png'),
  //   x: p[0],
  //   y: p[1],
  //   w: 30,
  //   h: 20,
  //   alive: true,
  //   lives: p[2] || 1,
  // }
  o.kill = function() {
    o.lives--
    if (o.lives < 1) {
      o.alive = false
    }
  }
  o.collide = function(ball) {
    return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))

  }
  return o
}
