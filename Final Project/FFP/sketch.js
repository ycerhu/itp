let zoff = 0;
let baseNoiseSeed;
let bgImg;
let bgSound;
let particles = [];
let particleCount = 4000; 
let flowScale = 0.0018; 
let trailG; 
let fft;
let audioLow = 0;
let audioMid = 0;
let audioHigh = 0;
let currentColorVal = 255; 

function preload() {
	bgImg = loadImage('whale 2.jpg');
	bgSound = loadSound('DavenYu.mp3');
	
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeWeight(1.25);
	noFill();

	baseNoiseSeed = random(1000);
	noiseDetail(4, 0.5);

	
	fft = new p5.FFT(0.8, 1024);
	if (bgSound) fft.setInput(bgSound);

	// trails graphic buffer
	trailG = createGraphics(windowWidth, windowHeight);
	trailG.clear();

	
	particles = [];
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle(random(width), random(height)));
	}
}

function draw() {
	
	image(bgImg, 0, 0, width, height);
	push();
	noStroke();
	fill(0, 100); 
	rect(0, 0, width, height);
	pop();

	// audio-reactive visuals
	if (fft && bgSound && bgSound.isPlaying && bgSound.isPlaying()) {
		audioLow = fft.getEnergy('bass');
		audioMid = fft.getEnergy('mid');
		audioHigh = fft.getEnergy('treble');
	} else {
		audioLow = audioMid = audioHigh = 0;
	}

	// combine bands to drive color (weights biased to mids)
	const combinedAudio = constrain((audioLow * 0.45 + audioMid * 0.9 + audioHigh * 0.65) / (0.45 + 0.9 + 0.65), 0, 255);
	// map combined audio to color: low audio -> white (255), high audio -> black (0)
	currentColorVal = floor(map(combinedAudio, 0, 255, 255, 0));

	if (trailG) {
		const fadeAmount = 80 
		const ctx = trailG.drawingContext;
		ctx.save();
		ctx.globalCompositeOperation = 'destination-out';
		trailG.noStroke();
		// fill with low-alpha to reduce existing alpha on the buffer
		trailG.fill(0, 0, 0, fadeAmount);
		trailG.rect(0, 0, width, height);
		ctx.restore();

		// calculate particle audio factor (bass-driven) — made more sensitive
		const particleAccelFactor = map(audioLow, 0, 255, 0.8, 6.0);
		const particleSpeedFactor = map(audioLow, 0, 255, 0.6, 3.5);

		// update & draw particles (on trail graphics so they leave trails)
		for (let p of particles) {
			p.follow(flowScale, zoff, particleAccelFactor, particleSpeedFactor);
			p.update();
			p.edges();
			p.show(trailG);
		}

		// draw trails buffer onto main canvas (before translating for circles)
		image(trailG, 0, 0, width, height);
	}

	// draw circles centered — keep this translation isolated so particles cover whole canvas
	push();
	translate(width / 2, height / 2);

	const minDim = min(width, height);
	const numCircles = 21; // original + 20 more = 21 concentric noisy circles
	const angleStep = 0.02;

	for (let i = 0; i < numCircles; i++) {
		const t = i / (numCircles - 1);

		// interpolate radii so circles range from small to large
		const minR = minDim * 0.06;
		const maxR = minDim * 0.42;
		const baseRadius = lerp(minR, maxR, t);

		// vary noise sampling and amplitude slightly per circle so each looks similar but unique
		// make noiseAmplitude audio-reactive using mid frequencies and stronger sensitivity
		const noiseScale = 1.2 + t * 0.9;
		const audioCircleFactor = map(audioMid, 0, 255, 0.4, 4.5);
		const noiseAmplitude = minDim * (0.06 + t * 0.12) * audioCircleFactor;

		// visual styling: subtle alpha progression (white strokes)
		const alpha = map(i, 0, numCircles - 1, 220, 36);

		// offset the noise seed per circle so shapes don't perfectly overlap
		const seedOffset = baseNoiseSeed + i * 7.3;

		// Glow approach: first pass draws a thicker, low-alpha stroke with canvas shadow
		// then a second pass draws the crisp white stroke on top.
		if (typeof drawingContext !== 'undefined') {
			drawingContext.save();
			// set a glow color (white) for shadow
			// shadow color follows current color (white->black) but keep alpha for glow
			const c = currentColorVal;
			drawingContext.shadowColor = `rgba(${c},${c},${c},0.95)`;
			// shadowBlur scales with circle size (larger circles glow more) and responds to treble (more sensitive)
			const trebleBoost = map(audioHigh, 0, 255, 1, 4.0);
			drawingContext.shadowBlur = lerp(6, 36, t) * trebleBoost;
		}

		// first (glow) pass
		stroke(currentColorVal, alpha * 0.22);
		strokeWeight(lerp(3.5, 10, t));
		beginShape();
		for (let a = 0; a < TWO_PI + angleStep; a += angleStep) {
			const xoff = cos(a) * noiseScale + seedOffset;
			const yoff = sin(a) * noiseScale + seedOffset * 1.4;
			const n = noise(xoff, yoff, zoff);

			const r = baseRadius + map(n, 0, 1, -noiseAmplitude, noiseAmplitude);
			const x = r * cos(a);
			const y = r * sin(a);
			vertex(x, y);
		}
		endShape(CLOSE);

		// second (crisp) pass on top
		if (typeof drawingContext !== 'undefined') {
			// reduce shadow so the top stroke is slightly less blurred
			drawingContext.shadowBlur = lerp(0, 8, t);
			drawingContext.shadowColor = 'rgba(255,255,255,0.65)';
		}
		stroke(currentColorVal, alpha);
		strokeWeight(1.25);
		beginShape();
		for (let a = 0; a < TWO_PI + angleStep; a += angleStep) {
			const xoff = cos(a) * noiseScale + seedOffset;
			const yoff = sin(a) * noiseScale + seedOffset * 1.4;
			const n = noise(xoff, yoff, zoff);

			const r = baseRadius + map(n, 0, 1, -noiseAmplitude, noiseAmplitude);
			const x = r * cos(a);
			const y = r * sin(a);
			vertex(x, y);
		}
		endShape(CLOSE);

		if (typeof drawingContext !== 'undefined') {
			drawingContext.restore();
		}
	}

	pop();

	// animate all circles and particles together by advancing z dimension
	// make z evolution more reactive to treble for more lively motion
	zoff += 0.005 + map(audioHigh, 0, 255, 0, 0.03);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	// resize trails buffer and clear it
	trailG = createGraphics(windowWidth, windowHeight);
	trailG.clear();
	// reposition particles within new bounds
	for (let p of particles) {
		p.x = constrain(p.x, 0, width);
		p.y = constrain(p.y, 0, height);
		p.px = p.x;
		p.py = p.y;
	}
}

