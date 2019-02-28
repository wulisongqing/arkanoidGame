// 小球
var Ball = function(game) {
  var o = game.imageByName('ball')
  // var o = {
  //   img: imageFromPath('./static/image/ball.png'),
  //   x: 185,
  //   y: 250,
  //   speedX: 10,
  //   speedY: 10,
  //   fired: false,
  // }
  o.x = 185
  o.y = 250
  o.speedX = 10
  o.speedY = 10
  o.fired = false
  o.fire = function() {
    o.fired = true
  }
  o.move = function() {
    if (o.fired) {
      if (o.x < 0 || o.x > 400) {
        o.speedX = -o.speedX
      } else if (o.y < 0 || o.y > 300) {
        o.speedY = -o.speedY
      }
      // move
      o.x += o.speedX
      o.y += o.speedY
    }
  }
  o.rebound = function() {
    o.speedY = -o.speedY
  }
  return o
}
