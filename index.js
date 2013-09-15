var createTexture = require('gl-texture2d')
var createShader  = require('gl-shader')
var createBuffer  = require('gl-buffer')
var createVAO     = require('gl-vao')

module.exports = PostProcess

function PostProcess(gl, el, frag, vert) {
  if (!(this instanceof PostProcess)) return new PostProcess(gl, el, frag, vert)

  this.gl = gl

  this.el = el
  this.texture = createTexture(gl, el)
  this.texture.minFilter = gl.NEAREST
  this.texture.maxFilter = gl.NEAREST
  this.texture.wrapS = gl.CLAMP_TO_EDGE
  this.texture.wrapT = gl.CLAMP_TO_EDGE

  this.dynamic = (
    el instanceof HTMLCanvasElement ||
    el instanceof HTMLVideoElement
  )

  this.shader = typeof frag !== 'string'
    ? frag : createShader(gl
      , vert || defaultVertexShader
      , frag
    )

  var verts = new Float32Array([
    -1, -1,  +1, -1,  -1, +1,
    -1, +1,  +1, -1,  +1, +1,
  ])

  this.vao = createVAO(gl, null, [{
    buffer: createBuffer(gl, verts)
    , type: gl.FLOAT
    , size: 2
    , offset: 0
    , stride: 0
    , normalized: false
  }])
}

PostProcess.prototype.render = function(width, height) {
  var gl = this.gl

  this.vao.bind()

  // send updates to the GPU each frame
  // for video and canvas elements, otherwise
  // you'll only get a static frame.
  this.texture.bind(0)
  if (this.dynamic) this.gl.texImage2D(
      gl.TEXTURE_2D
    , 0
    , gl.RGBA
    , gl.RGBA
    , gl.UNSIGNED_BYTE
    , this.el
  )

  this.shader.bind()
  this.shader.uniforms.width = width || this.el.width
  this.shader.uniforms.height = height || this.el.height

  this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)

  this.vao.unbind()
}

var defaultVertexShader = [
    'attribute vec3 position;'
  , 'void main() {'
  , '  gl_Position = vec4(position, 1.0);'
  , '}'
].join('\n')
