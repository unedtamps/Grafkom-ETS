var vertices = [];
var vertexColors = [];

function fives(a, b, c, d, e) {
  var positions = [];
  var colors = [];
  var indices = [a, b, c, a, c, d, a, d, e];
  const colorIndex = Math.round(Math.random() * 8);

  for (var i = 0; i < indices.length; ++i) {
    positions.push(vertices[indices[i]]);
    colors.push(vertexColors[indices[colorIndex]]); // Use the color of the first vertex for solid colors
  }
  return { positions, colors };
}

function createDodecahedron() {
  const A = (1 + Math.sqrt(5)) / 2; // The golden ratio
  const B = 1 / A;
  vertices = [
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

  vertexColors = [
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

  const f1 = fives(0, 16, 2, 10, 8);
  const f2 = fives(0, 8, 4, 14, 12);
  const f3 = fives(16, 17, 1, 12, 0);
  const f4 = fives(1, 9, 11, 3, 17);
  const f5 = fives(1, 12, 14, 5, 9);
  const f6 = fives(2, 13, 15, 6, 10);
  const f7 = fives(13, 3, 17, 16, 2);
  const f8 = fives(3, 11, 7, 15, 13);
  const f9 = fives(4, 8, 10, 6, 18);
  const f10 = fives(14, 5, 19, 18, 4);
  const f11 = fives(5, 19, 7, 11, 9);
  const f12 = fives(15, 7, 19, 18, 6);

  const positions = [
    ...f1.positions,
    ...f2.positions,
    ...f3.positions,
    ...f4.positions,
    ...f5.positions,
    ...f6.positions,
    ...f7.positions,
    ...f8.positions,
    ...f9.positions,
    ...f10.positions,
    ...f11.positions,
    ...f12.positions,
  ];
  const colors = [
    ...f1.colors,
    ...f2.colors,
    ...f3.colors,
    ...f4.colors,
    ...f5.colors,
    ...f6.colors,
    ...f7.colors,
    ...f8.colors,
    ...f9.colors,
    ...f10.colors,
    ...f11.colors,
    ...f12.colors,
  ];

  return { positions, colors };
}

function quad(a, b, c, d) {
  const indicies = [a, b, c, a, c, d];
  var position = [];
  var colors = [];
  for (let i = 0; i < indicies.length; i++) {
    positions.push(vertices[indicies[i]]);
    colors.push(vertexColors[indicies[1]]);
  }
  return { positions, colors };
}

function createCube() {
  vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
  ];

  vertexColors = [
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 1.0, 1.0, 1.0),
  ];

  const f1 = quad(1, 0, 3, 2);
  const f2 = quad(2, 3, 7, 6);
  const f3 = quad(3, 0, 4, 7);
  const f4 = quad(6, 5, 1, 2);
  const f5 = quad(4, 5, 6, 7);
  const f6 = quad(5, 4, 0, 1);

  const positions = [
    ...f1.positions,
    ...f2.positions,
    ...f3.positions,
    ...f4.positions,
    ...f5.positions,
    ...f6.positions,
  ];
  const colors = [
    ...f1.colors,
    ...f2.colors,
    ...f3.colors,
    ...f4.colors,
    ...f5.colors,
    ...f6.colors,
  ];
  return { positions, colors };
}
