var lastCalledTime;
var fps;


window.requestAnimationFrame(requestAnimFrame);
console.log("HI:"+0);

function requestAnimFrame() {

  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
	console.log("fps:"+fps);
	document.getElementById("fps").innerHTML = ""+fps;
}
