var logger = require("./logger");

logger.log("hhhhh");


// console.log(global);
// console.log(module);


const path = require("path");
const pathObj = path.parse(__filename);
console.log(pathObj);


const os = require("os");

let totalmem = os.totalmem();
let freemem = os.freemem();

console.log(`Total mem: ${ totalmem / 1024 / 1024 / 1024 }`);
console.log(`Free mem: ${ freemem / 1024 / 1024 / 1024 }`);