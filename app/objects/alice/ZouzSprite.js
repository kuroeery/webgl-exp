'use strict';

import THREE from 'three';
import Sound from '../../sound/Sound';

export default class ZouzSprite extends THREE.Object3D {
  constructor() {
    super();

    let map = THREE.ImageUtils.loadTexture( "alice.png" );
    let cmaterial = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
    this.sprite = new THREE.Sprite( cmaterial );

    let geometry = new THREE.PlaneGeometry(60/3, 100/3, 32);
    let material = new THREE.MeshBasicMaterial( {map:map, transparent:true, side: THREE.DoubleSide} );
    this.plane = new THREE.Mesh( geometry, material );
    this.add(this.plane);

    this.sprite.position.z = 0;
    this.plane.position.y = 6;
    this.sprite.scale.set(60/3, 100/3, 1.0);
    // this.plane.add(this.sprite);
    this.zouz;

  }

  update() {
    // let speed = (Sound.getData().freq[0] / 25500);
    // this.rotation.y += speed ;
    // this.rotation.z += speed ;
    // this.rotation.x += speed ;
  }
}
