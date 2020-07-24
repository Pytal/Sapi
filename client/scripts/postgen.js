const { promises: { readFile, writeFile } } = require('fs')
const { isMatch } = require('picomatch')

const currDir = process.cwd().replace(/\\/g, '/')
const files = process.argv.filter( file => isMatch( file, `${currDir}/src/**/*.ts` ))

;(async _ => {
  for (const file of files) {
    const content = await readFile( file, { encoding: 'utf-8' } )
    await writeFile( file, content.replace( /import \* as Operations from '';\n|;/g, '' ) )
  }
})()
