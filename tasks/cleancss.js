const fs = require('fs')
const path = require('path')

const CleanCSS = require('clean-css')
const cleanCSS = new CleanCSS({})

fs.readdirSync('css').forEach(file => {
  try {
    let filePath = path.join('css', file)
    if (fs.lstatSync(filePath).isFile() && filePath.endsWith('.css')) {
      const input = fs.readFileSync(filePath, 'utf-8')
      const result = cleanCSS.minify(input)
      const output = `css/${path.basename(filePath, '.css')}.min.css`
      fs.writeFileSync(output, result.styles, 'utf-8')
      console.log(`  cleancss ${filePath}`)
    }
  } catch (e) {
    console.log('', e)
    throw e
  }
})
