var through = require('through2');
var juice = require('juice');
var gutil = require('gulp-util');
var path = require('path');
var PluginError = gutil.PluginError;
var File = gutil.File;
var util = require('util');

function externalCSSToInline(contents) {
	return util.format("<style>%s</style>", contents);
}

function injectCSS(html, css) {
	return html.replace('<!-- juice.inject -->', css);
}

const PLUGIN_NAME = 'gulp-plugin-concat';

function gulpJuiceStream(conf) {
	conf = conf || {};
	// Creating a stream through which each file will pass

	var css = [],
		htmlFiles = [];

    var stream = function (file, enc, cb) {
	    if (file.isNull()) {
        	this.push(file); // Do nothing if no contents
	    	return cb();
	    }

	    if (file.isStream()) {
	    	return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
	    }

    	if (path.extname(file.path) === '.html') {
	    	htmlFiles.push(file);
	    } else if (path.extname(file.path) === '.css') {
	    	css.push(externalCSSToInline(file.contents.toString()));
	    } else {
	    	return cb(null, file);
	    }

    	return cb();


	};

	var endStream = function (cb) {
		var allCSS = css.join('');
		if (htmlFiles.length > 0) {
			for (var x in htmlFiles) {
				var file = htmlFiles[x];
				var contents = file.contents.toString();
				contents = injectCSS(contents, css);
				contents = juice(contents, conf);
				file.contents = new Buffer(contents);

				this.push(file);
			}
		}
		cb();
	};

	// returning the file stream
	return through.obj(stream, endStream);
}

module.exports = gulpJuiceStream;