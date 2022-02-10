const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const buildStyles = () => {
  return src("./public/sass/styles.scss")
    .pipe(sass())
    .pipe(dest("./public/styles"));
};

const watchTask = () => {
  watch(["styles.scss"], buildStyles);
};

exports.default = series(buildStyles, watchTask);
