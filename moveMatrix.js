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
