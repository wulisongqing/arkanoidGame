// 挡板
var Paddle = function(game) {
  var o = game.imageByName('paddle')
  // var o = {
  //   img: imageByName('./static/image/paddle.png'),
  //   x: 70,
  //   y: 270,
  //   speed: 15,
  // }
  o.x = 70
  o.y = 270
  o.speed = 15
  o.move = function(x) {
    if (x < 0) {
      x = 0
    }
    if (x > 400 - o.image.width) {
      x = 400 - o.image.width
    }
    o.x = x
  }
  o.moveLeft = function() {
    o.x -= o.speed
    o.move(o.x - o.speed)
  }
  o.moveRight = function() {
    o.move(o.x + o.speed)
  }
  o.collide = function(ball) {
    if (ball.y + ball.image.height > o.y) {
      if (ball.x > o.x && ball.x < o.x + o.image.width) {
        return true
      }
    }
    return false
  }
  return o
}
