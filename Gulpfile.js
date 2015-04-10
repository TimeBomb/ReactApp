var Path = require('path');
var gulp = require('gulp');
var source = require("vinyl-source-stream");
var rename = require('gulp-rename');
var browserify = require('browserify');
var es6ify = require('es6ify');
var reactFile = './node_modules/react/react.js';
var _reactify = require('reactify');
var reactify = function(filename, options) {
	var options = options || {};
	options.harmony = true;

	return _reactify(filename, options);
};

es6ify.traceurOverrides = {experimental: true};

// All tasks will be registered with gulp
var tasks = {};

// All helpers are methods used by tasks
var helpers = {};

tasks.buildScripts = function buildScripts() {
	var files = [
		{
			src: './assets/app/js/main.jsx',
			dest:'./assets/bundle',
			destFile: 'app.js'
		}
	];

	files.forEach(function(file) {
	  	browserify(file.src)
	  		.require(reactFile)
	  		.transform(reactify)
	  		.transform(es6ify.configure(/.jsx/))
	  		.bundle()
	  		.on('error', function(err) { console.error('[Task Build Scripts Error]', err); })
	  		.pipe(source(file.src))
	  		.pipe(rename(file.destFile))
	  	  	.pipe(gulp.dest(file.dest));
	  });
};

tasks.default = tasks.buildScripts;

// Register tasks with gulp
Object.keys(tasks).forEach(function(taskName) {
	var taskFunction = tasks[taskName];
	gulp.task(taskName, taskFunction);
})