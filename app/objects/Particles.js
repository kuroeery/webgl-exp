'use strict';

import THREE from 'three';

export default class Particles extends THREE.Object3D {
  constructor(radius, number, sizeRatio, smoke, black) {
    super();
    this.radius = radius;
    let particleCount = number;	/* Leagues under the sea */
    let i;
  	/*	Hope you took your motion sickness pills;
  	We're about to get loopy.	*/
    let geometry = new THREE.Geometry();
  	for (i = 0; i < particleCount; i++) {

  		let vertex = new THREE.Vector3();
  		vertex.x = -1 + Math.random() * 2;
  		vertex.y = -1 + Math.random() * 2;
  		vertex.z = -1 + Math.random() * 2;

      let d = 1 / Math.sqrt(Math.pow(vertex.x, 2) + Math.pow(vertex.y, 2) + Math.pow(vertex.z, 2));
      vertex.x *= d * this.radius;
      vertex.y *= d * this.radius ;
      vertex.z *= d * this.radius;

  		geometry.vertices.push(vertex);
  	}

  	/*	We can't stop here, this is bat country!	*/

  	if (!black) {
      this.parameters = [[[0.7, 0.7, 0.6, 0.5], 5], [[0.95, 0.8, 0.7, 0.5], 4], [[0.80, 0.85, 0.4, 0.5], 3], [[0.6, 0.4, 0.7, 0.5], 2], [[0.80, 0.8, 0.8, 0.5], 1]];
    } else {
      this.parameters = [[[0.0, 0.0, 0.0, 0.0], 2], [[0.0, 0.0, 0.0, 0.0], 2], [[0.0, 0.0, 0.0, 0.0], 2], [[0.0, 0.0, 0.0, 0.0], 2], [[0.0, 0.0, 0.0, 0.0], 2]];
    }
    this.parameterCount = this.parameters.length;

  	/*	I told you to take those motion sickness pills.
  	Clean that vommit up, we're going again!	*/
    let color, size, materials, particles;
    this.materials = [];
  	for (i = 0; i < this.parameterCount; i++) {

  		color = this.parameters[i][0];
  		size  = this.parameters[i][1] / sizeRatio;

      let smokeTexture = THREE.ImageUtils.loadTexture('./smoke4.png');
      let smokeMaterial = new THREE.PointCloudMaterial({ map: smokeTexture, depthTest: false, transparent: true, blending: THREE.AdditiveBlending, size: 50, color: 0x222222});

  		this.materials[i] = new THREE.PointCloudMaterial({size:size, color:color});
      let particleTexture = THREE.ImageUtils.loadTexture('./snowflake.png');
      let particleMaterial = new THREE.PointCloudMaterial({ map: particleTexture, transparent: true, size: 5 });

      if(smoke) {
        this.particles = new THREE.PointCloud(geometry, smokeMaterial);
      } else {
        this.particles = new THREE.PointCloud(geometry, this.materials[i]);
      }

  		this.particles.rotation.x = Math.random() * 6;
  		this.particles.rotation.y = Math.random() * 6;
  		this.particles.rotation.z = Math.random() * 6;
      this.add(this.particles);
  	}



  }


  setRadius(radius) {
    this.radius = radius;
  }

  update() {
    let time = Date.now() * 0.00005;
    let i;

		for (i = 0; i < this.children.length; i ++) {

			let object = this.children[i];

			if (object instanceof THREE.PointCloud) {

				object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
			}
		}
    let color, h;

		for (i = 0; i < this.materials.length; i ++) {

			color = this.parameters[i][0];

			h = (360 * (color[0] + time) % 360) / 360;
			this.materials[i].color.setHSL(h, color[1], color[2]);
		}

  }
}
