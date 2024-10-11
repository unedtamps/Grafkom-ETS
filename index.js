"use strict";

var canvas;
var gl;

var numPositions = 108;

var positions = [];
var colors = [];
var viewMatrixLocation;
var projectionMatrixLoc;
var moveMatrixLocation;

let movespeed = 0.01;
let direction = 1;
let move = -1.0;

const A = (1 + Math.sqrt(5)) / 2; // The golden ratio
const B = 1 / A;
var vertices = [
  vec4(1, 1, 1, 1.0),
  vec4(1, 1, -1, 1.0),
  vec4(1, -1, 1, 1.0),
  vec4(1, -1, -1, 1.0),
  vec4(-1, 1, 1, 1.0),
  vec4(-1, 1, -1, 1.0),
  vec4(-1, -1, 1, 1.0),
  vec4(-1, -1, -1, 1.0),
  vec4(0, B, A, 1.0),
  vec4(0, B, -A, 1.0),
  vec4(0, -B, A, 1.0),
  vec4(0, -B, -A, 1.0),
  vec4(B, A, 0, 1.0),
  vec4(B, -A, 0, 1.0),
  vec4(-B, A, 0, 1.0),
  vec4(-B, -A, 0, 1.0),
  vec4(A, 0, B, 1.0),
  vec4(A, 0, -B, 1.0),
  vec4(-A, 0, B, 1.0),
  vec4(-A, 0, -B, 1.0),
];

var vertexColors = [
  vec4(0.0, 0.0, 0.0, 1.0), // black
  vec4(1.0, 0.0, 0.0, 1.0), // red
  vec4(1.0, 1.0, 0.0, 1.0), // yellow
  vec4(0.0, 1.0, 0.0, 1.0), // green
  vec4(0.0, 0.0, 1.0, 1.0), // blue
  vec4(0.5, 0.0, 0.0, 1.0), // dark red
  vec4(1.0, 0.0, 1.0, 1.0), // magenta
  vec4(0.0, 1.0, 1.0, 1.0), // cyan
  vec4(0.5, 1.0, 1.0, 1.0), // white
  vec4(0.5, 0.5, 0.0, 1.0), // olive
  vec4(0.0, 0.5, 0.0, 1.0), // dark green
  vec4(0.0, 0.0, 0.5, 1.0), // dark blue
  vec4(0.5, 0.0, 0.5, 1.0), // purple
  vec4(0.0, 0.5, 0.5, 1.0), // teal
  vec4(0.5, 0.5, 0.5, 1.0), // gray
  vec4(1.0, 0.5, 0.0, 1.0), // orange
  vec4(0.5, 1.0, 0.0, 1.0), // lime
  vec4(0.0, 1.0, 0.5, 1.0), // aqua
  vec4(1.0, 0.0, 0.5, 1.0), // pink
  vec4(0.5, 0.0, 1.0, 1.0), // violet
];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var phi = 10;
var radius = 5.0;
var near = 10.0;
var far = 3.0;
var fovy = 45;
var aspect;

var axis = 0;
var theta = 0;

var thetaLoc;

init();

function init() {
  canvas = document.getElementById("gl-canvas");
  canvas.width = window.innerWidth; // Set width to 100% of the viewport

  gl = canvas.getContext("webgl2");
  if (!gl) alert("WebGL 2.0 isn't available");

  aspect = canvas.width / canvas.height;

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.5, 0.5, 0.5, 0.5);

  gl.enable(gl.DEPTH_TEST);

  //
  //  Load shaders and initialize attribute buffers
  //
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  createDeca();

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  viewMatrixLocation = gl.getUniformLocation(program, "uViewMatrix");
  projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
  moveMatrixLocation = gl.getUniformLocation(program, "uMoveMatrix");

  render();
}

function fives(a, b, c, d, e) {
  var indices = [a, b, c, a, c, d, a, d, e];
  const colorIndex = Math.round(Math.random() * 8);

  for (var i = 0; i < indices.length; ++i) {
    positions.push(vertices[indices[i]]);
    colors.push(vertexColors[indices[colorIndex]]); // Use the color of the first vertex for solid colors
  }
}

function createDeca() {
  fives(0, 16, 2, 10, 8);
  fives(0, 8, 4, 14, 12);
  fives(16, 17, 1, 12, 0);
  fives(1, 9, 11, 3, 17);
  fives(1, 12, 14, 5, 9);
  fives(2, 13, 15, 6, 10);
  fives(13, 3, 17, 16, 2);
  fives(3, 11, 7, 15, 13);
  fives(4, 8, 10, 6, 18);
  fives(14, 5, 19, 18, 4);
  fives(5, 19, 7, 11, 9);
  fives(15, 7, 19, 18, 6);
}

function render() {
  //setTimeout( function() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // const cameraPosition = vec3(0, 0, 5); // Move farther back by increasing Z (e.g., 10)
  const cameraPosition = vec3(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta),
  );
  move += movespeed * direction;

  const target = vec3(0.0, 0.0, 0.0); // Look at the center (the object)
  const upDirection = vec3(0.0, 1.0, 0.0); // Up is in the Y direction
  var moveObjectMatrix = translate(move, 0.0, 0.0);

  if (move > 1.0 || move < -1.0) {
    direction *= -1;
  }

  var modelViewMatrix = lookAt(cameraPosition, target, upDirection);
  var projectionMatrix = perspective(fovy, aspect, near, far);
  gl.uniformMatrix4fv(viewMatrixLocation, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
  gl.uniformMatrix4fv(moveMatrixLocation, false, flatten(moveObjectMatrix));
  gl.drawArrays(gl.TRIANGLES, 0, numPositions);

  theta += 0.02;
  requestAnimationFrame(render);
}
