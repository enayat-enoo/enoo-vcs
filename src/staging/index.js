
const fs = require("fs");
const path = require("path");

function readIndex(enooDir) {
    const indexPath = path.join(enooDir, "index.json");

    if (!fs.existsSync(indexPath)) {
        return {};
    }

    const content = fs.readFileSync(indexPath, "utf8");
    return JSON.parse(content);
}

function writeIndex(enooDir, index) {
    const indexPath = path.join(enooDir, "index.json");

    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
}

module.exports = { readIndex, writeIndex };
