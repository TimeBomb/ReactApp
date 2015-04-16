/*jslint node: true */
'use strict';

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var babelify = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
// var es6ify = require('es6ify');
// var reactify = require('reactify');
// es6ify.traceurOverrides = {experimental: true};

function rebundleScripts(bundler, bundleFiles) {
	bundler
		.bundle() // Bundle() before we pipe anything
		.pipe(source(bundleFiles.srcFile)) // Take source app file
		.pipe(rename(bundleFiles.destFile)) // Set the bundle name
	  	.pipe(gulp.dest(bundleFiles.destDir)); // Output bundle file to destination folder
}

// All tasks will be registered with gulp
var tasks = {};

// TODO: When recompile is false, this should be exiting when it finishes building. Why isn't it?
tasks.buildScripts = function buildScripts(recompile) {
	var bundleFiles = {
		srcFile: './assets/app/js/main.jsx',
		destDir:'./assets/bundle',
		destFile: 'app.js'
	};

	console.log('Beep Boop, preparing to build script bundles...');

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
		.on('error', function(err) { console.error('[Task Build Scripts Error]', err); })
		.on('update', function() { rebundleScripts(bundler, bundleFiles); })
		.transform(babelify); // JSX + ES6 compiling
  	rebundleScripts(bundler, bundleFiles);
};

tasks.build = function build(recompile) {
	// TODO: SASS Compiling & Bundling
	// TODO: Live reload (React - LiveReactload & SASS - LiveReload)
	tasks.buildScripts(recompile);
};

// TODO: WTF Watchify, or something, causes app.js to be recompiled without removing the old one, leading to 15MB+ app.js bundle file ?!?!?!
// TODO: Watchify keeps crapping out and stopping randomly. Is it due to errors? Memory usage issues? Windows (probably)? There are no console messages. S.O.S.
tasks.buildAndWatch = function buildAndWatch() {
	var recompile = true;
	tasks.build(recompile);
};

tasks.start = function start() {
	var server = require('./server.js')({
		port: 9001
	});
	server.start();
};

tasks.dev = function dev() {
	tasks.buildAndWatch();
	tasks.start();
};

tasks.default = tasks.start;

// Register tasks with gulp
Object.keys(tasks).forEach(function(taskName) {
	var taskFunction = tasks[taskName];
	gulp.task(taskName, taskFunction);
});