function uniformStrightMove(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  angle,
  acc,
  time,
) {
  var prevMove = movespeed * (time - 0.015);
  var currentMove = movespeed * time;
  theta += thetajump;
  moveX = moveX + (currentMove - prevMove);
  angle += anglejump;
  if (moveX > -initMovex) {
    moveX = initMovex;
  }
  document.getElementById("v-value").innerText = (
    (currentMove - prevMove) /
    0.015
  ).toFixed(2);
  document.getElementById("s-value").innerText = currentMove.toFixed(2);

  return {
    theta,
    angle,
    moveX,
    moveY,
    moveZ,
    movespeed,
  };
}

function constantAcceleration(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  angle,
  acc,
  time,
) {
  console.log(acc);
  var prevmove = movespeed * (time - 0.015) + acc * Math.pow(time - 0.015, 2);
  theta += thetajump;
  var calcuate = movespeed * time + acc * Math.pow(time, 2);
  moveX = moveX + (calcuate - prevmove);
  angle += anglejump;
  if (moveX > -initMovex) {
    moveX = initMovex;
  }
  document.getElementById("v-value").innerText = (
    (calcuate - prevmove) /
    0.015
  ).toFixed(2);

  document.getElementById("s-value").innerText = calcuate.toFixed(2);
  return {
    theta,
    angle,
    moveX,
    moveY,
    moveZ,
    movespeed,
  };
}

function verticalMove(theta, moveX, moveY, moveZ, movespeed, angle, acc, time) {
  if (moveY <= initMoveY) {
    time = 0;
    acc = 0;
    moveY = initMoveY;
    acc = 0;
    movespeed = 0;
  }
  theta += thetajump;
  var prevMove = movespeed * (time - 0.015) - acc * Math.pow(time - 0.015, 2);
  var currentMove = movespeed * time - acc * Math.pow(time, 2);
  moveY = moveY + (currentMove - prevMove);
  angle += anglejump;
  document.getElementById("v-value").innerText = (
    (currentMove - prevMove) /
    0.015
  ).toFixed(2);
  document.getElementById("h-value").innerText = currentMove.toFixed(2);
  return {
    theta,
    angle,
    moveX,
    moveY,
    moveZ,
    movespeed,
  };
}

function parabolaMove(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  angle,
  acc,
  time,
  anglex,
) {
  // Konversi sudut ke radian
  let thetaRad = (anglex * Math.PI) / 180;

  // Hitung komponen kecepatan
  velocityX = movespeed * Math.cos(thetaRad);
  velocityY = movespeed * Math.sin(thetaRad);

  // Posisi horizontal (x)
  var prevMoveX = velocityX * (time - 0.01);
  var currentMoveX = velocityX * time;
  moveX = moveX + (currentMoveX - prevMoveX);

  // Posisi vertikal (y)
  var prevMoveY =
    velocityY * (time - 0.01) - 0.5 * acc * Math.pow(time - 0.01, 2);
  var currentMoveY = velocityY * time - 0.5 * acc * Math.pow(time, 2);
  moveY = moveY + (currentMoveY - prevMoveY);

  theta += thetajump;
  angle += anglejump;

  if (moveY <= initMoveY) {
    moveY = initMoveY; // Batas tanah
    time = 0; // Reset waktu
    velocityY = 0; // Reset kecepatan vertikal setelah jatuh
    currentMoveY = 0;
    prevMoveY = 0;
  }
  if (moveX > -initMovex) {
    moveX = initMovex;
  }
  document.getElementById("v-value").innerText = (
    (currentMoveX - prevMoveX) /
    0.015
  ).toFixed(2);
  document.getElementById("h-value").innerText = currentMoveY.toFixed(2);
  document.getElementById("s-value").innerText = currentMoveX.toFixed(2);
  return {
    theta,
    angle,
    moveX,
    moveY,
    moveZ,
    movespeed,
    anglex,
  };
}

function FreeFallMoveMove(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  angle,
  acc,
  time,
) {
  theta += thetajump;
  console.log(initMoveY);

  if (moveY <= initMoveY) {
    time = 0;
    moveY = initMoveY;
    movespeed = 0;
    acc = 0;
  }
  var prevMove = -acc * Math.pow(time - 0.015, 2);
  var currentMove = -acc * Math.pow(time, 2);
  moveY = moveY + (currentMove - prevMove);
  angle += anglejump;

  document.getElementById("v-value").innerText = (
    (currentMove - prevMove) /
    0.015
  ).toFixed(2);
  document.getElementById("h-value").innerText = (moveY - initMoveY).toFixed(2);

  return {
    theta,
    angle,
    moveX,
    moveY,
    moveZ,
    movespeed,
    toggleff,
  };
}
