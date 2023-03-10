const fs = require("fs");

const input = fs.readFileSync("../inputs/00-example.txt", "utf8").trim().split("\n");
const [C, R, S] = input[0].split(" ").map(Number);
const snake_lengths = input[1].split(" ").map(Number);
const grid = input.slice(2).map((row) => row.trim().split(" "));

const cells = [];
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    cells.push([r, c]);
  }
}

const visited = new Set();
let snakes = [];
for (let i = 0; i < S; i++) {
  const snake = [[0, 0, "", ""]];
  snakes.push(snake);
  visited.add("0 0");
}

while (true) {
  let best_cell = null;
  let best_score = -1;
  let best_snake_index = null;
  let best_snake_dir = null;
  let best_snake_wormhole = null;
  for (let i = 0; i < snakes.length; i++) {
    const snake = snakes[i];
    const head = snake[0];
    for (const [dr, dc, dir] of [
      [-1, 0, "U"],
      [1, 0, "D"],
      [0, -1, "L"],
      [0, 1, "R"],
    ]) {
      const r = (head[0] + dr + R) % R;
      const c = (head[1] + dc + C) % C;
      const key = `${r} ${c}`;
      if (visited.has(key)) {
        continue;
      }
      const relevance = Number(grid[r][c]);
      if (relevance === 0) {
        continue;
      }
      let score = relevance;
      for (const [other_r, other_c, other_dir, other_wormhole] of snake) {
        const distance =
          ((Math.abs(other_r - r) + Math.abs(other_c - c)) % R) +
          Math.abs(other_r - r) +
          (Math.abs(other_c - c) % C);
        if (distance < snake_lengths[i]) {
          score = 0;
          break;
        }
        if (distance < snake_lengths[i] + 2 && other_dir === dir) {
          score -= 1;
        }
        if (other_wormhole && other_r === r && other_c === c) {
          score -= 10;
        }
      }
      if (score > best_score) {
        best_cell = [r, c];
        best_score = score;
        best_snake_index = i;
        best_snake_dir = dir;
        best_snake_wormhole = head[3];
      }
    }
  }
  if (best_score === -1) {
    break;
  }
  const [r, c] = best_cell;
  visited.add(`${r} ${c}`);
  const snake = snakes[best_snake_index];
  snake.unshift([r, c, best_snake_dir, best_snake_wormhole]);
  if (grid[r][c] === "*") {
    let wormhole = "";
    for (const [wr, wc] of cells) {
      if (wr !== r || wc !== c || grid[r][c] !== "*") {
        continue;
      }
      for (const [other_wr, other_wc, other_dir, other_wormhole] of snake) {
        if (
          other_wr !== r ||
          other_wc !== c ||
          `${other_wc} ${other_wr}` ===
            snake[snake.length - 1][3]
        ) {
          continue;
        }
        wormhole = `${other_wc} ${other_wr}`;
        break;
      }
      break;
    }
    if (wormhole) {
      snake[snake.length - 1][3] = wormhole;
    }
  }
}

let total_score = 0;
const output = [];
for (const snake of snakes) {
  if (snake.length === 1) {
    output.push("");
    continue;
  }
  let score = 0;
  let wormhole = "";
  let last = snake[0];
  for (const [r, c, dir, new_wormhole] of snake.slice(1)) {
    const relevance = Number(grid[r][c]);
    score += relevance;
    if (new_wormhole) {
      wormhole = new_wormhole;
    }
    output.push(`${last[1]} ${last[0]} ${dir} ${wormhole}`);
    last = [r, c, dir, new_wormhole];
  }
  total_score += score;
}

fs.writeFileSync("output.txt", output.join("\n"));

console.log(total_score);
