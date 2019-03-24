const fse = require('fs-extra')

module.exports = path => {

    fse.emptyDir(path, (e, r) => {
        if (e) console.error(e);
        console.log('Dir cleaned!')
    })
}
