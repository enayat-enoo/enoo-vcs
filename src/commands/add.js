const fs = require("fs");
const path = require("path");

const { findRepositoryRoot } = require("../repository");
const { createBlob } = require("../objects/blob");
const { writeObject } = require("../objects/store");
const { readIndex, writeIndex } = require("../staging/index");

function addFile(filePath) {
    const repoRoot = findRepositoryRoot();
    const resolvedPath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
        throw new Error(`File not found: ${filePath}`);
    }

    const content = fs.readFileSync(resolvedPath);
    const blob = createBlob(content.toString("utf8"));

    const enooDir = path.join(repoRoot, ".enoo");
    const objectId = writeObject(enooDir, blob);

    const index = readIndex(enooDir);
    const relativePath = path.relative(repoRoot, resolvedPath);
    index[relativePath] = objectId;
    writeIndex(enooDir, index);
}

module.exports = { addFile };