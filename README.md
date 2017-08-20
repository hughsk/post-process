# post-process [![deprecated](http://hughsk.github.io/stability-badges/dist/deprecated.svg)](http://github.com/hughsk/stability-badges) #

[![post-process](https://nodei.co/npm/post-process.png?mini=true)](https://nodei.co/npm/post-process)

**Deprecated: you may find this useful as a reference, but it's otherwise more worthwhile writing your own implementation :)**

A generic GLSL post-processing module for applying super-speedy GPU effects to
any `<img>`, `<canvas>` or `<video>` element. If you're already working with a
3D scene you're better off using
[an FBO](http://github.com/mikolalysenko/gl-fbo), but this is useful for cases
where you've already got a 2D canvas/video thing and just want to add some
niceties.

## Usage ##

### `post = pp(gl, element, frag[, vert])` ###

Takes the following and returns a new post-processing object:

* `gl` is a WebGL canvas context.
* `element` is a canvas element, video or image.
* `frag` is a fragment shader, which may either be specified as a string or
  as a [gl-shader](http://github.com/mikolalysenko/gl-shader).
* `vert` is a vertex shader, and optional - you'll only need to specify this
  in special cases.

Your shader is supplied the following uniforms:

* `float width`: the width of the element in pixels.
* `float height`: the height of the element in pixels.
* `sampler2D map`: the `element` you specified as a texture.

### `post.render([width, height])` ###

Renders `element` to `gl`, using the shader specified above. You can
optionally pass a `width` and `height` value to override the defaults,
which are the dimensions of `element`.
