const { watch } = require("gulp");
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const eslint = require("gulp-eslint");

const cleancss = require("gulp-clean-css");

const jsBuild = function () {
  return gulp
    .src("./*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("output/"))
    .pipe(reload({ stream: true }));
};
jsBuild.displayName = "js:build";

const cssBuild = function () {
  console.log("running cssbuild");
  return gulp
    .src("./*.css")
    .pipe(sourcemaps.init())
    .pipe(cleancss())
    .pipe(concat("all.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("output/"))
    .pipe(reload({ stream: true }));
};
cssBuild.displayName = "css:build";

function watchFiles() {
  watch("./script.js", copy);
}

function copy() {
  console.log("copy has been run");
  return gulp
    .src("./script.js", { sourcemaps: true })
    .pipe(uglify())
    .pipe(gulp.dest("output/", { sourcemaps: "." }));
}
function webserver() {
  browserSync.init({
    server: {
      baseDir: "./",
      proxy: "beqarioni.com",
    },
  });
}

// watcher
exports.watch = watchFiles;

// js build (js:build) as displayName
exports.jsBuild = jsBuild;

// css build (css:build) as displayName
exports.cssBuild = cssBuild;

// webserver
exports.webserver = webserver;

// eslint
exports.eslint = function () {
  return gulp
    .src("./*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};
