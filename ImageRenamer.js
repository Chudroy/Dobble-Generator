//Right now needs to be run individually, and then the sketch.

const { Console } = require('console');
const fs = require('fs');
const dir = 'images';
let fileArr = [];

// fileArr = fs.readdirSync(dir, (err, files) => {
//     return files;
// })

fs.readdir(dir, (err, files) => {
    for (let i = 0; i < files.length; i++) {
        fs.rename("images/" + files[i], "images/" + (i + 1).toString() + ".png", (err) => {
            console.log(err);
        })
    }
});

// for (let i = 0; i < fileArr.length; i++) {
//     console.log(fileArr[i])
// }

// console.log(fileArr.length);

