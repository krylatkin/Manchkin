'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


var paths = {
    tsScripts: 'src/ts/**/*.ts',
    scripts: 'src/**/*.js',
    styles: './src/**/*.{css,scss}',
    images: 'src/img/**/*',
    index: 'src/index.html',
    dist: 'dist',
    testsHtml: 'src/test/**/*.html',
    testsJs: 'src/test/**/*.js',
    maps: '../maps'
    //maps: '.'
};

var pipes = {};

/* Compile and Minify SASS */
pipes.buildStyles = function(){
    return gulp.src(paths.styles)
        .pipe($.cached('styles'))
        .pipe($.debug({title: 'styles'}))
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.cssnano())
        .pipe($.remember('styles'))
        .pipe($.concat('main.css'))
        .pipe($.if(isDevelopment, $.sourcemaps.write(paths.maps)))
        .pipe(gulp.dest(paths.dist + '/css'));
};
gulp.task('sass', pipes.buildStyles);

/* Compile and Minify Typescript */
pipes.buildTypeScript = function(){
    //var tsProject = $.typescript.createProject("./tsconfig.json");
    return gulp.src(paths.tsScripts)
        .pipe($.cached('ts'))
        .pipe($.debug({title: 'ts'}))
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.typescript()).js
        .pipe($.if(isDevelopment, $.uglify()))
        .pipe($.remember('ts'))
        .pipe($.concat('bundle.js'))
        .pipe($.if(isDevelopment, $.sourcemaps.write(paths.maps)))
        .pipe(gulp.dest(paths.dist + "/js"));
};
gulp.task("ts", pipes.buildTypeScript);

/* Package Vendor JS */
pipes.buildVendorScripts = function(){
    return gulp.src(bowerFiles())
        //.pipe($.debug({title: 'src'}))
        .pipe($.filter('**/*.js'))
        .pipe($.cached('vendor:js'))
        .pipe($.order(['jquery.js', 'bootstrap.js', 'angular.js']))
        .pipe($.debug({title: 'vendor:js'}))
        //.on('data', function(file){console.log(file.relative);})
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.if(isDevelopment, $.uglify()))
        .pipe($.remember('vendor:js'))
        .pipe($.concat('vendor.js'))
        .pipe($.if(isDevelopment, $.sourcemaps.write(paths.maps)))
        .pipe(gulp.dest(paths.dist + '/vendor'));

};
gulp.task('vendor:js', pipes.buildVendorScripts);


/* Package Vendor CSS */
pipes.buildVendorStyles = function(){
    var bowerOptions = {
        overrides: {
            bootstrap: {
                main: [
                    './dist/css/bootstrap.min.css'
                ]
            }
        }
    };

    return gulp.src(bowerFiles(bowerOptions))
        .pipe($.filter('**/*.css'))
        .pipe($.cached('vendor:css'))
        .pipe($.order(['bootstrap.min.css']))
        .pipe($.debug({title: 'vendor:css'}))
        //.on('data', function(file){console.log(file.relative);})
        .pipe($.if(isDevelopment, $.sourcemaps.init()))
        .pipe($.if(isDevelopment, $.cssnano()))
        .pipe($.remember('vendor:css'))
        .pipe($.concat('vendor.css'))
        .pipe($.if(isDevelopment, $.sourcemaps.write(paths.maps)))
        .pipe(gulp.dest(paths.dist + '/vendor'));
};
gulp.task('vendor:css', pipes.buildVendorStyles);
gulp.task('vendor', ['vendor:js', 'vendor:css']);
// gulp.task('vendor', gulp.parallel('vendor:js', 'vendor:css')); // for Gulp 4.0



/* Build all JS and CSS and inject them into index.html */
pipes.buildIndex = function(){
    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.dist))
        //.pipe($.inject(pipes.buildVendorScripts(), {relative: true, name: 'bower'}))
        .pipe($.inject(pipes.buildVendorStyles(), {relative: true, name: 'bower'}))
        .pipe($.inject(pipes.buildTypeScript(), {relative: true}))
        .pipe($.inject(pipes.buildStyles(), {relative: true}))
        .pipe(gulp.dest(paths.dist));
};
gulp.task('index', pipes.buildIndex);

pipes.runTest = function(){
    return gulp.src('test/test.html')
        //.pipe($.mochaPhantomjs());
        .pipe(mochaPhantomJS());
};
gulp.task('test', pipes.runTest);


gulp.task('watch', ['index'], function(){
    var reload = browserSync.reload;

    browserSync({
        port: 8000,
        server: {
            baseDir: paths.dist
        }
    });

    gulp.watch(paths.tsScripts, function(){
        return pipes.buildTypeScript()
            .pipe(reload({stream: true}));
    });

    gulp.watch(paths.styles, function(){
        return pipes.buildStyles()
            .pipe(reload({stream: true}));
    });

    gulp.watch(paths.index, function(){
        return pipes.buildIndex()
            .pipe(reload({stream: true}));
    });

    gulp.watch('src/**/*.*', function(file){
        console.log(file);
    });

});

gulp.task('clean', function(){
    return del(paths.dist);
});

gulp.task('build', function(callback){
    isDevelopment = false;
    runSequence('clean', 'index', callback);
});