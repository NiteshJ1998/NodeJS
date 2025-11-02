const fs = require("fs"); // file system

//Sync... call
// create file  pass data
// 1 argument  2nd argument
fs.writeFileSync("./test.txt", "Hello there");

//Async its expect callback fn
fs.writeFile("./test.txt", "Hello there Async", (err) => {});

// To read the files we use fs.readFileSync this readFileSync is syncronous fn
//when we use sync fn the result can be store on variable in our case we're using result as a variable

const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);

//Async readFile its expect callback function and give error and result
fs.readFile("./contact.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log(result);
  }
});

fs.appendFileSync("./text.txt", `${Date.now()} Hey There\n`);

fs.cpSync("./text.txt", "./copy.txt"); // to copy the files

//to remove file
fs.unlinkSync("./copy.txt");
