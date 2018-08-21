let pump = require('pump')
let gulp = require('gulp')

let rename = require('gulp-rename')
let sass = require('gulp-sass')
let prefix = require('gulp-autoprefixer')
let cssnano = require('gulp-cssnano')
let sourcemap = require('gulp-sourcemaps')
let { prepend } = require('gulp-inject-string')


let { info: config } = require('./FluentDiscord/config.json')

let meta = {
  name: config.name,
  description: config.description,
  author: config.authors.map(author => author.name).join(', '),
  version: config.version.toString(),
  source: config.source
}

let builtmeta = `/*//META${JSON.stringify(meta)}*//**/\r\n`


gulp.task('build', function () {
  return pump([
    gulp.src('FluentDiscord/bdv1.scss'),
    sourcemap.init(),
    sass().on('error', sass.logError),
    prefix(),
    prepend(builtmeta),
    rename(`${config.name}.theme.css`),
    sourcemap.write('.'),
    gulp.dest('bdv1')
  ])
})

gulp.task('watch', function () {
  gulp.watch('FluentDiscord/**/*.scss', ['build'])
})