function mousePressed() {
	// Ensure user gesture activates audio context in browsers
	if (typeof userStartAudio === 'function') {
		userStartAudio().catch(() => {});
	}

	if (!bgSound) return;

	if (bgSound.isPlaying && bgSound.isPlaying()) {
		bgSound.stop();
	} else if (bgSound.play) {
		// loop so audio continues until stopped by next click
		if (bgSound.isLooping && bgSound.isLooping()) {
			bgSound.stop();
		} else {
			bgSound.setVolume(1.0);
			bgSound.loop();
		}
	}
}

// touch compatibility
function touchStarted() {
	mousePressed();
	return false;
}

// Particle class: simple verlet-ish particle with velocity, follows a Perlin flow field
class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.px = x;
		this.py = y;
		this.vx = 0;
		this.vy = 0;
		this.maxSpeed = random(1.2, 3.0);
		this.baseMax = this.maxSpeed;
		this.hue = 0;
	}

	follow(scale, z, audioAccel = 1.0, speedFactor = 1.0) {
		// sample noise to get an angle
		const angle = noise(this.x * scale, this.y * scale, z) * TWO_PI * 4.0;
		// acceleration scaled by audio factor
		const baseAcc = 0.08;
		const ax = cos(angle) * baseAcc * audioAccel;
		const ay = sin(angle) * baseAcc * audioAccel;
		this.vx += ax;
		this.vy += ay;
		// damping
		this.vx *= 0.985;
		this.vy *= 0.985;
		// scale max speed by audio-driven speed factor
		this.maxSpeed = max(0.1, this.baseMax * speedFactor);
		const s = sqrt(this.vx * this.vx + this.vy * this.vy);
		if (s > this.maxSpeed) {
			this.vx = (this.vx / s) * this.maxSpeed;
			this.vy = (this.vy / s) * this.maxSpeed;
		}
	}

	update() {
		this.px = this.x;
		this.py = this.y;
		this.x += this.vx;
		this.y += this.vy;
	}

	edges() {
		// wrap around edges (toroidal)
		let wrapped = false;
		if (this.x < 0) { this.x = width; wrapped = true; }
		if (this.x > width) { this.x = 0; wrapped = true; }
		if (this.y < 0) { this.y = height; wrapped = true; }
		if (this.y > height) { this.y = 0; wrapped = true; }
		if (wrapped) {
			this.px = this.x;
			this.py = this.y;
		}
	}

	show(g) {
		// draw a short line from previous to current position to create trails
		// trail alpha responds to combined audio (brighter when louder)
		const trailAlpha = map((audioLow * 0.45 + audioMid * 0.9 + audioHigh * 0.65) / (0.45 + 0.9 + 0.65), 0, 255, 60, 220);
		g.stroke(currentColorVal, trailAlpha);
		g.strokeWeight(1);
		g.line(this.px, this.py, this.x, this.y);
	}
}

