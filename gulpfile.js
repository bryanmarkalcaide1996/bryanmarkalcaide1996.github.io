// The gulpfile is the compiler I used to compile my sass.

// keywords inside the curly brace are being destructured inside the gulp package so that I can invoke its methods without using the . notation.
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

//this function makes use of src and dest method to find the specified main scss and once changes are made.
//the compiled scss will be turned into regular css and the dest method will automatically generate a folder on a specified path containing the css file inside.
const buildStyles = () => {
  return src("./public/sass/styles.scss")
    .pipe(sass())
    .pipe(dest("./public/styles"));
};

// the watch method will keep watch for changes on the main scss file specified and will re-compile once changes are made and saved.
const watchTask = () => {
  watch(["styles.scss"], buildStyles);
};

exports.default = series(buildStyles, watchTask);
