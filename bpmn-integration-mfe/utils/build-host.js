const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");

const mfeFilePath = path.join(__dirname, "../rds_pages/", "mfe-config.ts");
const mfeFilePathTemp = path.join(__dirname, "../rds_pages/", "mfe-configtemp.ts");
const portFilePath = path.join(__dirname, "../rds_pages/", "port-config.ts");

if (process.argv.length > 3) {
    console.log("Invalid command");
    process.exit(0);
}

const envFileContent = fs.readFileSync(path.join(__dirname, "../rds_pages/host/.env"), "utf8");
const lines = envFileContent.split("\n");
const envObject = {};
for (const line of lines) {
    const [key, value] = line.split("=");
    if (key && value) {
        envObject[key.trim()] = value.trim();
    }
}
const apiKey = envObject["REACT_APP_URL"];
let replaceUrl = envObject["REACT_APP_REPLACE_URL"];
if (!replaceUrl) replaceUrl = "false";
if (!apiKey) {
    console.error("REACT_APP_URL is not defined in the .env file.");
    process.exit(0);
}

let mfeConfig = fs.readFileSync(mfeFilePath).toString();
let mfeConfigJSON = mfeConfig.substring(mfeConfig.indexOf("{"), mfeConfig.lastIndexOf("}") + 1);

mfeConfigJSON = JSON.parse(mfeConfigJSON);
if (replaceUrl == "true") {
    console.log("Changing URLs in configuration file...");
    fs.copyFileSync(mfeFilePath, mfeFilePathTemp);

    let portConfig = fs.readFileSync(portFilePath).toString();
    let portConfigJSON = portConfig.substring(portConfig.indexOf("{"), portConfig.lastIndexOf("}") + 1);
    portConfigJSON = JSON.parse(portConfigJSON);

    for (const mfeConf of Object.keys(mfeConfigJSON)) {
        let pathConf = "";
        let url = mfeConfigJSON[mfeConf].url;
        let portIndex = url.indexOf("localhost:");
        let portConfig = url.substring(portIndex + 10, portIndex + 14);

        for (const portConf of Object.keys(portConfigJSON)) {
            let port = portConfigJSON[portConf].port;
            if (portConfig == port) {
                pathConf = portConf;
                if (portConf == "host") {
                    url = url.replace(/((http|https):\/\/localhost:)\d{4}/g, apiKey);
                } else {
                    url = url.replace(/((http|https):\/\/localhost:)\d{4}/g, apiKey + "/" + "rds-page-" + pathConf);
                }
                mfeConfigJSON[mfeConf].url = url;
                break;
            }
        }
    }

    mfeConfig = mfeConfig.substring(0, mfeConfig.indexOf("{")) + JSON.stringify(mfeConfigJSON, null, 2);

    fs.writeFileSync(mfeFilePath, mfeConfig);
}

execSync("concurrently \"cd rds_pages/host && npm run build\"", { cwd: process.cwd(), stdio: "inherit" });

console.log("Deleting temporary files...");
if (replaceUrl == "true") {
    fs.copyFileSync(mfeFilePathTemp, mfeFilePath);
    if (fs.existsSync(mfeFilePathTemp)) {
        fs.unlinkSync(mfeFilePathTemp);
    }
}

console.log("Done...");
