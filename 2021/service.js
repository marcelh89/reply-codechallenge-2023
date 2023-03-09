const {Room, Replier, Section} = require('./model');

module.exports = {
    readAll
}

function readAll(content){

    const byLines = content.split("\n")
    const room = readRoom(byLines);
    const repliers = readRepliers(room, byLines);

    return {
        room,
        repliers
    }

}

function readRoom(byLines){

    // line for begin of room info in file
    const fileLineFrom = 0;
    const roomSize = byLines[fileLineFrom];
    const widthHeight = roomSize.split(" ");
    const width = widthHeight[0]
    const height = widthHeight[1];

    // line for end of room info in file
    const fileLineTo = Number(height) + 1;
    const rows = byLines.slice(1, fileLineTo)

    return new Room(width, height, rows, fileLineFrom, fileLineTo);

}

function readRepliers(room, byLines){

    const repliers = [];

    const fileLineFrom = room.fileLineTo;

    const developersCount = Number(byLines[fileLineFrom]);
    const developerLines = byLines.slice(fileLineFrom + 1, fileLineFrom + 1 + developersCount);

    // create developers
    let idDeveloper = 0;
    for(line of developerLines){

        const columns = line.split(' ');

        const company = columns[0];
        const bonusPotential = Number(columns[1]);
        const type = "developer";
        const skillCount = Number(columns[2])
        const skills = [];

        for(var x = 3; x < skillCount + 3; x++){
            skills.push(columns[x])
        }

        repliers.push(new Replier(company, bonusPotential, type, skills, idDeveloper));
        idDeveloper += 1;
    }

    // create managers
    const managerStartLine = fileLineFrom + 1 + developersCount;

    const managerCount = Number(byLines[managerStartLine]);
    const managerLines = byLines.slice(managerStartLine + 1, managerStartLine + 1 + managerCount);

    let idManager = 0;
    for(line of managerLines){

        const columns = line.split(' ');

        const company = columns[0];
        const bonusPotential = Number(columns[1]);
        const type = "manager";
        const skills = [];

        repliers.push(new Replier(company, bonusPotential, type, skills, idManager));
        idManager += 1;
    }

    return repliers;

}

