const fs = require("fs");
const path = require("path");

const { findRepositoryRoot } = require("../repository");
const { readIndex } = require("../staging/index");
const { createBlob } = require("../objects/blob");

function getWorkingFiles(directory, repoRoot, files = []) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === ".enoo") {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      getWorkingFiles(fullPath, repoRoot, files);
    } else if (entry.isFile()) {
      const relativePath = path.relative(repoRoot, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

function status() {
  const repoRoot = findRepositoryRoot();
  const enooDir = path.join(repoRoot, ".enoo");
  const index = readIndex(enooDir);

  for (const [relativePath, objectId] of Object.entries(index)) {
    const filePath = path.join(repoRoot, relativePath);

    if (!fs.existsSync(filePath)) {
      console.log(`${relativePath} (deleted)`);
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const blob = createBlob(content);

    if (objectId !== blob.id) {
      console.log(`${relativePath} (modified)`);
    } else {
      console.log(`${relativePath} (unmodified)`);
    }
  }

  const workingFiles = getWorkingFiles(repoRoot, repoRoot);

  for (const relativePath of workingFiles) {
    if (!Object.hasOwn(index, relativePath)) {
      console.log(`${relativePath} (untracked)`);
    }
  }
}

module.exports = { status };
