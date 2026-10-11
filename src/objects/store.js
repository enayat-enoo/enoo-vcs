const fs = require("fs");
const path = require("path");

function writeObject(enooDir, blob) {
    const objectPath = path.join(enooDir, "objects", blob.id);

    if (fs.existsSync(objectPath)) {
        return blob.id;
    }

    fs.writeFileSync(objectPath, blob.serialized);

    return blob.id;
}

module.exports = { writeObject };