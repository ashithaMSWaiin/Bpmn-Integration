const path = require('path');
const child_process_1 = require('child_process');

function startCmd(name, cmd) {
    return new Promise((resolve, reject) => {
        console.log(`Starting process: ${name}`);
        const process = child_process_1.exec(cmd, (error) => {
            if (error) {
                console.error(`Process ${name} failed:`, error.message);
                reject(error);
            } else {
                console.log(`Process ${name} completed successfully.`);
                resolve();
            }
        });

        process.stdout.on('data', (chunk) => {
            console.log(`${name} (stdout): ${chunk}`);
        });

        process.stderr.on('data', (chunk) => {
            console.error(`${name} (stderr): ${chunk}`);
        });
    });
}

async function startApps(apps) {
    console.log('Starting apps in parallel...');
    const processes = apps.map(app => {
        const cmd = `cd .\\bpmn-integration-mfe\\rds_pages\\${app} && npm run dev`;
        console.log(`Preparing to start: ${app}`);
        return startCmd(app, cmd);
    });

    try {
        await Promise.all(processes);
        console.log('All apps started successfully.');
    } catch (error) {
        console.error('One or more apps failed to start:', error);
    }
}

async function start() {
    const args = process.env.npm_config_projects;

    if (args) {
        console.log('Starting specified apps...', args);
        const projectToBuildArray = args.split(',');
        await startApps(projectToBuildArray);
    } else {
        console.log('Starting all apps...');
        const cmd = `cd .\\bpmn-integration-mfe && npm run start`;
        await startCmd('All', cmd);
    }
}

start().catch(error => {
    console.error('Failed to start apps:', error.message);
});