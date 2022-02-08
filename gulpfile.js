const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const buildStyles = () => {
  return src("./sass/styles.scss").pipe(sass()).pipe(dest("styles"));
};

const watchTask = () => {
  watch(["styles.scss"], buildStyles);
};

exports.default = series(buildStyles, watchTask);
