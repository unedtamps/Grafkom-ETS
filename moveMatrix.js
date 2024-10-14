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
  theta += 0.005;
  moveX = moveX + (currentMove - prevMove);
  angle += 5;
  if (moveX > 11) {
    moveX = -11;
  }
  document.getElementById("v-value").innerText = (
    (currentMove - prevMove) /
    0.015
  ).toFixed(2);
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
  theta += 0.005;
  var calcuate = movespeed * time + acc * Math.pow(time, 2);
  moveX = moveX + (calcuate - prevmove);
  angle += 5;
  if (moveX > 11) {
    moveX = -11;
  }
  document.getElementById("v-value").innerText = (
    (calcuate - prevmove) /
    0.015
  ).toFixed(2);
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
  if (moveY <= -2.4) {
    time = 0;
    acc = 0;
    moveY = -2.4;
    acc = 0;
    movespeed = 0;
  }
  theta += 0.005;
  var prevMove = movespeed * (time - 0.015) - acc * Math.pow(time - 0.015, 2);
  var currentMove = movespeed * time - acc * Math.pow(time, 2);
  moveY = moveY + (currentMove - prevMove);
  angle += 5;
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
  velocityX,
  velocityY,
  acc,
  time,
  g = 9.8 // Gravitasi default
) {
  // Posisi horizontal (x)
  var prevMoveX = velocityX * (time - 0.01);
  var currentMoveX = velocityX * time;
  moveX = moveX + (currentMoveX - prevMoveX);

  // Posisi vertikal (y)
  var prevMoveY = velocityY * (time - 0.01) - 0.5 * g * Math.pow(time - 0.01, 2);
  var currentMoveY = velocityY * time - 0.5 * g * Math.pow(time, 2);
  moveY = moveY + (currentMoveY - prevMoveY);

  theta += 0.05;
  angle += 5;

  // Deteksi ketika objek jatuh ke tanah 
  if (moveY <= -2.4) {
    moveY = -2.4;
    time = 0; 
    velocityY = 0; 
  }

  // Update nilai kecepatan yang ditampilkan di elemen HTML
  document.getElementById("v-value").innerText = (
    (currentMoveY - prevMoveY) / 0.01
  ).toFixed(2);

  return {
    theta,
    angle,
    direction,
    moveX,
    moveY,
    moveZ,
    velocityX,
    velocityY
  };
}

