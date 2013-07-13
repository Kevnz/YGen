#!/usr/bin/env node

var program = require('commander');

var asciify = require('asciify'); 
console.log(process.argv)
    program
        .version('0.0.1')
        .option('-m, --model [name]', 'add model', 'model')
        .option('-t, --template [name]', 'specify a template to be created', 'template.html')
        .option('-v, --view', 'create a view')
        .parse(process.argv);

    
asciify('YGen',  function (err, ascii) {

	console.log(ascii.toString());
 	console.log(program.model);
});