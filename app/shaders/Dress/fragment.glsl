void main() {
  if (gl_FrontFacing){
    gl_FragColor = vec4(0.25, 0.5, 0.9, 1.0);
  } else {
    gl_FragColor = vec4(0.8, 0.8, 1.0, 0.5);
  }
}
