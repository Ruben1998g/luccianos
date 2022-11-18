var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

var minify = require("gulp-csso");
var rename = require("gulp-rename");


var imagemin = require("gulp-imagemin")
var webp = require("gulp-webp")

var del = require("del");

var browserSync = require("browser-sync").create();

const { src, dest } = require('gulp');
const pug = require('gulp-pug');

var htmlbeautify = require('gulp-html-beautify');

const webpack = require('webpack-stream');

const babel = require('gulp-babel');
var connect = require("gulp-connect");


gulp.task("browser-sync", function(done){
    browserSync.init({
        server:{
            baseDir:"./src"
        },
        notify:false
    });
    browserSync.watch("src/sass").on("change", browserSync.reload);
    browserSync.watch("src/*.html").on("change", browserSync.reload);
done()
});

gulp.task("sass", function(done){
    gulp.src('src/css/style.css')
    .pipe(plumber())
    .pipe(postcss([autoprefixer()]))
    .pipe(minify())
    .pipe(rename("style.css"))
    .pipe(gulp.dest("build/css"))
    done();
});


gulp.task('style', function(done){
    gulp.src('src/sass/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream:true}));
    done();
});

gulp.task('pugs', function(done){
    gulp.src('src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug({
      }))
    .pipe(htmlbeautify({

    }))
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({stream:true}));
    done();
});

gulp.task('js', function(done){
    gulp.src('src/js-modules/*.js')
    .pipe(plumber())
    .pipe(babel({
        presets: ['@babel/preset-env']
    })).pipe(
        webpack({
        })
      )
      .pipe(rename("script.js"))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream:true}));
    done();
});

gulp.task('fonts', function(done){
    gulp.src('src/fonts-modules/**.*')
      .pipe(gulp.dest('src/fonts'))
      .pipe(browserSync.reload({stream:true}));
    done();
});

gulp.task("watch", gulp.series('style', 'js','pugs', 'fonts', "browser-sync", function(done){
    gulp.watch("src/sass/**/*" , gulp.series("style"));
    gulp.watch("src/pug/**/*" , gulp.series("pugs"));
    gulp.watch("src/js-modules/**/*" , gulp.series("js"));
    gulp.watch("src/fonts-modules/**/*" , gulp.series("fonts"));

done()
}));

gulp.task("clean", function(){
    return del("build")
})



gulp.task("images", function(){
    return gulp.src("src/img/*{png,jpg,JPG}")

    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({progressive:true})
        ]))
    .pipe(gulp.dest("build/img"))
})

gulp.task("webp", function(){
    return gulp.src("build/img/*.{png,jpg}")
    .pipe(webp())
    .pipe(gulp.dest("build/img/webp"))
})

gulp.task("html", function(){
    return gulp.src("src/*.html")
    .pipe(gulp.dest("build"))
})

gulp.task("copy", function(){
    return gulp.src([
        "src/js/**/*"
    ]
    )
    .pipe(babel({
        presets: ["@babel/preset-env"]
    }))

    .pipe(gulp.dest("build/js"))
})


gulp.task("copy-fonts", function(){
    return gulp.src([
        "src/fonts/**/*.{woff,woff2}"
    ]
    )

    .pipe(gulp.dest("build/fonts"))
})

gulp.task("build", gulp.series(
    "clean",
    "sass",
    "images",
    "html",
    "copy",
    "copy-fonts"
    ));
