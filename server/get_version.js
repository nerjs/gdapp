const exec = require('child_process').exec;


let lastCommit = '';


exec('git log --pretty=format:\"%H\" -1', (err, stdout, stderr) => {
    if (err) return console.error(err)
    if (stderr) return console.error(stderr)
    lastCommit = stdout
});


module.exports = () => lastCommit
