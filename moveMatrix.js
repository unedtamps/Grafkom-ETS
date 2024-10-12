function uniformStrightMove(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  direction,
  angle,
  acc,
  time,
) {
  var scale = 100;
  var prevMove = movespeed * (time - 0.01);
  var currentMove = movespeed * time;
  theta += 0.05;
  moveX = moveX + (currentMove - prevMove);
  angle += 5;
  if (moveX > 11) {
    moveX = -11;
  }
  document.getElementById("v-value").innerText = (
    (currentMove - prevMove) /
    0.01
  ).toFixed(2);
  return {
    theta,
    angle,
    direction,
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
  direction,
  angle,
  acc,
  time,
) {
  console.log(acc);
  var prevmove = movespeed * (time - 0.01) + acc * Math.pow(time - 0.01, 2);
  theta += 0.05;
  var calcuate = movespeed * time + acc * Math.pow(time, 2);
  moveX = moveX + (calcuate - prevmove);
  angle += 5;
  if (moveX > 11) {
    moveX = -11;
  }
  document.getElementById("v-value").innerText = (
    (calcuate - prevmove) /
    0.01
  ).toFixed(2);
  return {
    theta,
    angle,
    direction,
    moveX,
    moveY,
    moveZ,
    movespeed,
  };
}

function verticalMove(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  direction,
  angle,
  acc,
  time,
) {
  if (moveY <= -2.4) {
    time = 0;
    acc = 0;
    moveY = -2.4;
    acc = 0;
    movespeed = 0;
    console.log("masuk");
  }
  theta += 0.05;
  var prevMove = movespeed * (time - 0.01) - acc * Math.pow(time - 0.01, 2);
  var currentMove = movespeed * time - acc * Math.pow(time, 2);
  moveY = moveY + (currentMove - prevMove);
  angle += 5;
  // console.log("time", time);
  document.getElementById("v-value").innerText = (
    (currentMove - prevMove) /
    0.01
  ).toFixed(2);
  return {
    theta,
    angle,
    direction,
    moveX,
    moveY,
    moveZ,
    movespeed,
  };
}
