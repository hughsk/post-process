var video = document.createElement('video')

var now = require('gl-now')
var pp  = require('./')
var fs  = require('fs')
var mousex = 0
var mousey = 0
var post

// Load up the video stream using
// getUserMedia
require('rtc-media')().render([video], function() {
  var shell = now({ clearColor: [0, 0, 0, 1] })
    .on('gl-init', init)
    .on('gl-render', render)


  // Creates the shader from "shader.frag". Note
  // that we're using brfs to inline this file
  // as a string.
  function init() {
    post = pp(shell.gl
      , video
      , fs.readFileSync(__dirname + '/shaders/mosaic.frag')
    )

    shell.element.addEventListener('mousemove', function(e) {
      mousex = e.x
      mousey = e.y
    })
  }

  var x = 250
  var y = 250
  var t = 0
  function render() {
    t += 1

    // If you want to update the shader, make
    // sure you bind it first or you'll get
    // a WebGL warning.
    post.shader.bind()
    post.shader.uniforms.t = t
    post.shader.uniforms.mousex = mousex
    post.shader.uniforms.mousey = mousey

    // All we need to do to render the canvas
    // to the GL context with post-processing :)
    post.render(shell.width, shell.height)
  }
})
