#!/usr/bin/env node

var program = require('commander');

var asciify = require('asciify');  
var generate = require('../lib/generate');

/*()

var optimist = require('optimist')
    .usage('$0: This is an example on how to use optimist')
    .describe('h', 'Display the usage')
    .describe('m', 'generate a model')
    .alias('h', 'help')
    .alias('l', 'local');






program
    .version('0.0.1')
    .usage("[command] [options]\n\n  Command-Specific Help\n\n    ygen [command] --help");

program
  .command('generate')
  .description('generates application files')
  .usage("[options] [name]\n\n    [name]    the under_score name of your object\n    [fields]  field:type pairs, ex: 'name:string age:number broke:boolean'\n    [options] can be combined")
  .action(function() {
  	console.log(arguments);
    generate.apply(null, arguments);

  })
  .option('-p, --component [name]',         'generates a component')
  .option('-c, --controller [name]',        'generates a controller')
  .option('-l, --helper [name]',            'generates a handlebars helper')
  .option('-x, --mixin [name]',             'generates a mixin')
  .option('-m, --model [name] [fields]',    'generates a model with optional [fields]')
  .option('-r, --route [name]',             'generates a route')
  .option('-s, --scaffold [name] [fields]', 'scaffolds full CRUD for a model')
  .option('-t, --template [name]',          'generates a handlebars template')
  .option('-v, --view [name]',              'generates a view');
/*
program
    .command('generate')
    .description('generate objects')
    .option('-m, --model [name] [options]', 'add model' )
    .action(function(name, options){
        var t = [].slice.call(arguments, 0)
        console.log('gen');
        console.log(name);
        console.log(options)
        console.log(program);
        console.log(arguments.length);
        for(var i = 0; i < arguments.length -1; i++) {
            console.log(typeof arguments[i]);
            if (typeof arguments[i] === 'string') {
                console.log(arguments[i]); 
            }
        }
    })
*/

var generateModel = require('../lib/models').modelGenerator;

program
   .version('0.0.1')
   .option('-C, --chdir <path>', 'change the working directory')
   .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
   .option('-T, --no-tests', 'ignore test hook')

 program
   .command('setup')
   .description('run remote setup commands')
   .action(function(){
     console.log('setup');
   });

 program
   .command('generate')
   .description('run the given remote command')
   .usage("[options] [name]\n\n    [name]    the under_score name of your object\n    [fields]  field:type pairs, ex: 'name:string age:number broke:boolean'\n    [options] can be combined")
   .option('-m, --model [name] [fields]',    'generates a model with optional [fields]')
   .action(function(){
 		var attrs = [],
 			model;
    	var t = [].slice.call(arguments, 0)
        console.log('gen');
        console.log(t);
 
        console.log(arguments.length);
        for(var i = 0; i < t.length ; i++) {
            console.log(typeof t[i]);
            if (typeof t[i] === 'string') {
                 
                attrs.push({name:t[i].split(':')[0], value: t[i].split(':')[1]}); 
            }
            if(typeof t[i] === 'object') {
            	model = t[i].model;
            }
        }

        console.log('gen model');
 		generateModel({ model:model, attributes: attrs}, function (err, obj) {
 			if (err) {
 				console.log('bugger');
 				console.error(err);
 			} else {
 				console.log('The model was generated');
 			}
 		})
   });

 program
   .command('*')
   .description('deploy the given env')
   .action(function(env){
     console.log('deploying "%s"', env);
   });

program.parse(process.argv);


//program.parse(process.argv);    
asciify('YGen',  function (err, ascii) {





 
    //program.parse(process.argv);
	console.log(ascii.toString());
 	//console.log(program);


 	 
 	/*
 	if(argv._ === 'generate') {

 	}
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
 	*/


 	 
});