"use strict";

var canvas;
var gl;
var shasp;

var numPositions = 10000;

var shape = createDeca();
var viewMatrixLocation;
var projectionMatrixLoc;
var moveMatrixLocation;
var rotationMatrixLocation;
var toggle = false;

let movespeed = 0;
let angle = 0;
let acceleration = 0;
let timeSecond = 0;
let timeprev = new Date().getTime();
let force = 0;
let mass = 10000;
let anglex = 45; //angle terhadap sumbu x
var toggleff = false;

//move
let moveX = -5.5;
let moveY = -2.4;
let moveZ = 0;
let initMoveY = moveY - 0.001;
let initMovex = moveX * 2;

var flag = false;

var phi = 0;
var radius = 10.0;
var near = 4.0;
var far = 20;
var fovy = 45;
var aspect;

// var phi = 0;
// var radius = 10.0;
// var near = 10.0;
// var far = 3.0;
// var fovy = 45;
// var aspect;

var axis = 0;
var theta = 0.0;

var thetaLoc;

var move = uniformStrightMove(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  angle,
  acceleration,
  timeSecond,
  anglex,
  toggleff,
);
console.log(move);
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
      case "cylinder":
        console.log("cylinder");
        shape = createCylinder();
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
  // change color
  document.getElementById("colorButton").addEventListener("click", function () {
    console.log("Masuk sini");
    switch (selectedShape) {
      case "dodecahedron":
        shape = createDeca();
        createBuffer(gl, program);
        break;
      case "prism":
        shape = createPrism();
        createBuffer(gl, program);
        break;
      case "cylinder":
        shape = createCylinder();
        createBuffer(gl, program);
        break;
      case "cube":
        shape = createCube();
        createBuffer(gl, program);
        break;
      case "sphere":
        shape = createSphere();
        createBuffer(gl, program);
        break;
      default:
        shape = createDeca();
        createBuffer(gl, program);
        break;
    }
  });

  const selectMove = document.getElementById("move");
  let glb = document.getElementById("glb-input");
  let gva = document.getElementById("gva-input");
  let glbb = document.getElementById("glbb-input");
  let gp = document.getElementById("parabola-input");
  let gff = document.getElementById("freefall-input");
  selectMove.addEventListener("change", function () {
    switch (this.value) {
      case "glb":
        gva.setAttribute("hidden", true);
        gp.setAttribute("hidden", true);
        glbb.setAttribute("hidden", true);
        gff.setAttribute("hidden", true);
        glb.removeAttribute("hidden");
        const glb_v = document.getElementById("glb-v");
        glb_v.addEventListener("change", function (event) {
          console.log(event.target.value);
          movespeed = parseFloat(event.target.value);
          timeSecond = 0;
          if (!movespeed) {
            movespeed = 0.01;
          }
          moveFunc = uniformStrightMove;
        });
        break;
      case "glbb":
        glb.setAttribute("hidden", true);
        gva.setAttribute("hidden", true);
        gp.setAttribute("hidden", true);
        gff.setAttribute("hidden", true);
        glbb.removeAttribute("hidden");
        var mass = 1;
        var force = 4;
        const glbb_v = document.getElementById("glbb-v");
        glbb_v.addEventListener("change", function (event) {
          movespeed = parseFloat(event.target.value);
          console.log(movespeed);
          if (!movespeed) {
            movespeed = 0.01;
          }
        });
        const glbb_m = document.getElementById("glbb-m");
        glbb_m.addEventListener("change", function (event) {
          mass = parseFloat(event.target.value);
          console.log(mass);
          if (!mass) {
            mass = 1;
          }
        });
        const glbb_f = document.getElementById("glbb-f");
        glbb_f.addEventListener("change", function (event) {
          force = parseFloat(event.target.value);
          console.log(force);
          if (!force) {
            force = 4;
          }
        });

        document.getElementById("glbb-start").onclick = function () {
          acceleration = force / mass;
          timeSecond = 0;
          moveFunc = constantAcceleration;
        };
        break;

      case "gva":
        glb.setAttribute("hidden", true);
        glbb.setAttribute("hidden", true);
        gp.setAttribute("hidden", true);
        gff.setAttribute("hidden", true);
        gva.removeAttribute("hidden");
        const gva_v = document.getElementById("gva-v");
        gva_v.addEventListener("change", function (event) {
          console.log(event.target.value);
          movespeed = parseFloat(event.target.value);
          if (!movespeed) {
            movespeed = 50;
          }
        });
        const gva_g = document.getElementById("gva-g");
        gva_g.addEventListener("change", function (event) {
          console.log(event.target.value);
          acceleration = parseFloat(event.target.value);
          if (!acceleration) {
            acceleration = 10;
          }
        });
        document.getElementById("submit-gva").onclick = function () {
          // moveY = -2.3;
          timeSecond = 0;
          moveFunc = verticalMove;
        };

        break;

      case "gp":
        glb.setAttribute("hidden", true);
        glbb.setAttribute("hidden", true);
        gva.setAttribute("hidden", true);
        gff.setAttribute("hidden", true);
        gp.removeAttribute("hidden");
        const gp_vo = document.getElementById("vop");
        const gp_theta_to_x = document.getElementById("thetap");
        const gp_gravitasip = document.getElementById("gravitasip");

        gp_vo.addEventListener("change", function (event) {
          movespeed = parseFloat(event.target.value); // Set default jika input kosong
          console.log(movespeed);
          if (!movespeed) {
            movespeed = 15;
          }
        });
        gp_theta_to_x.addEventListener("change", function (event) {
          anglex = parseFloat(event.target.value); // Set default jika input kosong
          console.log(anglex);
          if (!anglex) {
            anglex = 45;
          }
        });

        gp_gravitasip.addEventListener("change", function (event) {
          acceleration = parseFloat(event.target.value); // Set default jika input kosong
          console.log(acceleration);
          if (!acceleration) {
            acceleration = 10;
          }
        });

        document.getElementById("jumpgp").onclick = function () {
          timeSecond = 0;
          moveFunc = (
            theta,
            moveX,
            moveY,
            moveZ,
            movespeed,
            angle,
            acceleration,
            timeSecond,
            anglex,
          ) => {
            return parabolaMove(
              theta,
              moveX,
              moveY,
              moveZ,
              movespeed,
              angle,
              acceleration,
              timeSecond,
              anglex,
            );
          };
        };

        timeSecond = 0;
        moveFunc = (
          theta,
          moveX,
          moveY,
          moveZ,
          movespeed,
          angle,
          acceleration,
          timeSecond,
          anglex,
        ) => {
          return parabolaMove(
            theta,
            moveX,
            moveY,
            moveZ,
            movespeed,
            angle,
            acceleration,
            timeSecond,
            anglex,
          );
        };
        break;

      case "gff":
        glb.setAttribute("hidden", true);
        glbb.setAttribute("hidden", true);
        gp.setAttribute("hidden", true);
        gva.setAttribute("hidden", true);
        gff.removeAttribute("hidden");
        const gff_h = document.getElementById("hoff");

        let h = 0;
        gff_h.addEventListener("change", function (event) {
          console.log(event.target.value);
          h = parseFloat(event.target.value);
          if (!moveY) {
            h = 10;
          }
        });
        const gff_g = document.getElementById("gravitasiff");
        gff_g.addEventListener("change", function (event) {
          console.log(event.target.value);
          acceleration = parseFloat(event.target.value);
          if (!acceleration) {
            acceleration = 10;
          }
          timeSecond = 0;
        });
        document.getElementById("submit-gff").onclick = function () {
          moveY = h - initMoveY;
          moveFunc = FreeFallMoveMove;
        };
        // moveFunc = FreeFallMoveMove;
        break;
    }
  });

  createBuffer(gl, program);

  document.getElementById("toggle").onclick = function () {
    flag = !flag;
    flag ? (this.innerText = "Stop") : (this.innerText = "Start");
  };

  document.getElementById("reset").onclick = function () {
    flag = false;
    moveX = -6.5;
    moveY = -2.4;
    moveZ = -1;
    document.getElementById("toggle").innerText = "Start";
    timeSecond = 0;
  };

  document.getElementById("zoom-i").addEventListener("click", function () {
    if (moveZ <= 3) {
      moveZ += 0.5;
      moveX += 0.4;
      moveY += 0.2;
      initMoveY = moveY - 0.01;
      initMovex = moveX * 2;
      console.log(moveZ, moveY);
    }
  });
  document.getElementById("zoom-o").addEventListener("click", function () {
    if (moveZ >= -3) {
      moveZ -= 0.5;
      moveX -= 0.4;
      moveY -= 0.2;
      initMoveY = moveY - 0.01;
      initMovex = moveX * 2;
      console.log(moveZ, moveY);
    }
  });

  viewMatrixLocation = gl.getUniformLocation(program, "uViewMatrix");
  projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
  moveMatrixLocation = gl.getUniformLocation(program, "uMoveMatrix");
  rotationMatrixLocation = gl.getUniformLocation(program, "uRotateMatrix");

  render();
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
  // console.log(move);
  if (flag) {
    timeSecond += 0.015;
    move = moveFunc(
      theta,
      moveX,
      moveY,
      moveZ,
      movespeed,
      angle,
      acceleration,
      timeSecond,
      anglex,
    );
    theta = move.theta;
    moveX = move.moveX;
    moveY = move.moveY;
    moveZ = move.moveZ;
    angle = move.angle;
    movespeed = move.movespeed;
  } else {
    theta += 0.01;
    angle += 2;
  }

  const target = vec3(0.0, 0.0, 0.0); // Look at the center (the object)
  const upDirection = vec3(0.0, 1.0, 0.0); // Up is in the Y direction
  var moveObjectMatrix = translate(moveX, moveY, moveZ);

  const rotationMatrix = rotate(angle, [0, 0, 2]);

  var modelViewMatrix = lookAt(cameraPosition, target, upDirection);
  var projectionMatrix = perspective(fovy, aspect, near, far);
  gl.uniformMatrix4fv(viewMatrixLocation, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
  gl.uniformMatrix4fv(moveMatrixLocation, false, flatten(moveObjectMatrix));
  gl.uniformMatrix4fv(rotationMatrixLocation, false, flatten(rotationMatrix));
  gl.drawArrays(gl.TRIANGLES, 0, numPositions);

  requestAnimationFrame(render);
}
