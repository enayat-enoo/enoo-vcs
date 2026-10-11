const { addFile } = require("./commands/add");

function main() {
    const command = process.argv[2];

    if (command === "add") {
        const filePath = process.argv[3];

        if (!filePath) {
            throw new Error("Usage: enoo add <file>");
        }

        addFile(filePath);
        return;
    }

    console.log("Usage: enoo <command>");
}

main();