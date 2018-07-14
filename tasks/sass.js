const fs = require('fs')
const path = require('path')

const sass = require('node-sass')

const dir = 'css'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

fs.readdirSync('sass').forEach(file => {
  try {
    let filePath = path.join('sass', file)
    if (fs.lstatSync(filePath).isFile()) {
      const outFile = `css/${path.basename(filePath, '.scss')}.css`
      const sourceMap = `css/${path.basename(filePath, '.scss')}.css.map`
      const result = sass.renderSync({
        file: filePath,
        data: fs.readFileSync(filePath, 'utf-8'),
        outFile: outFile,
        includePaths: [
          'node_modules/normalize.css',
          'node_modules/compass-mixins/lib'
        ],
        outputStyle: 'compact',
        sourceMap: true
      })
      fs.writeFileSync(outFile, result.css)
      if (result.map) {
        fs.writeFileSync(sourceMap, result.map)
      }
      console.log(` create ${outFile}`)
    }
  } catch (e) {
    console.log('', e)
    throw e
  }
})
