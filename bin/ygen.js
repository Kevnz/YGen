#!/usr/bin/env node

var program = require('commander');

var asciify = require('asciify');  

program
    .version('0.0.1')
    .option('-m, --model [name]', 'add model' )
    .option('-t, --template [name]', 'specify a template to be created')
    .option('-v, --view', 'create a view')
    .option('-a, --attrs', 'Add attributes')
    .parse(process.argv);


    
asciify('YGen',  function (err, ascii) {

	console.log(ascii.toString());
 	console.log(program.model);
 	if (program.model) {
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