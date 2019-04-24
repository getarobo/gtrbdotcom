

var canvas = document.createElement("canvas");
canvas.setAttribute("data-fragment-url", "../shader/warp2.frag");
canvas.setAttribute("data-textures","../img/abstract-vector-seamless-pattern-perlin-450w-363451079.jpg")
 document.body.appendChild(canvas);
var sandbox = new GlslCanvas(canvas);
