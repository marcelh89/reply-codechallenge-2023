const fs = require("fs");

const input = fs.readFileSync("../inputs/00-example.txt", "utf-8").trim().split("\n");

const [C, R, S] = input[0].split(" ").map(Number);
const snake_lengths = input[1].split(" ").map(Number);
const grid = input.slice(2).map((row) => row.split(" "));

const cells = [];
const bodies = [];
for (let i = 0; i < S; i++) {
  bodies.push(new Set());
}
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (grid[r][c] !== "*") {
      cells.push([grid[r][c], c, r]);
    }
  }
}

const dist = [];
for (let i = 0; i < R * C; i++) {
  dist[i] = new Array(R * C).fill(Infinity);
  dist[i][i] = 0;
}
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    if (grid[r][c] !== "*") {
      const src = r * C + c;
      for (const [dx, dy] of [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
      ]) {
        const nr = (r + dy + R) % R;
        const nc = (c + dx + C) % C;
        const dst = nr * C + nc;
        if (dist[src][dst] === Infinity) {
          dist[src][dst] = dist[src][src] + 1;
        }
      }
    }
  }
}
for (let k = 0; k < R * C; k++) {
  for (let i = 0; i < R * C; i++) {
    for (let j = 0; j < R * C; j++) {
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
    }
  }
}

const snakes = [];
for (let i = 0; i < S; i++) {
  snakes.push([]);
}
for (const [_, c, r] of cells) {
  if (
    snakes.every(
      (snake) => snake.length === snake_lengths[snakes.indexOf(snake)]
    )
  ) {
    break;
  }
  if (grid[r][c] === "*") {
    continue;
  }
  let selected_snake = null;
  let min_cost = Infinity;
  for (let i = 0; i < S; i++) {
    if (snakes[i].length < snake_lengths[i]) {
      if (snakes[i].length > 0) {
        const [last_c, last_r, _] = snakes[i][snakes[i].length - 1];
        const src = last_r * C + last_c;
        const dst = r * C + c;
        const dist_cost = 1 / (1 + dist[src][dst]);
        const overlap_penalty = snakes.reduce(
          (acc, snake, j) =>
            i !== j
              ? acc +
                (snake.length > 0
                  ? new Set([
                      `${last_c},${last_r}`,
                      ...snake.map(([c, r]) => `${c},${r}`),
                    ]).has(`${c},${r}`)
                  : 0)
              : acc,
          0
        );
        const cost = dist_cost + overlap_penalty;
        if (cost < min_cost) {
          selected_snake = snakes[i];
          min_cost = cost;
        }
      } else {
        selected_snake = snakes[i];
        min_cost = 0;
      }
    }
  }
  if (selected_snake !== null) {
    const [last_c, last_r, _] = selected_snake[selected_snake.length - 1] || [
      -1,
      -1,
      "",
    ];
    const dx = c - last_c;
    const dy = r - last_r;
    let direction;
    if (dx < 0) {
      direction = "L";
    } else if (dx > 0) {
      direction = "R";
    } else if (dy < 0) {
      direction = "U";
    } else {
      direction = "D";
    }
    selected_snake.push([c, r, direction]);
    if (grid[r][c] === "") {
      let wormhole = "";
      for (const [wr, wc] of cells) {
        if (wr !== r || wc !== c || grid[r][c] !== "*") {
          continue;
        }
        for (const [other_wr, other_wc] of cells) {
          if (
            other_wr !== r ||
            other_wc !== c ||
            `${other_wc} ${other_wr}` ===
              selected_snake[selected_snake.length - 1][3]
          ) {
            continue;
          }
          wormhole = `${other_wc} ${other_wr}`;
          break;
        }
        break;
      }
      if (wormhole) {
        selected_snake[selected_snake.length - 1][3] = wormhole;
      }
    }
    bodies[snakes.indexOf(selected_snake)].add(`${c},${r}`);
  }
}

let score = 0;
for (let i = 0; i < S; i++) {
  if (snakes[i].length > 0) {
    const [u, __, _, wormhole] = snakes[i][snakes[i].length - 1];
    for (const [c, r, _, __] of snakes[i]) {
      score += Number(grid[r][c]) || 0;
    }
    if (wormhole !== "") {
      score--;
    }
  }
}

const output = fs.createWriteStream("output.txt");
for (const snake of snakes) {
  if (snake.length > 0) {
    for (const [c, r, direction, wormhole] of snake) {
      output.write(`${c} ${r} ${direction} ${wormhole}\n`);
    }
  } else {
    output.write("\n");
  }
}
output.end();

console.log(score);
