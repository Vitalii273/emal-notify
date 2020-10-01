const path = require('path'), fs = require('fs');
let dateFormat = require('dateformat');

let now = new Date();
today = dateFormat(now, "isoDate");
let filename ='';

// console.log(today);

function dateFinder (startPath, filter) {
    // console.log('Starting from dir ' + startPath + '/');
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    let files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
         filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            dateFinder(filename, filter); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            return filename
        };
    };
};

console.log(dateFinder('logs', `${today}`));

module.exports = filename;
