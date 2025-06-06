// Imports
let path = require("path");
let { execSync } = require("child_process");
const elementsFolderPath = path.join(__dirname, "..", "bpmn-integration-elements");
const mfeFolderPath = path.join(__dirname, "..", "bpmn-integration-mfe");
const componentsFolderPath = path.join(__dirname, "..", "bpmn-integration-components");

console.log("\x1b[32m%s\x1b[0m", `Running tests...`);

execSync(`npm test`, {
    cwd: elementsFolderPath, //current working directory
    stdio: "inherit",
});

execSync(`npm test`, {
    cwd: mfeFolderPath,
    stdio: "inherit",
});

execSync(`npm test`, {
    cwd: componentsFolderPath,
    stdio: "inherit",
});

console.log("\x1b[32m%s\x1b[0m", `Tests run successfully!!`);