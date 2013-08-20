var sys = require("util"),
    fs = require('fs'),
    os = require('os'),
    mkdirp = require('mkdirp'),
    eol = 'win32' == os.platform() ? '\r\n' : '\n',
    write = function (path, str) {
        fs.writeFileSync(path, str);
    },
    mkdir = function (path, fn) {
        mkdirp(path, 0755, function (err) {
            if (err) throw err;
            if(fn) fn();
        });
    };

module.exports =  {
    write: write,
    mkdir: mkdir
}