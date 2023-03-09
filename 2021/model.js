class Replier {

    constructor(company, bonusPotential, type, skills, inputPosition) {
        this.company = company  // company e.g. opn, clstr
        this.bonusPotential = bonusPotential
        this.type = type        // e.g. developer, manager
        this.skills = skills    // list of skills e.g. java, bpm
        this.inputPosition = inputPosition;
    }

}

class Room {

    constructor(width, height, rows, fileLineFrom, fileLineTo) {
        if (height) this.height = height.replace('\r', '');
        this.width = width;
        this.rows = rows;
        this.fileLineFrom = fileLineFrom;
        this.fileLineTo = fileLineTo;

        this.fitness = 0;

        this.SolutionMatrix;
        this.backlogManager = [];
        this.backlogDeveloper = [];
    }

    initSolutionMatrix() {
        let solutionMatrix = [];
        let i;
        for (i = 0; i < this.height; i++) {
            let withAxis = [];
            let j;
            for (j = 0; j < this.width; j++) {
                let section;
                // ToDo init with border of Blocked Section
                switch(this.rows[i][j]) {
                    // ToDo init schlauer machen
                    case '_':
                        //Developer Section
                        section = new Section(false, 'developer', this.backlogDeveloper.shift());
                        break;
                    case 'M':
                        //Manager Section
                        section = new Section(false, 'manager', this.backlogManager.shift());
                        break;
                    case '#':
                        // Blocked Section
                        section = new Section(true, '', null);
                        break;
                }
                
                withAxis.push(section);
            }
            solutionMatrix.push(withAxis)
        }

        this.solutionMatrix = solutionMatrix;
    }

    clone(room) {
        this.height = room.height;
        this.width = room.width;
        this.rows = room.rows;
        this.fileLineFrom = room.fileLineFrom;
        this.fileLineTo = room.fileLineTo;

        this.fitness = room.fitness;

        this.solutionMatrix = room.solutionMatrix;
        this.backlogManager = room.backlogManager;
        this.backlogDeveloper = room.backlogDeveloper;
        return this;
    }

    getRandomSection() {
        let rndHeight = null;
        let rndWidth = null;
        do {
            rndHeight = Math.floor(Math.random() * (this.height -1) );
            rndWidth = Math.floor(Math.random() * (this.width - 1) );
        }
        while (this.solutionMatrix[rndHeight][rndWidth].forbidden === true)
        
        return this.solutionMatrix[rndHeight][rndWidth];
    }

    toggleReplier() {
        let section = this.getRandomSection();
        if (section.allowedType === 'developer') {
            this.toggleDeveloper(section);
        } else if (section.allowedType === 'manager') {
            this.toggleManager(section);
        }
    }

    toggleManager(section) {
        let managerToStore = section.replier;
        section.replier = this.backlogManager.shift();
        if (managerToStore != null) {
            this.backlogManager.push(managerToStore);
        }
    }

    toggleDeveloper(section) {
        let developerToStore = section.replier;
        section.replier = this.backlogDeveloper.shift(); // FiFo Prinzip: Vorraussetzung Es gibt immer mehr Leute als freie Plätze
        if (developerToStore != null) {
            this.backlogDeveloper.push(developerToStore);
        }
    }

    calculateFitness() {
        let fitness = 0;
        
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                fitness += this.calculateFitnessForSection(x, y); 
            }
        }

        this.fitness = fitness;

        return this.fitness
    }

    calculateFitnessForSection(xAxis, yAxis) {
        // weil durch das tauschen einer enzelnene Sektion die Fitness nur durch die Umliegenden Sectionen bestimmt wird
        // Muss nicht die gesamte Matrix neu berechnet werden.
        
        let section = this.solutionMatrix[yAxis][xAxis];
        if (section.forbidden === true) {
            return 0; // There is no Fitness
        }

        let sectionRight = null;
        if (xAxis < (this.width - 1)) {
            sectionRight = this.solutionMatrix[yAxis][xAxis + 1];
        }

        let sectionBottom = null;
        if (yAxis < (this.height - 1)) {
            sectionBottom = this.solutionMatrix[yAxis + 1][xAxis];
        }

        let bonusPotential = 0;
        let workPotential = 0;

        if (sectionRight != null && sectionRight.forbidden === false) {
            if (section.replier.company === sectionRight.replier.company) {
                bonusPotential += (section.replier.bonusPotential * sectionRight.replier.bonusPotential);
            }
            if (section.replier.type === 'developer' && sectionRight.replier.type === 'developer') {
                workPotential += this.getWorkPotential(section.replier, sectionRight.replier);    
            }
        }

        if (sectionBottom != null && sectionBottom.forbidden === false) {
            if (section.replier.company === sectionBottom.replier.company) {    
                bonusPotential += (section.replier.bonusPotential * sectionBottom.replier.bonusPotential);
            }
            if (section.replier.type === 'developer' && sectionBottom.replier.type === 'developer') {
                workPotential += this.getWorkPotential(section.replier, sectionBottom.replier);                  
            }
        }

        if (bonusPotential > 30) {
            bonusPotential = 30;
        }


        return (bonusPotential + workPotential);
    }

    getWorkPotential(replier1, replier2) {
        let commonSkillsSize = replier1.skills.filter(function(val) {
            return replier2.skills.indexOf(val) != -1;
          }).length;

        if (commonSkillsSize === 0) {
            return 0;
        }

        let allSkills = new Set();
        replier1.skills.forEach(allSkills.add, allSkills);
        //allSkills.add(replier1.skills);
        //allSkills.add(replier2.skills);
        replier2.skills.forEach(allSkills.add, allSkills);
        let workPotential = commonSkillsSize * (allSkills.size - commonSkillsSize);

        return workPotential;
    }

    getOutputFormat() {
        let developers = [];
        let managers = [];

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let section = this.solutionMatrix[y][x];
                if (section.forbidden === false) {
                    if (section.replier.type === 'developer') {
                        developers[section.replier.inputPosition] = x + ' ' + y;
                    } else if (section.replier.type === 'manager') {
                        managers[section.replier.inputPosition] = x + ' ' + y;
                    }
                }
            }
        }

        for (let replier of this.backlogDeveloper) {
            developers[replier.inputPosition] = 'X';
        }

        for (let replier of this.backlogManager) {
            managers[replier.inputPosition] = 'X';
        }

        let result = '';

        for (let line of developers) {
            result += line + '\n';
        }

        for (let line of managers) {
            result += line + '\n';
        }

        return result;
    }

}

class Section {

    constructor(forbidden, allowedType, replier) {
        this.forbidden = forbidden;
        this.allowedType = allowedType;
        this.replier = replier;
    }
}


module.exports = {
    Replier,
    Room,
    Section
}

