const {readFile, writeOutput} = require('./File');
const { Room } = require('./model');
const {readAll} = require('./service');


let filename = 'b_dream';
const content = readFile('./input/' + filename + '.txt');
//const content = readFile('./input/a_solar.txt');
//const content = readFile('./input/b_dream.txt');
//const content = readFile('./input/c_soup.txt');
//const content = readFile('./input/d_maelstrom.txt');
//const content = readFile('./input/e_igloos.txt');
//const content = readFile('./input/f_glitch.txt');
//console.log(content)


/**
 * GIVEN
 */

// Developer D ( Company, Bonus, Skillset )
// Manager M ( Company, Bonus)
// Bonus B given for each Developer or Project Manager from the same company next to them

// Work potential WP(D1, D2) for two neighboured Developers (left, right, above, below NOT diagonal)
// WP(D1, D2) = |Si ∩ Sj| · (|Si ∪ Sj| − |Si ∩ Sj|)
// e.g. Dev1 = Python, Dev2 Java => no skills in Common                     => WP = 0 · (|Si ∪ Sj| − |Si ∩ Sj|) = 0
// e.g. Dev1 = Python, Dev2 Python + Java => one skills in Common           => WP = 1 * (2 - 1) = 1
// e.g. Dev1 = Python, Javascript, Typescript Dev2 = Java, Kotlin, Python   => WP = 1 * (5 - 1) = 5
// Tactic?! Put good developers many skills and many skills in common) together - they multiply better!
// Managers have no Work Potential => WP(Manager) = 0

// Bonus potential BP(D1,D2) for Developers on same company
// BP(D1,D2) = B1 * B2
// e.g. BP = 0 for different companies
// e.g. Dev1 and Dev2 have same company => B(D1) = 2, B(D2) = 3 => BP(D1,D2) = 6

// Total Potential
// Replier R1, R2 (Manager or Developer)
// TP(R1,R2) = WP(R1,R2) + BP(R1,R2)

// input description - legend (e.g. with a_soloar.txt)
// # Unavailable cells (walls, corridors,...)
// 1st line width and height of the floor
// 2nd - 4th line - block representing the office floor
//      _ Developer cell
//      M Manager cell
//      M can only sit on M cell, D can only sit on D cell, # nobody can sit here
// 5th line: number of Devs
// 6th - 15th line: block of dev description
//      Company, BonusPotential, NumberOfSkills, Skill list..
// 16th line: number of Managers
// 17th - 19th line: block of manager description


/**
 * create object models from file Input
 */
const objects = readAll(content)

// füllen des Backlog an Mitarbeitern
objects.room.backlogDeveloper = objects.repliers.filter(r => r.type === "developer"); 
objects.room.backlogManager = objects.repliers.filter(r => r.type === "manager");

// Initiale Füllung der Solution Matrix
objects.room.initSolutionMatrix();

objects.room.calculateFitness();

let maxWasteIteration = 100;
// ToDo pro Iteration werden x Variationen des vorausgegangenen Raums erstellt
let x = 20;
let iterationBestRoom;
let newRoom = null;
let wasteIteration = 0;
while (wasteIteration < maxWasteIteration) {
    iterationBestRoom = objects.room;
    for (let  i = 0;   i < (x-1); i++) {
        newRoom = new Room().clone(objects.room);
        newRoom.toggleReplier();
        newRoom.calculateFitness();
        if (iterationBestRoom.fitness < newRoom.fitness) {
            iterationBestRoom = newRoom;
        }     
    }

    if (iterationBestRoom.fitness <= objects.room.fitness) {
        wasteIteration += 1;
    } else {
        wasteIteration = 0;
        writeOutput('./output/' + filename + '.txt', objects.room.getOutputFormat());
        objects.room = iterationBestRoom;
    }
    console.log(objects.room.fitness);
}



console.log('fitness: ' + objects.room.fitness);
console.log(objects.room.getOutputFormat());
writeOutput('./output/' + filename + '.txt', objects.room.getOutputFormat());
//console.log(JSON.stringify(objects.room, null, 2));




/**
 * TODO Do the magic
 */




//writeOutput("./output/out.txt", "some content\nnewline");

