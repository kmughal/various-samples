//https://haveibeenpwned.com/ check if your email / password is compromised

// Md5 demo
//https://hashtoolkit.com/decrypt-md5-hash/ visit following site to decrpyt
// it's a week approach
const crypto = require("crypto");
const password = "myPassword1";
const md5Hash = crypto.createHash("md5");
md5Hash.update(password);
console.log(`MD5 output:${md5Hash.digest("hex")}`);

//Sha256
const sha256 = crypto.createHash("sha256");
sha256.update(password);
console.log(`Sha256 method output:${sha256.digest("hex")}`);

// Recommended algos are Argon2 , PBKDF2, Scrypt, bcrypt(blue fish algo.)
// https://github.com/OWASP/CheatSheetSeries link to cheatsheets

let salt = crypto.randomBytes(256).toString("hex");
const hashPassword = crypto.pbkdf2Sync(password, salt, 100000, 512, "sha512");
console.log(`hashed password: ${hashPassword.toString("hex")}`);

// Symmetric encryption: Use one key to encrypt and decrypt data.
const algo = "aes-256-cbc"; //aes - standard,256 = output , cbc = cypher
salt = crypto.randomBytes(32);
const key = crypto.scryptSync(password, salt, 32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algo, key, iv);
const dataToSecure = "111-9090-234";
let encryptData = cipher.update(dataToSecure,"utf8","hex");
encryptData += cipher.final("hex");
console.log("========================");
console.log("ciper output :", encryptData.toString("hex"));
// Now do the reverse!
const diCipher = crypto.createDecipheriv(algo, key, iv);
let deCryptCipher = diCipher.update(encryptData,"hex","utf8");
deCryptCipher += diCipher.final("utf8");
console.log("========================");
console.log("Decrypt cipher : ", deCryptCipher.toString("utf8"));
// Vault an open source kv data store!

//asymmetric alog ; Below is an example in which two parties wants to share keys!

const party1 = crypto.createDiffieHellman(2048
    /*this length must be more than 256 as the
     bigger the number hard to crack but take 
     more time to generate!*/);

const party1Key = party1.generateKeys();

const party2 = crypto.createDiffieHellman(party1.getPrime(),party1.getGenerator());
const party2Key = party2.generateKeys();

const party1Secrete = party1.computeSecret(party2Key);
const party2Secreate = party2.computeSecret(party1Key);
console.log("========================");
console.log("Party1 key: " , party1Secrete.toString("hex"));
console.log("Party2 key:" , party2Secreate.toString("hex"));


// Create a HMAC 
const hmac = crypto.createHmac("sha256" , "a secrete key!");
hmac.update("the text which you want to hash goes here!");
const hmacHash = hmac.digest("hex");
console.log("========================");
console.log("Hmac hash:" , hmacHash);
