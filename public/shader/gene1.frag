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


void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    st -= 0.5;  // becomes -0.5 to 0.5//
    st *= 2.0;  // becomes -1.0 to 1.0
    pct = distance(st,vec2(0));
    vec4 tex =texture2D(u_tex0,st);
    float n = noise(st);
    // b. The LENGTH of the vector
    //    from the pixel to the center
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector
    //    from the pixel to the center
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

    vec3 color = vec3(tex.x*n,tex.y+st.x*sin(u_time*0.1+1.7),tex.z+ st.y*tan(u_time*0.1));



    // we pass st as the y & z values of
    // a three dimensional vector to be
    // properly multiply by a 3x3 matrix
    color = yuv2rgb * color;//vec3(0.5, st.x*sin(u_time*0.1+1.3), st.y*tan(u_time*0.1));

	gl_FragColor = vec4( color, 1.0 );
}
