var Path = require('path');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var rename = require('gulp-rename');
var browserify = require('browserify');
var watchify = require('watchify');
var es6ify = require('es6ify');
var reactFile = './node_modules/react/react.js';
var reactify = require('reactify');
es6ify.traceurOverrides = {experimental: true};

function rebundleScripts(bundler, bundleFiles) {
	bundler
		.on('error', function(err) { console.error('[Task Build Scripts Error]', err); })
		.on('update', function() { rebundleScripts(bundler, bundleFiles); })
		.transform(reactify, {harmony: true}) // JSX -> JS
		.transform(es6ify.configure(/.jsx/)) // ES6 -> ES5
		.bundle() // Bundle() before we pipe anything
		.pipe(source(bundleFiles.srcFile)) // Take source app file
		.pipe(rename(bundleFiles.destFile)) // Set the bundle name
	  	.pipe(gulp.dest(bundleFiles.destDir)); // Output bundle file to destination folder
}

// All tasks will be registered with gulp
var tasks = {};

// TODO: Looks like recompile may need to wrap the .on('update') listener as well
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
  	rebundleScripts(bundler, bundleFiles);
};

tasks.build = function build(recompile) {
	// TODO: SASS Compiling & Bundling
	// TODO: Live reload (React - LiveReactload & SASS - LiveReload)
	tasks.buildScripts(recompile);
};

// TODO: Watchify keeps crapping out and stopping randomly. Is it due to errors? There are no console messages. S.O.S.
tasks.buildAndWatch = function buildAndWatch() {
	var recompile = true;
	tasks.build(recompile);
};

tasks.start = function start() {
	var serverOptions = {
		port: 8080
	};
	var server = require('./server.js')(serverOptions);
	server.start();
};

tasks.dev = function dev() {
	var recompile = true;
	tasks.build(recompile);
	tasks.start();
};

tasks.default = tasks.start;

// Register tasks with gulp
Object.keys(tasks).forEach(function(taskName) {
	var taskFunction = tasks[taskName];
	gulp.task(taskName, taskFunction);
})