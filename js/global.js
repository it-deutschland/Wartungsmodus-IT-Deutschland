/*
 * IT Deutschland – Maintenance Page Effects
 */
(function () {
  'use strict';

  /* ── Floating Particles ── */
  var canvas  = document.getElementById('particles-canvas');
  var ctx     = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 60;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x     = randomBetween(0, canvas.width);
    this.y     = randomBetween(0, canvas.height);
    this.r     = randomBetween(1, 3.5);
    this.vx    = randomBetween(-0.4, 0.4);
    this.vy    = randomBetween(-0.8, -0.2);
    this.alpha = randomBetween(0.2, 0.7);
    // German-flag colours: white, red, gold
    var colours = ['255,255,255', '220,30,30', '255,180,0'];
    this.colour = colours[Math.floor(Math.random() * colours.length)];
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.0015;
    if (this.alpha <= 0 || this.y < -10) { this.reset(); this.y = canvas.height + 5; }
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.colour + ',' + this.alpha + ')';
    ctx.fill();
  };

  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (p) { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ── Mouse-parallax on the main logo ── */
  var mainLogo = document.getElementById('main-logo');
  if (mainLogo) {
    document.addEventListener('mousemove', function (e) {
      var cx = window.innerWidth  / 2;
      var cy = window.innerHeight / 2;
      var dx = (e.clientX - cx) / cx;
      var dy = (e.clientY - cy) / cy;
      mainLogo.style.transform = 'scale(1.07) translate(' + (dx * 8) + 'px,' + (dy * 8) + 'px)';
    });
    document.addEventListener('mouseleave', function () {
      mainLogo.style.transform = '';
    });
  }

})();
