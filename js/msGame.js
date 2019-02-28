// draw 、events、注册事件...
var MsGame = function(fps, images, runCallback) {
  // images是一个对象，里面是图片的引用名字和图片路径
  // 程序会在所有图片载入成功后运行
  var canvas = document.querySelector('#canvas')
  var context = canvas.getContext('2d')
  var g = {
    canvas: canvas,
    context: context,
    actions: {},
    keydowns: {},
    images: {},
  }
  // draw
  g.drawImage = function(msImage) {
    g.context.drawImage(msImage.image, msImage.x, msImage.y)
  }
  // events
  window.addEventListener('keydown', function(event) {
    g.keydowns[event.key] = true
  })
  window.addEventListener('keyup', function(event) {
    g.keydowns[event.key] = false
  })
  // 注册事件
  g.registerAction = function(key, callback) {
    g.actions[key] = callback
  }
  // timer 通过每秒的移动次数来减少画面抖动
  window.fps = 30
  var runloop = function() {
    // updata events
    var actions = Object.keys(g.actions)
    for (var i = 0; i < actions.length; i++) {
      var key = actions[i]
      if (g.keydowns[key]) {
        // 如果按键被按下，调用注册的action
        g.actions[key]()
      }
    }
    // update
    g.update()
    // clear
    context.clearRect(0, 0, g.canvas.width, g.canvas.height)
    // draw
    g.draw()
    // next runloop
    setTimeout(function() {
      runloop()
    }, 1000/window.fps)
  }
  var loads = []
  // 预先载入所有图片
  var names = Object.keys(images)
  for (var i = 0; i < names.length; i++) {
    let name = names[i]
    var path = images[name]
    let img = new Image()
    img.src =  path
    img.onload = function() {
      // 所有图片都成功载入之后，调用run
      g.images[name] = img
       loads.push(1)
       if (loads.length == names.length) {
         g.run()
       }
    }
  }
  g.imageByName = function(name) {
    var img = g.images[name]
    var image = {
      w: img.width,
      h: img.height,
      image: img,
    }
    return image
  }
  g.run = function() {
    runCallback(g)
    // 开始运行程序
    setTimeout(function() {
      runloop()
    }, 1000/window.fps)
  }
  return g
}
