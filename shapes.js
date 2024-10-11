function fives(a, b, c, d, e, vertices, vertexColors) {
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

function createDeca() {
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

  const f1 = fives(0, 16, 2, 10, 8, vertices, vertexColors);
  const f2 = fives(0, 8, 4, 14, 12, vertices, vertexColors);
  const f3 = fives(16, 17, 1, 12, 0, vertices, vertexColors);
  const f4 = fives(1, 9, 11, 3, 17, vertices, vertexColors);
  const f5 = fives(1, 12, 14, 5, 9, vertices, vertexColors);
  const f6 = fives(2, 13, 15, 6, 10, vertices, vertexColors);
  const f7 = fives(13, 3, 17, 16, 2, vertices, vertexColors);
  const f8 = fives(3, 11, 7, 15, 13, vertices, vertexColors);
  const f9 = fives(4, 8, 10, 6, 18, vertices, vertexColors);
  const f10 = fives(14, 5, 19, 18, 4, vertices, vertexColors);
  const f11 = fives(5, 19, 7, 11, 9, vertices, vertexColors);
  const f12 = fives(15, 7, 19, 18, 6, vertices, vertexColors);

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

function quad(a, b, c, d, vertices, vertexColors) {
  const indicies = [a, b, c, a, c, d];
  var positions = [];
  var colors = [];
  for (let i = 0; i < indicies.length; i++) {
    positions.push(vertices[indicies[i]]);
    colors.push(vertexColors[indicies[4]]);
  }
  return { positions, colors };
}

function createCube() {
  var vertices = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
  ];

  var vertexColors = [
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 1.0, 0.0, 1.0),
    vec4(0.0, 1.0, 0.0, 1.0),
    vec4(0.0, 0.0, 1.0, 1.0),
    vec4(1.0, 0.0, 1.0, 1.0),
    vec4(1.0, 1.0, 1.0, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 1.0, 1.0, 1.0),
  ];

  const f1 = quad(1, 0, 3, 2, vertices, vertexColors);
  const f2 = quad(2, 3, 7, 6, vertices, vertexColors);
  const f3 = quad(3, 0, 4, 7, vertices, vertexColors);
  const f4 = quad(6, 5, 1, 2, vertices, vertexColors);
  const f5 = quad(4, 5, 6, 7, vertices, vertexColors);
  const f6 = quad(5, 4, 0, 1, vertices, vertexColors);

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

function createSphere() {
  var SPHERE_DIV = 30; // Lower divisions to make debugging easier
  var i, ai, si, ci;
  var j, aj, sj, cj;
  var p1, p2;
  var vertices = [],
    indices = [];

  // Add north pole
  vertices.push(vec4(0, 1, 0, 1.0));

  // Generate vertices for the sphere body
  for (j = 1; j < SPHERE_DIV; j++) {
    aj = (j * Math.PI) / SPHERE_DIV;
    sj = Math.sin(aj);
    cj = Math.cos(aj);
    for (i = 0; i <= SPHERE_DIV; i++) {
      ai = (i * 2 * Math.PI) / SPHERE_DIV;
      si = Math.sin(ai);
      ci = Math.cos(ai);
      vertices.push(vec4(si * sj, cj, ci * sj, 1.0));
    }
  }

  // Add south pole
  vertices.push(vec4(0, -1, 0, 1.0));

  // Top hemisphere (north pole)
  for (i = 0; i < SPHERE_DIV; i++) {
    indices.push(0, i + 1, i + 2); // Connect north pole to first row
  }

  // Body of the sphere
  for (j = 0; j < SPHERE_DIV - 2; j++) {
    for (i = 0; i < SPHERE_DIV; i++) {
      p1 = j * (SPHERE_DIV + 1) + i + 1;
      p2 = p1 + (SPHERE_DIV + 1);
      indices.push(p1, p2, p1 + 1);
      indices.push(p1 + 1, p2, p2 + 1);
    }
  }

  // Bottom hemisphere (south pole)
  var lastRowOffset = (SPHERE_DIV - 2) * (SPHERE_DIV + 1) + 1;
  var southPoleIndex = vertices.length - 1;
  for (i = 0; i < SPHERE_DIV; i++) {
    indices.push(southPoleIndex, lastRowOffset + i, lastRowOffset + i + 1); // Connect last row to south pole
  }

  var vertexColors = [
    vec4(1.0, 0.0, 0.0, 1.0), // Red
    vec4(0.0, 0.0, 1.0, 1.0), // Blue
  ];

  let positions = [];
  let colors = [];

  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    positions.push(vertices[index]);
    colors.push(vertexColors[i % vertexColors.length]); // Cycle through colors
  }

  return { positions, colors };
}