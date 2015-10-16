'use strict';

import Cube from './objects/Cube';
import Particles from './objects/Particles';
import ParticleContainer from './objects/ParticleContainer';
import Smoke from './objects/Smoke';
// import Dress from './objects/alice/Dress';
// import Zouz from './objects/alice/ZouzSprite';
import Alice from './objects/alice/Alice';
import THREE from 'three';
import Sound from './sound/Sound';

const glslify = require('glslify');
let sphereMaterial;
let time = 0;
let texture, material;
const start = Date.now();


window.THREE = THREE;

export default class Webgl {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x222222);

    this.usePostprocessing = false;
    this.composer = new WAGNER.Composer(this.renderer);
    this.composer.setSize(width, height);
    this.initPostprocessing();

    this.cube = new Cube();
    this.cube.position.set(0, 0, 0);
    // this.scene.add(this.cube);

    let radius = 20,
    segments = 16,
    rings = 16;

    this.uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() }
    };
    texture = THREE.ImageUtils.loadTexture('wall.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat = new THREE.Vector2(50 , 25);

    this.material = new THREE.MeshPhongMaterial( {
      map: texture,
      side: THREE.BackSide});
      // uniforms: {
      //   time: {
      //     type: 'f',
      //     value: 0.0
      //   }
      // },
      //fragmentShader: glslify('./shaders/Dress/fragment.glsl'),
      //vertexShader: glslify('./shaders/Dress/vertex.glsl'),});
    let geometry = new THREE.PlaneBufferGeometry( 2, 2 );
    // let material = new THREE.MeshBasicMaterial( {
      //  map:map,
      //  side: THREE.BackSide,
		  //  blending: THREE.AdditiveBlending,
    //    uniforms: this.uniforms,
      //  wireframe: false,
        // vertexShader: document.getElementById( 'vertexShader' ).textContent,
        // fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  //  } );

    // let mesh = new THREE.Mesh( geometry, material );
    // this.scene.add( mesh );

  //
  //   let sphereMaterial =
  // new THREE.MeshLambertMaterial(
  //   {
  //     color: 0xF4ACCD,
  //     wireframe: false,
  //     side: THREE.DoubleSide
  //   });

    // create a new mesh with
    // sphere geometry - we will cover
    // the sphereMaterial next!
    let sphereGeom = new THREE.SphereGeometry(
      radius,
      segments,
      rings);
    this.sphere = new THREE.Mesh(sphereGeom, this.material);

    let sphereGeom2 = new THREE.SphereGeometry(
      400,
      segments*4,
      rings*4);
    this.sphere2 = new THREE.Mesh(sphereGeom2, this.material);
    this.sphere2.position.z = 100;
    this.scene.add(this.sphere2);

    // add the sphere to the scene
    // this.scene.add(this.sphere);

    let pointLight =
      new THREE.PointLight(0x888888);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;


    // add to the scene
    this.scene.add(pointLight);
    this.particles = new Particles(30, 40, 8, true);
    // this.particles = new Particles(20, 1000, 7);
    this.scene.add(this.particles);



    this.zouz = new Alice();
    this.zouz.position.y = -100/12;
    this.scene.add(this.zouz);


    this.resize(window.innerWidth, window.innerHeight);
  }


  initPostprocessing() {
    if (!this.usePostprocessing) return;

    this.vignette2Pass = new WAGNER.Vignette2Pass();
  }

  start() {
    this.particles2 = new ParticleContainer(6, 1, 300, 20, 50);
    this.scene.add(this.particles2);
  }

  resize(width, height) {
    this.composer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.uniforms.u_resolution.value.x = width;
    this.uniforms.u_resolution.value.y = height;
  };

  render() {
    if (this.usePostprocessing) {
      this.composer.reset();
      this.composer.renderer.clear();
      this.composer.render(this.scene, this.camera);
      this.composer.pass(this.vignette2Pass);
      this.composer.toScreen();
    } else {
      this.renderer.autoClear = false;
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }
    // console.log(Sound.getData().time);
    let scale = (Sound.getData().freq[100] / 255) + 1;
    let speed = (Sound.getData().freq[0] / 25500);
    this.uniforms.u_time.value += 0.01;
    time += 0.05;
    this.sphere.scale.x = this.sphere.scale.z = scale;
    // this.particles.scale.x = this.particles.scale.y = this.particles.scale.z = scale;
    this.sphere.rotation.y += speed ;

    this.particles.scale.y = 2.2;
    this.particles.rotation.y += speed ;
    this.sphere.rotation.y %= 100;
    this.particles.rotation.y %= 100;
    this.cube.update();
    this.particles.update();
    if (this.particles2) this.particles2.update();
    this.zouz.update();
    this.zouz.position.y += Math.sin(time) * 0.25;
    this.sphere2.rotation.x += speed * 1.2;
    if (this.particles2) this.particles2.scale.y = 1.5;
    //this.material.uniforms.time.value = 0.00025 * (Date.now() - start);
    // this.smoke.update();
  }


}
