/*jslint node: true */
'use strict';

// TODO: Move all watching/recompiling to the dev tasks. A build task should not have to worry about watching itself for updates, especially not if it's optional.
// TODO: Live Reload and potentially Live Reactload implementations
// TODO: Look into using JSX parser on browser for dev purposes
// TODO: Implement dev and prod environments, see envify
// TODO: Consider moving sass compilation to browserify for consistency and to take advantage of more potential transforms (e.g. envify)

// All subsequent files required by node with the extensions .es6, .es, .jsx and .js will be transformed by Babel. The polyfill is also automatically required.
// Necessary because we render our React app server side.
require('babel/register');

var SASS_FILES = './src/assets/sass/**/*.scss';
var SASS_BUNDLES = './src/assets/sass/*.bundle.scss';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var vinylPaths = require('vinyl-paths');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var del = require('del');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var uglifyify = require('uglifyify');

function rebundleScripts(bundler, bundleFiles) {
	var pipeline = bundler
		.bundle()
		.pipe(source(bundleFiles.srcFile))
		.pipe(rename(bundleFiles.destFile))
		.pipe(gulp.dest(bundleFiles.destDir));

	console.log('Built scripts successfully.');
	return pipeline;
}

// All tasks will be registered with gulp
var tasks = {};

tasks.buildScripts = function buildScripts(callback, recompile) {
	var bundleFiles = {
		srcFile: './src/components/Core/main.jsx',
		destDir:'./dist/js',
		destFile: 'app.js'
	};

	console.log('Beep Boop, preparing to build script bundle...');

	var bundler = browserify({
		basedir: __dirname,
		debug: true,
		entries: bundleFiles.srcFile,
		fullPaths: true,
		cache: {},
		packageCache: {},
	});

	if (recompile) {
		bundler = watchify(bundler);
	}

	bundler
		.on('error', function(err) {
			console.error('[Task Build Scripts Error]', err);
		})
		.on('update', function() {
			rebundleScripts(bundler, bundleFiles);
		})
		.transform(babelify) // JSX + ES6 compiling
		.transform({ // Minifies application code _and_ all browserify bundle code (with global: true)
			global: true
		}, 'uglifyify');
	return rebundleScripts(bundler, bundleFiles);
};

tasks.buildSass = function buildSass(callback, recompile) {
	var bundleFiles = {
		srcFiles: SASS_BUNDLES,
		destDir: './dist/css',
	};

	console.log('Boop Beep, preparing to build sass bundle...');
	
	var pipeline = gulp
		.src(bundleFiles.srcFiles)
		.pipe(cssGlobbing({ // Let's us use @import folder/* globs in scss
			extensions: ['.scss']
		}))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(bundleFiles.destDir));

	console.log('Built sass successfully.');

	// In order to avoid sass compilation errors involving the file not being accessible, we have to wait 1 second after the file's changed before rerunning this build step.
	if (recompile) {
		gulp.watch(SASS_FILES, {
			interval: 1000
		}, ['buildSass']);
	}

	return pipeline;
};

tasks.clean = function clean() {
	var pipeline = gulp
		.src('./dist', {read: false})
		.pipe(vinylPaths(del.sync));
	
	console.log('Cleaned dist directory.');
	return pipeline;
};

tasks.build = function build(callback, recompile) {
	tasks.clean();
	tasks.buildScripts(null, recompile);
	tasks.buildSass(null, recompile);
};

tasks.buildDev = function buildDev() {
	var recompile = true;
	tasks.build(null, recompile);
};

tasks.start = function start() {
	var server = require('./src/server.js')({
		port: 9001
	});
	server.start();
};

tasks.dev = function dev() {
	tasks.buildDev();
	tasks.start();
};

tasks.default = tasks.start;

// Register tasks with gulp
Object.keys(tasks).forEach(function(taskName) {
	var taskFunction = tasks[taskName];
	gulp.task(taskName, taskFunction);
});

module.exports = tasks;