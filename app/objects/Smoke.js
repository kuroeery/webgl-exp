'use strict';

import THREE from 'three';

export default class Smoke extends THREE.Object3D {
  constructor() {
    super();
    this.smokeParticles = new THREE.Geometry;
    let i;
    for (i = 0; i < 300; i++) {
        let particle = new THREE.Vector3(
          Math.random() * 32 - 16,
          Math.random() * 230,
          Math.random() * 32 - 16);
        this.smokeParticles.vertices.push(particle);
    }

    let smokeTexture = THREE.ImageUtils.loadTexture('./smoke.png');
    let smokeMaterial = new THREE.PointCloudMaterial({ map: smokeTexture, depthTest: false, transparent: true, blending: THREE.AdditiveBlending, size: 50, color: 0x111111});

    this.smoke = new THREE.PointCloud(this.smokeParticles, smokeMaterial);
    this.smoke.sortParticles = true;

    // this.smokeParticles.__dirtyVertices = true;
    this.add(this.smoke);
  }

  update() {
    // let particleCount = this.smokeParticles.vertices.length;
    // while (particleCount--) {
    //     let particle = this.smokeParticles.vertices[particleCount];
    //     particle.y += 50;
    //
    //     if (particle.y >= 230) {
    //         particle.y = Math.random() * 16;
    //         particle.x = Math.random() * 32 - 16;
    //         particle.z = Math.random() * 32 - 16;
    //     }
    // }
    // this.smokeParticles.__dirtyVertices = true;
  }
}
