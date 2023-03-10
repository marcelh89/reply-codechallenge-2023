const fs = require('fs');

const input = fs.readFileSync('../inputs/00-example.txt', 'utf8').trim().split('\n');
const [C, R, S] = input[0].split(' ').map(Number);
const snake_lengths = input[1].split(' ').map(Number);
const grid = input.slice(2).map(row => row.trim().split(' '));

const cells = [];
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    cells.push([r, c]);
  }
}

const visited = new Set();
let snakes = [];
for (let i = 0; i < S; i++) {
  const snake = [[0, 0, '', '']];
  snakes.push(snake);
  visited.add('0 0');
}

let total_score = 0;
while (true) {
  let best_cell = null;
  let best_score = -1;
  let best_snake_index = null;
  let best_snake_dir = null;
  let best_snake_wormhole = null;
  for (let i = 0; i < snakes.length; i++) {
    const snake = snakes[i];
    const head = snake[0];
    for (const [dr, dc, dir] of [[-1, 0, 'U'], [1, 0, 'D'], [0, -1, 'L'], [0, 1, 'R']]) {
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
        const distance = (Math.abs(other_r - r) + Math.abs(other_c - c)) % R + Math.abs(other_r - r) + Math.abs(other_c - c) % C;
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
  const [head_r, head_c, head_dir, head_wormhole] = snakes[best_snake_index][0];
  snakes[best_snake_index].unshift([r, c, best_snake_dir, grid[r][c]]);
if (grid[r][c] === '') {
const wormhole_positions = cells.filter(([r, c]) => grid[r][c] === '' && !visited.has(`${r} ${c}`));
const other_wormhole = wormhole_positions.find(([r, c]) => r !== head_r || c !== head_c);
const [other_wormhole_r, other_wormhole_c] = other_wormhole;
const [_, __, other_wormhole_dir] = snakes[best_snake_index][snakes[best_snake_index].length - 2];
snakes[best_snake_index][0][3] = `${other_wormhole_c} ${other_wormhole_r}`;
snakes[best_snake_index][1][2] = other_wormhole_dir;
}
total_score += best_score;
}

const output = snakes.map(snake => {
if (snake.length === 1) {
return '';
}
const [head_r, head_c, head_dir, head_wormhole] = snake[0];
return `${head_c} ${head_r} ${head_dir} ${head_wormhole}`;
}).join('\n');

console.log(total_score);
console.log(output);

fs.writeFileSync('output.txt', output);
