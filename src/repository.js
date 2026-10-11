const fs = require("fs");
const path = require("path");

function findRepositoryRoot(startPath = process.cwd()) {
    let currentPath = path.resolve(startPath);

    while (true) {
        const enooPath = path.join(currentPath, ".enoo");

        if (fs.existsSync(enooPath) && fs.statSync(enooPath).isDirectory()) {
            return currentPath;
        }

        const parentPath = path.dirname(currentPath);

        if (parentPath === currentPath) {
            throw new Error("Not inside an Enoo repository.");
        }

        currentPath = parentPath;
    }
}

module.exports = { findRepositoryRoot };