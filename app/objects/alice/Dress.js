'use strict';

import THREE from 'three';
import Sound from '../../sound/Sound';

const glslify = require('glslify');
const start = Date.now();

export default class Dress extends THREE.Object3D {
  constructor() {
    super();
    this.material =
  new THREE.ShaderMaterial(
    {
      wireframe: false,
      side: THREE.DoubleSide,
      fragmentShader: glslify('../../shaders/Dress/fragment.glsl'),
      vertexShader: glslify('../../shaders/Dress/vertex.glsl'),
      uniforms: {
        time: {
          type: 'f',
          value: 0.0
        }
      }
    });

    let dressGeom = new THREE.SphereGeometry(10, 80, 80, Math.PI/2, Math.PI*2, Math.PI*2, Math.PI/2);
    this.obj = new THREE.Mesh(dressGeom, this.material);

    this.add(this.obj);
  }

  update() {
    // let speed = (Sound.getData().freq[0] / 25500);
    // this.obj.rotation.y += speed ;
    // this.obj.rotation.z += speed ;
    // this.obj.rotation.x += speed ;
    this.material.uniforms.time.value = 0.00025 * (Date.now() - start);
  }
}
