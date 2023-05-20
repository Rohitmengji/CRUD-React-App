// const { format } = require("date-fns");
// const { v4: uuid } = require("uuid");

// console.log(format(new Date(), "yyyy:MM:dd\tHH:mm:ss"));

// console.log(uuid());

// console.log("hello");

// let hello = "hello rohit";

const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
//   console.log(req.url, req.method);
//   res.statusCode = 200;
//   res.setHeader("Content-type", "text/html");
//   paths = path.join(__dirname, "views", "index.html");
//   fs.readFile(paths, "utf-8", (err, data) => {
//     res.end(data);
//   });
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end("<h1>Hello World</h1>");
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
