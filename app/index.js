'use strict';

import domready from 'domready';
import Webgl from './Webgl';
import Sound from './sound/Sound'
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

let webgl;
let gui;

domready(() => {
  // webgl settings
  webgl = new Webgl(window.innerWidth, window.innerHeight);
  document.body.appendChild(webgl.renderer.domElement);

  // GUI settings
  gui = new dat.GUI();
  gui.add(webgl, 'usePostprocessing');

  // Sound.load('sound/trouble.mp3');
  let splash = document.createElement('div');
  splash.innerHTML = "<h1>down the rabbit hole.</h1><button>EXPERIMENT</button>";
  document.body.appendChild(splash);
  let started = false;
  splash.onclick = function () {
    if (!started) {
      started = true;
      splash.innerHTML = "<h1>down the rabbit hole.</h1><button>LOADING</button>";
      Sound.load('sound/trouble.mp3');
      splash.classList.add("hidden");
      webgl.start();
    }
  }


  console.log(Sound.getData());

  // handle resize
  window.onresize = resizeHandler;

  // let's play !
  animate();
});

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
  raf(animate);

  webgl.render();
}
