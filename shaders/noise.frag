precision mediump float;

uniform float width;
uniform float height;
uniform sampler2D map;

uniform float t;
uniform float mousex;
uniform float mousey;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 position = vec2(
          gl_FragCoord.x / width,
    1.0 - gl_FragCoord.y / height
  );

  vec3  tex  = texture2D(map, position).rgb;
  vec2  dvec = vec2(mousex, height - mousey) - gl_FragCoord.xy;

  float lum = (tex.r + tex.g + tex.b) / 2.5 + (rand((position + vec2(t, -t)) * 100.0)) * 0.45;
  float dist = dvec.x*dvec.x+dvec.y*dvec.y;

  gl_FragColor = vec4(vec3(lum * max(0.0, 1.0 - dist / 200000.0)), 1.0);
}
