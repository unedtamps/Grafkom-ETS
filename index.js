"use strict";

var canvas;
var gl;
var shasp;

var numPositions = 5000;

var shape = createDeca();
var viewMatrixLocation;
var projectionMatrixLoc;
var moveMatrixLocation;
var rotationMatrixLocation;
var toggle = false;

let movespeed = 0.01;
let direction = 1;
let moveX = -2;
let moveY = -2;
let moveZ = 0;
let angle = 0;

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var flag = false;

var phi = 0;
var radius = 10.0;
var near = 10.0;
var far = 3.0;
var fovy = 45;
var aspect;

var axis = 0;
var theta = 0.2;

var thetaLoc;

var move = uniformStrightMove(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  direction,
  angle,
);
var moveFunc = uniformStrightMove;

init();

function createBuffer(gl, program) {
  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(shape.colors), gl.STATIC_DRAW);

  var colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(shape.positions), gl.STATIC_DRAW);

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);
}

function init() {
  canvas = document.getElementById("gl-canvas");
  canvas.width = window.innerWidth; // Set width to 100% of the viewport
  canvas.height = window.innerHeight;

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

  // get options value
  const selectElement = document.getElementById("shape");
  var selectedShape;

  selectElement.addEventListener("change", function () {
    selectedShape = this.value;
    switch (selectedShape) {
      case "dodecahedron":
        console.log("dodecahedron");
        shape = createDeca();
        createBuffer(gl, program);
        break;
      case "prism":
        console.log("prism");
        shape = createPrism();
        createBuffer(gl, program);
        break;
      case "cube":
        console.log("cube");
        shape = createCube();
        createBuffer(gl, program);
        break;
      case "sphere":
        console.log("sphere");
        shape = createSphere();
        createBuffer(gl, program);
        break;
      default:
        shape = createDeca();
        break;
    }
  });
  const selectMove = document.getElementById("move");
  selectMove.addEventListener("change", function () {
    switch (this.value) {
      case "glb":
        moveFunc = uniformStrightMove;
        break;
      case "gva":
        moveY = -3;
        moveFunc = verticalMove;
        break;
    }
  });

  createBuffer(gl, program);

  document.getElementById("toggle").onclick = function () {
    flag = !flag;
    flag ? (this.innerText = "Stop") : (this.innerText = "Start");
  };

  document.getElementById("reset").onclick = function () {
    moveX = -4;
    moveY = -2;
    moveZ = 0;
  };

  viewMatrixLocation = gl.getUniformLocation(program, "uViewMatrix");
  projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
  moveMatrixLocation = gl.getUniformLocation(program, "uMoveMatrix");
  rotationMatrixLocation = gl.getUniformLocation(program, "uRotateMatrix");

  render();
}

function render() {
  //setTimeout( function() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Change move

  // const cameraPosition = vec3(0, 0, 5); // Move farther back by increasing Z (e.g., 10)
  const cameraPosition = vec3(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta),
  );
  console.log(move);
  if (flag) {
    move = moveFunc(theta, moveX, moveY, moveZ, movespeed, direction, angle);
    theta = move.theta;
    moveX = move.moveX;
    moveY = move.moveY;
    moveZ = move.moveZ;
    angle = move.angle;
    direction = move.direction;
    movespeed = move.movespeed;
  }

  const target = vec3(0.0, 0.0, 0.0); // Look at the center (the object)
  const upDirection = vec3(0.0, 1.0, 0.0); // Up is in the Y direction
  var moveObjectMatrix = translate(moveX, moveY, moveZ);

  const rotationMatrix = rotate(angle, [0, 0, 1]);

  var modelViewMatrix = lookAt(cameraPosition, target, upDirection);
  var projectionMatrix = perspective(fovy, aspect, near, far);
  gl.uniformMatrix4fv(viewMatrixLocation, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
  gl.uniformMatrix4fv(moveMatrixLocation, false, flatten(moveObjectMatrix));
  gl.uniformMatrix4fv(rotationMatrixLocation, false, flatten(rotationMatrix));
  gl.drawArrays(gl.TRIANGLES, 0, numPositions);

  requestAnimationFrame(render);
}
