var loadLevel = function(g, n) {
  n = n - 1
  var level = levels[n]
  var blocks = []
  for (var i = 0; i < level.length; i++) {
    var p = level[i]
    var b = Block(g, p)
    blocks.push(b)
  }
  return blocks
}
var block = []
var enableDebugMode = function(g, enable) {
  if (!enable) {
    return
  }
  window.pause = false
  window.addEventListener('keydown', function(event) {
    var k = event.key
    // 暂停
    if (k == 'p') {
      window.pause = !window.pause
    // 载入关卡
    } else if ('1234567'.includes(k)) {
      blocks = loadLevel(g, Number(k))
    }
  })
}
// 控制速度
document.querySelector('#id-input-speed').addEventListener('input', function(event) {
  var input = event.target
  window.fps = Number(input.value)
})
var __main = function() {
  var images = {
    ball: './static/image/ball.png',
    block: './static/image/block.png',
    paddle: './static/image/paddle.png',
  }
  var game = MsGame(30, images, function(g) {
    var paddle = Paddle(game)
    var ball = Ball(game)
    var scroe = 0
    blocks = loadLevel(game, 1)
    // 挡板左移
    game.registerAction('a', function() {
      paddle.moveLeft()
    })
    // 挡板右移
    game.registerAction('d', function() {
      paddle.moveRight()
    })
    // 发射弹球
    game.registerAction('f', function() {
      ball.fire()
    })
    // uodate x
    game.update = function() {
      // 暂停
      if (pause) {
        return
      }
      ball.move()
      // 判断block和 paddle相撞
      if (paddle.collide(ball)) {
        ball.speedY *= -1
      }
      // 判断与blocks相撞
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        if (block.collide(ball)) {
          block.kill()
          log('相撞')
          ball.rebound()
          scroe += 10
        }
      }
    }
    // draw
    game.draw = function() {
      game.drawImage(paddle)
      game.drawImage(ball)
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i]
        if (block.alive) {
          game.drawImage(block)
        }
      }
      game.context.fillText('分数：' + scroe, 10, 290)
    }
  })
  enableDebugMode(game, true)

}


__main()
