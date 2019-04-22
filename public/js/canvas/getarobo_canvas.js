
		var ctx = document.querySelector('canvas').getContext('2d'),
		    fpsout = document.querySelector('#fps');


		resizeCanvas();
		window.addEventListener('resize', resizeCanvas, false);
		setInterval(drawFrame, 1000 / 60);

		function resizeCanvas() {
			var w = document.body.offsetWidth,
			    h = document.body.offsetHeight;
			ctx.canvas.width  = w;
			ctx.canvas.height = h;

		}


		var lastUpdate = new Date, fps=30;

		function drawFrame() {
			var now = new Date;
			var dt = (now - lastUpdate) / 1000;
			if (dt==0 || isNaN(dt)) return;



			lastUpdate = now;
			fps += (1/dt - fps) / 10;
		}
