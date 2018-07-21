const fs = require('fs')
const sass = require('sass')
const cleancss = require('clean-css')
const crass = require('crass')

// Make a META configuration using BDv2's config.json file
console.log('Reading configuration')
const { info: config } = require('./FluentDiscord/config.json')

const meta = {
  name: config.name,
  description: config.description,
  author: config.authors.map(author => author.name).join(', '),
  version: config.version.toString(),
  source: config.source
}

const builtmeta = `/*//META${JSON.stringify(meta)}*//**/\r\n`

// Build the theme file and minify it.
console.log('Building theme file')
const built = sass.renderSync({ file: './FluentDiscord/bdv1.scss' })
const remote = sass.renderSync({ file: './FluentDiscord/bdv1_remote.scss' })
const miniclean = new cleancss({ level: 2 }).minify(built.css)
const minicrass = crass.parse(built.css).optimize({ o1: true })

// Write to disk.
console.log('Writing to disk')
fs.writeFileSync('./bdv1/FluentDiscord.theme.css', builtmeta + built.css)
fs.writeFileSync('./bdv1/FluentDiscord.min.theme.css', builtmeta + miniclean.styles)
fs.writeFileSync('./bdv1/FluentDiscord.crass.theme.css', builtmeta + minicrass.toString())
fs.writeFileSync('./bdv1/FluentDiscord.remote.theme.css', builtmeta + remote.css)
