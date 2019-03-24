const path = require('path')
const fs = require('fs')
require('colors')
const jsonFormat = require('json-format');
const { getFiles, cleanDir } = require('./util_dirs')



const checkDir = (from, to) => {
    let stat, dir;
    stat = fs.statSync(from)
    if (!stat.isDirectory()) throw new Error(`path: ${from} is not directory`)
    dir = getFiles(from)
    if (dir.length == 0) console.log(`path: ${from} is empty`.red)

    try {
        stat = fs.statSync(to)
        if (!stat.isDirectory()) throw new Error(`path: ${to} is not directory`)
        cleanDir(to)
    } catch(e) {
        if (!e.code || e.code != 'ENOENT') console.error(`${e.message}`.red)
        fs.mkdirSync(to)
    }

    return dir;
}

module.exports = (from, to) => {
    const contracts = checkDir(from, to)
    contracts.forEach(con => {
        const { abi, contractName } = require(path.join(from, con))
        fs.writeFileSync(
            path.join(to, `${contractName}.json`),
            jsonFormat(abi)
        )
    })
    console.log('contracts successfully copied'.green)
}