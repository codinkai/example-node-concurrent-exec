//
// Dependencies
//
const async = require('async');
const util = require('util');
const { exec } = require("child_process");

const MAX_CONCURRENT_JOBS = 3;

//
// Helper funtion to generate a list of commands
//
async function generateCommandsList() {
    let commands = [];

    let NUM_PROCESSES = 100;
    
    for (var i=0; i < NUM_PROCESSES; i++) {
        let randomValue = 1 + Math.floor(Math.random()*10);
        commands[i] = "python pyscript.py " + i + " " + randomValue;
    }

    return commands;
}


async function run() {
    
    const commandsList = await generateCommandsList();

    async.eachLimit(commandsList, MAX_CONCURRENT_JOBS, (command, done) => {
        let startTime = Date.now();
        console.log("START CMD = " + command + "\n");

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log("ERROR CMD = " + command);
                console.log(error)
            }
            
            console.log("OUTPUT CMD = " + command);
            console.log(stdout);
            console.log("DONE CMD = " + command);
            let execTime = Date.now() - startTime;
            console.log("  Execution time: " + execTime + "\n");

            done();
        });
    });
}


run();

