#!/usr/bin/env node

var program = require('commander');

var asciify = require('asciify');

 

 

var generateModel = require('../lib/models').modelGenerator;
var generateApp = require('../lib/app').appGenerator;
program
     .version('0.0.1');

program
.command('create')
.description('creates app')
.usage("[options] [name]\n\n    [name]    the under_score name of your app")
.action(function (appname) {
    generateApp({name: appname}, function() {

        console.log('dnone')
    } );
});

program
    .command('generate')
    .description('generate items based on input')
    .usage("[options] [name]\n\n    [name]    the under_score name of your object\n    [fields]  field:type pairs, ex: 'name:string age:number broke:boolean'\n    [options] can be combined")
    .option('-m, --model [name] [fields]',    'generates a model with optional [fields]')
    .option('-v, --view [name]',    'generates a view')
    .action(function(){
        var attrs = [],
            model, 
            view;
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

                return;
                generateModel({ model:model, attributes: attrs}, function (err, obj) {
                    if (err) {
                        console.log('bugger');
                        console.error(err);
                    } else {
                        console.log('The model was generated');
                    }
                });
     });

   
asciify('YGen',  function (err, ascii) {
    console.log(ascii.toString());
    program.parse(process.argv);
    //console.log(program);


     
});