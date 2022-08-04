const { watch, src, dest, series } = require("gulp"),
  stylus = require("gulp-stylus"),
  jsImport = require("gulp-js-import"),
  minify = require("gulp-minify"),
  autoprefixer = require("autoprefixer"),
  concat = require("gulp-concat"),
  postcss = require('gulp-postcss'),
  browserSync = require('browser-sync').create();

const paths = {
  CSS: 'src/styl'
};

function stylusTask() {
  return src("src/styl/**/*.styl")
    .pipe(
      stylus({
        compress: true,
        linenos: false,
        import: __dirname + "/src/styl/settings.styl"
      })
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(concat("app.min.css"))
    .pipe(dest("public/css"))
}

function jsTask() {
  return src("src/js/**/*.js", { sourcemaps: false })
    .pipe(jsImport({ hideConsole: true }))
    .pipe(concat("app.js"))
    .pipe(
      minify({
        ext: {
          src: ".js",
          min: ".min.js"
        },
        exclude: ["tasks"],
        ignoreFiles: [".combo.js", "-min.js"]
      })
    )
    .pipe(dest("public/js", { sourcemaps: false }))
}

function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: 'public'
    }
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}
// Watch Task
function watchTask() {
  watch('public/index.html', browserSyncReload);
  watch(['src/**/*.styl', 'src/**/*.js'], series(stylusTask, jsTask, browserSyncReload));
}

exports.init = series(stylusTask, jsTask)

// Default Gulp task
exports.default = series(
  stylusTask,
  jsTask,
  browserSyncServe,
  watchTask
);
