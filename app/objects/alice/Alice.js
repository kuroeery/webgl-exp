'use strict';

import THREE from 'three';
import Zouz from './ZouzSprite';
import Dress from './Dress';
import Sound from '../../sound/Sound';

export default class ZouzSprite extends THREE.Object3D {
  constructor() {
    super();

    this.zouz = new Zouz();
    this.dress = new Dress();
    this.dress.position.x -= 1;

    this.add(this.zouz);
    this.add(this.dress);

  }

  update() {
    let speed = (Sound.getData().freq[0] / 25500);
    this.rotation.y += speed ;
    this.rotation.z += speed ;
    this.rotation.x += speed ;
    this.dress.update();
  }
}
