
		var fpsout = document.querySelector('#fps');

		setInterval(drawFrame, 1000 / 60);



		var lastUpdate = new Date, fps=30;

		function drawFrame() {
			var now = new Date;
			var dt = (now - lastUpdate) / 1000;
			if (dt==0 || isNaN(dt)) return;
			lastUpdate = now;
			fps += (1/dt - fps) / 10;
			fpsout.innerHTML = fps;
		}
