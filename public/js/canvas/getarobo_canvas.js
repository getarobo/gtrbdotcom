

var canvas = document.createElement("canvas");
canvas.setAttribute("data-fragment-url", "../shader/gene1.frag");
canvas.setAttribute("data-textures","../img/GeneHan_Bio_360_360_s_c1.jpg")
 document.body.appendChild(canvas);
var sandbox = new GlslCanvas(canvas);
console.log("hi");
sandbox.force_resize();
