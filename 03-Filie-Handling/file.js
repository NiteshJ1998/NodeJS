const fs = require("fs");

//Sync
// fs.writeFileSync("./test.txt", "Hello there");

//Async
fs.writeFile("./test.txt", "Hello there Async", (err) => {});

// To read the files we use fs.readFileSync
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);

fs.appendFileSync("./text.txt", `${Date.now()} Hey There\n`);

fs.cpSync("./text.txt", "./copy.txt"); // to copy the files

//to remove file
fs.unlinkSync("./copy.txt");
