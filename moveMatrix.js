function uniformStrightMove(
  theta,
  moveX,
  moveY,
  moveZ,
  movespeed,
  direction,
  angle,
) {
  theta += 0.05;
  moveX += movespeed * 2 * direction;
  angle += 5;
  if (moveX > 5 || moveX < -5) {
    direction *= -1;
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

// function constantAcceleration(
//   theta,
//   moveX,
//   moveY,
//   moveZ,
//   movespeed,
//   direction,
//   angle,
// ) {}

function verticalMove(theta, moveX, moveY, moveZ, movespeed, direction, angle) {
  theta += 0.05;
  moveY += movespeed * 3 * direction;
  angle += 5;
  if (moveY > 4 || moveY < -4) {
    direction *= -1;
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
