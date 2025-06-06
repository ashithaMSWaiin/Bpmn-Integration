// Imports
let path = require("path");
let { execSync } = require("child_process");
const coreFolderPath = path.join(__dirname, "..", "bpmn-integration-react-core");
const elementsFolderPath = path.join(__dirname, "..", "bpmn-integration-elements");
const componentsFolderPath = path.join(__dirname, "..", "bpmn-integration-components");
const mfeFolderPath = path.join(__dirname, "..", "bpmn-integration-mfe");
const layoutsFolderPath = path.join(__dirname, "..", "bpmn-integration-layouts");

console.log("\x1b[32m%s\x1b[0m", `Installing dependencies...`);
execSync(`npm install`, {
    cwd: coreFolderPath,
    stdio: "inherit",
});

execSync(`npm install`, {
    cwd: elementsFolderPath,
    stdio: "inherit",
});

execSync(`npm install`, {
    cwd: componentsFolderPath,
    stdio: "inherit",
});

execSync(`npm install`, {
    cwd: layoutsFolderPath,
    stdio: "inherit",
});

execSync(`npm install`, {
    cwd: mfeFolderPath,
    stdio: "inherit",
});

execSync(`npm install`, {
    cwd: ".",
    stdio: "inherit",
});

console.log("\x1b[32m%s\x1b[0m", `Dependencies installed successfully!!`);
