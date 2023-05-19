// 测试
// function defaultTask(cb) {
//     // place code for your default task here
//     console.log("zt");
//     cb();
//   }
//   exports.default = defaultTask


// 任务
// const {
//     series,
//     parallel
// } = require('gulp');


// function js(cb){
//     console.log("js被执行");
//     cb();
// }
// function css(cb){
//     console.log("css被执行");
//     cb();
// }

// function html(cb){
//     console.log("html被执行");
//     cb();
// }
// exports.default=series(js,css,html);
// exports.default=parallel(js,css,html);


// function fn1(cb) {
//     console.log('fn1被调用');
//     cb();
// }

// function fn2(cb) {
//     console.log('fn2被调用');
//     cb();
// }
// exports.build = fn1;
// exports.default = series(fn1, fn2);


// 处理文件
const {
    src,
    dest
} = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename')

exports.default = function () {
    return src('src/js/*.js')
        .pipe(dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js'))
}


// 文件监控

const {
    watch
} = require('gulp');
watch('src/css/*.less', {
    delay:1000
}, function (cb) {
    console.log('文件被修改');
    cb();
})