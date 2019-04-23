

var canvas = document.createElement("canvas");
canvas.setAttribute("data-fragment-url", "../shader/distance.frag");
 document.body.appendChild(canvas);
var sandbox = new GlslCanvas(canvas);
