var lastCalledTime;
var fps;


window.requestAnimationFrame(requestAnimFrame);

function requestAnimFrame() {

  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
	document.getElementById("fps").innerHTML = ""+fps;
}
