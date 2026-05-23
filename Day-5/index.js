const os = require("os")
const crypto = require("crypto")


// //*  get os plateform and user info
// // console.log(os.platform())
// // console.log(os.userInfo())



// //  get the cpu core info 
// console.log(os.cpus().length)

// console.log(os.arch())
// console.log(os.freemem())
// console.log(os.totalmem())




// * 1 Rendom Bytes 
const rendomBytes = crypto.randomBytes(8)

console.log(rendomBytes.toString("hex"))


// * 2 Creathash
const hashvalue  = crypto.createHash("sha256").update("kishna").digest("hex")
console.log(hashvalue)



const secretKey = crypto.randomBytes(32);

// IV (16 bytes)
const iv = crypto.randomBytes(16);

// Original message
const message = "Hello Shubham";



// ENCRYPTION
function encrypt(text) {
    const cipher = crypto.createCipheriv(
        "aes-256-cbc",
        secretKey,
        iv
    );

    let encrypted = cipher.update(text, "utf8", "hex");

    encrypted += cipher.final("hex");

    return encrypted;
}

// DECRYPTION
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        secretKey,
        iv
    );

    let decrypted = decipher.update(
        encryptedText,
        "hex",
        "utf8"
    );

    decrypted += decipher.final("utf8");

    return decrypted;
}

const encryptedData = encrypt(message);

console.log("Encrypted:", encryptedData);

const decryptedData = decrypt(encryptedData);

console.log("Decrypted:", decryptedData);