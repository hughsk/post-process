precision mediump float;

uniform float width;
uniform float height;
uniform sampler2D map;
uniform float t;

const float pixel = 10.0;
const float edges = 0.02;
const float depth = 8.0;
const float shift = 5.0;

void main() {
  vec2 position = vec2(gl_FragCoord.x / width, 1.0 - gl_FragCoord.y / height);
  vec2 samplePos = position.xy;

  samplePos.x = floor(samplePos.x * (width / pixel)) / (width / pixel);
  samplePos.y = floor(samplePos.y * (height / pixel)) / (height / pixel);

  float st = sin(t * 0.005);
  float ct = cos(t * 0.005);
  float h = st * shift / width;
  float v = ct * shift / height;

  vec3  o = texture2D(map, samplePos).rgb;
  float r = texture2D(map, samplePos + vec2(+h, +v)).r;
  float g = texture2D(map, samplePos + vec2(-h, -v)).g;
  float b = texture2D(map, samplePos + vec2(.0, .0)).b;
  r = mix(o.r, r, fract(abs(st)));
  g = mix(o.g, g, fract(abs(ct)));

  float n = mod(gl_FragCoord.x, pixel) * edges;
  float m = mod(height - gl_FragCoord.y, pixel) * edges;
  vec3 c = vec3(r,g,b);
  c = floor(c*depth)/depth;
  c = c*(1.0-(n+m)*(n+m));
  gl_FragColor = vec4(c, 1.0);
}
