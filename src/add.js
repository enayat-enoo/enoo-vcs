const fs = require("fs");

async function add(enooDir, blob) {
    const objectPath = path.join(enooDir, "objects", blob.id);

    if (fs.existsSync(objectPath)) {
        return blob.id;
    }

    fs.writeFileSync(objectPath, blob.serialized);

    return blob.id;
}