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
  theta += 0.05;
  moveX += (movespeed * direction) / scale;
  angle += 5;
  if (moveX > 11) {
    moveX = -11;
  }
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
  var scale = 100;
  var prevmove =
    (movespeed * (time - 0.01) + acc * Math.pow(time - 0.01, 2)) / scale;
  theta += 0.05;
  var calcuate = (movespeed * time + acc * Math.pow(time, 2)) / scale;
  moveX = moveX + (calcuate - prevmove);
  angle += 5;
  if (moveX > 11) {
    moveX = -11;
  }
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
  var scale = 100;
  theta += 0.05;
  console.log("time", time);
  moveY = (movespeed * time - (acc * Math.pow(time, 2)) / 2) / 100;
  angle += 5;
  // console.log("time", time);
  console.log("MoveY", moveY);
  if (moveY <= -2) {
    time = 0;
    acc = 0;
    moveY = -2;
  }
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
