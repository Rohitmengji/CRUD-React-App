// console.log('hello world');
// console.log(globalThis);
// const { add, mul, sub } = require("../backend/math");
// const os = require("os");
// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(path.extname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(__filename);

// console.log(path.parse(__filename));

// console.log(add(2, 9));
// console.log(sub(12, 9));
// console.log(mul(2, 5));

const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

// fs.readFile("./test.txt", (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
//   //   console.log("read completed");
// });

// const fileOps = async () => {
//   try {
//     const data = await fsPromises.readFile(
//       path.join(__dirname, "test.txt"),
//       "utf8"
//     );
//     console.log("from read");

//     await fsPromises.writeFile(
//       path.join(__dirname, "test.txt"),
//       "Hello i have just wrote and editted the text",
//       "utf8"
//     );
//     console.log("from write");

//     await fsPromises.appendFile(
//       path.join(__dirname, "newtext.txt"),
//       "this is a new text file"
//     );

//     console.log("From append");
//     await fsPromises.rename(
//       path.join(__dirname, "newtext.txt"),
//       path.join("newer.txt")
//     );
//   } catch (error) {
//     console.log("error : ", error);
//   }
//   console.log("from rename");
// };

// fileOps();
console.log("....");

// let starterText =
//   "Hello bro hai kya tum aaj mujhe pata chala kiya ho baat ko bolna seeko";

// fs.writeFile(path.join(__dirname, "starter.txt"), starterText, (err) => {
//   if (err) throw err;
//   console.log("Write complete");

//   fs.appendFile(
//     path.join(__dirname, "starter.txt"),
//     "i have just started what about you brother",
//     (err) => {
//       if (err) throw err;
//       console.log("Append success");
//     }
//   );

//   fs.rename(
//     path.join(__dirname, "starter.txt"),
//     path.join(__dirname, "ender.txt"),
//     (err) => {
//       if (err) throw err;
//       console.log("successfully renamed");
//     }
//   );
// });

// console.log(path.parse(__filename));

// exit on uncaught error
// process.on(uncaughtException, (err) => {
//   console.error(`There was an uncaught error : ${err}`);
//   process.exit(1);
// });

//  DIR

if (!fs.existsSync("./new")) {
  fs.rmdir("./root", (err) => {
    console.log(err);
  });
}
