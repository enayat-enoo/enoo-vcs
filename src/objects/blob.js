const crypto = require("crypto")

 function createBlob(content){
    const buffer = Buffer.from(content,"utf8");

    const serialized = `blob\n${buffer.length}\n\n${content}`
    const id = crypto.createHash("sha256").update(serialized).digest("hex")
    return {
        id,
        content: buffer,
        length: buffer.length,
        serialized
    }
}

module.exports = { createBlob };
