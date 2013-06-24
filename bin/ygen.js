#!/usr/bin/env node

var program = require('commander');

program
    .version('0.0.1')
    .option('-m, --model [name]', 'add model')
    .option('-t, --template <engine>', 'specify template engine (jade|ejs) [jade]', 'jade')
    .option('-v, --view', 'specify stylesheet engine (stylus|sass|less) [css]', 'css')
    .parse(process.argv);

console.log(program.model)
