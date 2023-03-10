import { readFile } from "./utils.js";
import fs from "fs";

function calculateSolution(input) {
    const [columns, rows, snakes] = input[0].split(' ').map(num => parseInt(num, 10));
    const snakeSizes = input[1].split(' ').map(num => parseInt(num, 10));
    const grid = input.slice(2);
  
    // Create 2D array of boolean values indicating whether a cell is occupied
    const occupied = [];
    for (let row = 0; row < rows; row++) {
      occupied.push([]);
      for (let col = 0; col < columns; col++) {
        occupied[row][col] = false;
      }
    }
  
    // Iterate through the grid and find the components and wormholes
    const components = [];
    const wormholes = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const value = grid[row][col];
        if (value === '*') {
          wormholes.push({ row,
  
  col });
        } else {
          components.push({ row, col, value: parseInt(value, 10) });
        }
      }
    }
  
    // Find all possible solutions
    let maxScore = 0;
    let bestSolution = [];
    for (let i = 0; i < snakes; i++) {
      const snakeSize = snakeSizes[i];

      //console.log("findSolution", snakeSize, occupied, components, wormholes)
      const solutions = findSolution(snakeSize, occupied, components, wormholes);
      console.log("solutions", solutions)
      const solutionScore = solutions.reduce((total, solution) => total + solution.score, 0);
      if (solutionScore > maxScore) {
        maxScore = solutionScore;
        bestSolution = solutions;
      }
    }
  
    // Convert the solution to the output format
    let output = '';
    bestSolution.forEach(solution => {
      output += `${solution.head.col} ${solution.head.row} ${solution.direction}`;
      if (solution.wormhole) {
        output += ` ${solution.wormhole.col} ${solution.wormhole.row}`;
      }
      output += '\n';
    });
  
    return {
      output,
      score: maxScore,
    };
  }
  
  function findSolution(snakeSize, occupied, components, wormholes) {
    // List to store all possible solutions
    const solutions = [];
  
    // Iterate through the components and try to find a solution
    components.forEach(component => {
      // Iterate through all the directions
      ['U', 'D', 'L', 'R'].forEach(direction => {
        // Calculate the tail of the snake
        let tail = {
          row: component.row,
          col: component.col,
        };
        switch (direction) {
          case 'U':
            tail.row -= snakeSize - 1;
            break;
          case 'D':
            tail.row += snakeSize - 1;
            break;
          case 'L':
            tail.col -= snakeSize - 1;
            break;
          case 'R':
            tail.col += snakeSize - 1;
            break;
  
  
        }
  
        // Check if tail is within the grid
        if (tail.row < 0 || tail.row >= occupied.length ||
            tail.col < 0 || tail.col >= occupied[0].length) {
          return;
        }
  
        // Check if the snake overlaps with other snakes
        let canPlaceSnake = true;
        for (let i = 0; i < snakeSize; i++) {
          const row = component.row + i * (direction === 'U' ? -1 : (direction === 'D' ? 1 : 0));
          const col = component.col + i * (direction === 'L' ? -1 : (direction === 'R' ? 1 : 0));
          if (occupied[row][col]) {
            canPlaceSnake = false;
            break;
          }
        }
  
        // If snake can be placed, add it to the solution
        if (canPlaceSnake) {
          // Calculate the head of the snake
          let head = {
            row: component.row + (direction === 'U' ? -1 : 0),
            col: component.col + (direction === 'L' ? -1 : 0),
          };
  
          // Check if the snake can enter a wormhole
          let wormhole;
          if (head.row === 0 || head.row === occupied.length - 1 ||
              head.col === 0 || head.col === occupied[0].length - 1) {
            wormholes.forEach(w => {
              if (w.row === head.row && w.col === head.col) {
                wormhole = w;
              }
            });
          }
  
          // If wormhole exists, check if the tail is also a wormhole
          if (wormhole) {
            let canEnterWormhole = false;
            wormholes.forEach(w => {
              if (w.row === tail.row && w.col === tail.col) {
                canEnterWormhole = true;
              }
            });
  
            if (!canEnterWormhole) {
              wormhole = null;
            }
          }
  
          // Add the solution if valid
          if (!wormhole || (tail.row >= 0 && tail.row < occupied.length &&
              tail.col >= 0 && tail.col < occupied[0].length)) {
            // Mark the cells as occupied
            for (let i = 0; i < snakeSize; i++) {
              const row = component.row + i * (direction === 'U' ? -1 : (direction === 'D' ? 1 : 0));
              const col = component.col + i * (direction === 'L' ? -1 : (direction === 'R' ? 1 : 0));
              occupied[row][col] = true;
            }
  
            // Add the solution
            solutions.push({
              head,
              tail,
              direction,
              wormhole,
              score: component.value,
            });
          }
        }
      });
    });
  
    return solutions;
  }

/**
 * main
 */
const files = fs.readdirSync("./inputs");
const filename = files[0];

const content = readFile("./inputs/" + filename);
const input = content.split("\n").map((e) => e.trim());

const solution = calculateSolution(input);
console.log(solution);
