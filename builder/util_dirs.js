const path = require('path')
const fs = require('fs')


exports.getFiles = p => fs.readdirSync(p).filter( f => !fs.statSync(path.join(p,f)).isDirectory())


exports.cleanDir = p => {
    const dir = fs.readdirSync(p)
    dir.forEach(f => {
        const p1 = path.join(p, f)
        const s = fs.statSync(p1)
        if (s.isDirectory()) {
            exports.cleaneDir(p1)
            fs.rmdirSync(p1)
        } else {
            fs.unlinkSync(p1)
        }
    })
}

