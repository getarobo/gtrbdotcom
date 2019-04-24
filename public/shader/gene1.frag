// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;

// YUV to RGB matrix
mat3 yuv2rgb = mat3(1.0, 0.0, 1.13983,
                    1.0, -0.39465, -0.58060,
                    1.0, 2.03211, 0.0);

// RGB to YUV matrix
mat3 rgb2yuv = mat3(0.2126, 0.7152, 0.0722,
                    -0.09991, -0.33609, 0.43600,
                    0.615, -0.5586, -0.05639);

float noise(in vec2 x){
  vec2 p = floor(x);
  vec2 f = fract(x);
  f = f*f*(3.0-2.0*f);
  float a = texture2D(u_tex0,(p+vec2(0.5,0.5))/256.0,0.0).x;
  float b = texture2D(u_tex0,(p+vec2(1.5,0.5))/256.0,0.0).x;
  float c = texture2D(u_tex0,(p+vec2(0.5,1.5))/256.0,0.0).x;
  float d = texture2D(u_tex0,(p+vec2(1.5,1.5))/256.0,0.0).x;
  return mix(mix( a, b,f.x), mix( c, d,f.x),f.y);
}
float hash(float n) { return fract(sin(n) * 1e4); }
float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

float noise2(in vec2 x) {
	vec2 i = floor(x);
	vec2 f = fract(x);

	// Four corners in 2D of a tile
	float a = hash(i);
	float b = hash(i + vec2(1.0, 0.0));
	float c = hash(i + vec2(0.0, 1.0));
	float d = hash(i + vec2(1.0, 1.0));

	// Simple 2D lerp using smoothstep envelope between the values.
	// return vec3(mix(mix(a, b, smoothstep(0.0, 1.0, f.x)),
	//			mix(c, d, smoothstep(0.0, 1.0, f.x)),
	//			smoothstep(0.0, 1.0, f.y)));

	// Same code, with the clamps in smoothstep and common subexpressions
	// optimized away.
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}


void main(){
	  vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    vec2 stt = (st-0.5)*2.0;
//    st -= 0.5;  // becomes -0.5 to 0.5//
//    st *= 2.0;  // becomes -1.0 to 1.0
    st.x -=0.4;
    st.y -=0.31;
    pct = distance(st,vec2(-1));
    vec4 tex =texture2D(u_tex0,st);
    float n = noise2(st);
    // b. The LENGTH of the vector
    //    from the pixel to the center
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector
    //    from the pixel to the center
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    vec3 color = vec3(tex.x*n,tex.y*n+stt.x*sin(u_time*0.1+1.7),tex.z-0.1- stt.y*tan(u_time*0.1));



    // we pass st as the y & z values of
    // a three dimensional vector to be
    // properly multiply by a 3x3 matrix
    color = yuv2rgb * color;//vec3(0.5, st.x*sin(u_time*0.1+1.3), st.y*tan(u_time*0.1));

	gl_FragColor = vec4( color, 1.0 );
}
