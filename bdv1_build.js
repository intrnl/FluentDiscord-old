const fs = require('fs')
const sass = require('sass')
const cleancss = require('clean-css')

const meta = `/*//META${JSON.stringify(JSON.parse(fs.readFileSync('./FluentDiscord/_meta.json')))}*//**/\r\n`

console.log('Building theme file')
const built = sass.renderSync({ file: './FluentDiscord/bdv1.scss' })
const mini = new cleancss({ level: 2 }).minify(built.css)

console.log('Writing to disk')
fs.writeFileSync('./bdv1/FluentDiscord.theme.css', meta + built.css)
fs.writeFileSync('./bdv1/FluentDiscord.min.theme.css', meta + mini.styles)
