const fs = require("fs");
const path = require("path");

function initRepository(repositoryPath) {
  const enooPath = path.join(repositoryPath, ".enoo");

  if (fs.existsSync(enooPath)) {
    throw new Error("Repository already initialized");
  }

  fs.mkdirSync(path.join(enooPath, "objects"), { recursive: true });
  fs.mkdirSync(path.join(enooPath, "refs", "heads"), { recursive: true });
  fs.mkdirSync(path.join(enooPath, "refs", "tags"), { recursive: true });

  fs.writeFileSync(
    path.join(enooPath, "HEAD"),
    "ref: refs/heads/main\n"
  );

  fs.writeFileSync(
    path.join(enooPath, "config"),
    ""
  );

  return enooPath;
}

module.exports = {
  initRepository,
};