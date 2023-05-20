const fs = require("fs");

const rs = fs.createReadStream('./lorem.txt', { encoding: 'utf8' });

const ws = fs.createWriteStream('./older.txt',);

rs.pipe(ws)