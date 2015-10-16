'use strict';

import THREE from 'three';
import Particles from './Particles';
import Sound from '../sound/Sound';
import 'gsap';

export default class ParticleContainer extends THREE.Object3D {
  constructor(numberBall, radius, number, sizeRatio, radius2) {
    super();
    this.particles = [];
    this.angle = 0;
    let i;
    this.radius = radius2;
    for (i = 0; i < numberBall; i++) {
      this.addParticle(radius, number, sizeRatio);
    }

let self = this;
    setTimeout(function() {
      self.stop()
    }, 15000);

  }

  addParticle(radius, number, sizeRatio) {
    let particle = new Particles(radius, number*3, sizeRatio);

    let speed = Math.random() * 0.01 + 0.001;
    this.particles.push({particle:particle, speed:speed, angle:this.angle, placed:false});
    let index = this.particles.length;
    this.add(particle);
    particle.position.x = -200;
    let self = this;
    let angle = Math.cos(this.angle) * this.radius;
    TweenLite.to(particle.position, 3, {delay:2+this.angle/800, x:angle, ease:Sine.easeOut, onComplete: function() {
      self.particles[index - 1].placed = true;
    }});
    //particle.position.x = Math.cos(this.angle) * this.radius;
    particle.position.z = Math.sin(this.angle) * this.radius;
    this.angle += 200;
  }

  start() {
    let length = this.particles.length;
    let self = this;

    let i;

    for (i = 0; i < length; i++) {
      let index = i;
      let angle = Math.cos(this.particles[index].angle) * this.radius;
      TweenLite.to(this.particles[index].particle.position, 3, {delay:2+this.particles[index].angle/800, x:angle, ease:Sine.easeOut, onComplete: function() {

        self.particles[index].placed = true;
      }});
    }
  }

  stop() {
    let length = this.particles.length;
    let self = this;
    let i;

    for (i = 0; i < length; i++) {
      let index = i;
      TweenLite.to(this.particles[index].particle.position, 3, {delay:2+this.particles[index].angle/800, x:-200, ease:Sine.easeOut, onStart: function() {

        self.particles[index].placed = false;
      }});
    }

        setTimeout(function() {
          self.start()
        }, 5000);
  }



  update() {
    let i,
    length = this.particles.length,
    scale,
    speed = (Sound.getData().freq[0] / 25500);

    for (i = 0; i < length; i++) {
      scale = (Sound.getData().freq[i*5] / 255) + 1
      this.particles[i].particle.scale.x = this.particles[i].particle.scale.y = this.particles[i].particle.scale.z = scale*2;
      this.particles[i].particle.rotation.y += speed ;
      this.particles[i].particle.rotation.z += speed ;
      this.particles[i].particle.rotation.x += speed ;
      this.particles[i].particle.update();
      this.particles[i].angle += this.particles[i].speed;
      if (this.particles[i].placed)  this.particles[i].particle.position.x = Math.cos(this.particles[i].angle) * this.radius;
      if (this.particles[i].placed)  this.particles[i].particle.position.z = Math.sin(this.particles[i].angle) * this.radius;
    }
  }

}
