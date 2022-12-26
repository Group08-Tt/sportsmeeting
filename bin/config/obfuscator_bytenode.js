var Options = require('obfuscator').Options;
var obfuscator = require('obfuscator').obfuscator;
var fs = require('fs');
var options = new Options([ '/path/to/file1.js', '/path/to/file2.js' ], '/path/to', 'file1.js', true);

// custom compression options
// see https://github.com/mishoo/UglifyJS2/#compressor-options
options.compressor = {
    conditionals: true,
    evaluate: true,
    booleans: true,
    loops: true,
    unused: false,
    hoist_funs: false
};

obfuscator(options, function (err, obfuscated) {
    if (err) {
        throw err;
    }
    fs.writeFile('./cool.js', obfuscated, function (err) {
        if (err) {
            throw err;
        }

        console.log('cool.');
    });
});var Options = require('obfuscator').Options;
var obfuscator = require('obfuscator').obfuscator;
var fs = require('fs');
var options = new Options([ '/path/to/file1.js', '/path/to/file2.js' ], '/path/to', 'file1.js', true);

// custom compression options
// see https://github.com/mishoo/UglifyJS2/#compressor-options
options.compressor = {
    conditionals: true,
    evaluate: true,
    booleans: true,
    loops: true,
    unused: false,
    hoist_funs: false
};

obfuscator(options, function (err, obfuscated) {
    if (err) {
        throw err;
    }
    fs.writeFile('./cool.js', obfuscated, function (err) {
        if (err) {
            throw err;
        }

        console.log('cool.');
    });
});

















