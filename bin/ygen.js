#!/usr/bin/env node

var program = require('commander');

var asciify = require('asciify');  

program
    .version('0.0.1')
    .option('-t, --template [name]', 'specify a template to be created')
    .option('-v, --view', 'create a view')
    .option('-a, --attrs', 'Add attributes')
    ;

program
    .command('generate [name]')
    .description('generate objects')
    .option('-m, --model [name] [fields]', 'add model' )
    .action(function(name, options){
        var t = [].slice.call(arguments, 0)
        console.log('gen');
        console.log(name);
        //console.log(options)
        console.log(arguments);
        console.log(arguments.length);
        for(var i = 0; i < arguments.length -1; i++) {
            console.log(typeof arguments[i]);
            if (typeof arguments[i] === 'string') {
                console.log(arguments[i]); 
            }
        }
    })




    

var generateModel = require('../lib/models').modelGenerator;
    
asciify('YGen',  function (err, ascii) {
    program.parse(process.argv);
	console.log(ascii.toString());
 	//console.log(program);
 	if (program.model) {
        console.log('gen model');
 		generateModel({ model:program.model, attributes:program.attrs}, function (err, obj) {
 			if (err) {
 				console.log('bugger');
 				console.error(err);
 			} else {
 				console.log('The model was generated');
 			}
 		});
 	}


 	 
});