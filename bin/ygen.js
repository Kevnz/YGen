#!/usr/bin/env node

var program = require('commander');

var asciify = require('asciify');

 

 

var generateModel = require('../lib/models').modelGenerator;
var generateView = require('../lib/views').viewGenerator;
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
    .option('-s, --scaffold [name] [fields]', 'generates a full CRUD setup for a model')
    .action(function(){
        var attrs = [],
            model,
            view,
            scaffold,
            isModel,
            isScaffold,
            isView;
            var t = [].slice.call(arguments, 0);
            console.log('gen');
            console.log(t);

            console.log(arguments.length);
            for(var i = 0; i < t.length ; i++) {
                    console.log(typeof t[i]);
                    if (typeof t[i] === 'string') {
                             
                            attrs.push({name:t[i].split(':')[0], value: t[i].split(':')[1]}); 
                    }
                    if(typeof t[i] === 'object') {
                        isModel = t[i].model,
                        isView = t[i].view,
                        isScaffold = t[i].scaffold,
                        model = t[i].model,
                        view = t[i].view
                        scaffold = t[i].scaffold;
                    }
            }
            if (isScaffold) {
                isModified = true;
                isView = true;
                model = view = scaffold;
                generateApp({name: scaffold}, function() { 
                if (isModel) {
                    generateModel({ model:model, attributes: attrs}, function (err, obj) {
                        if (err) {
                            console.log('bugger');
                            console.error(err);
                        } else {
                            console.log('The model was generated');
                        }
                    });
                }
                if (isView) {
                    generateView({ view:view, attributes: attrs}, function (err, obj) {
                        if (err) {
                            console.log('bugger');
                            console.error(err);
                        } else {
                            console.log('The model was generated');
                        }
                    });
                }
                    });
                }

            if ( !isScaffold && isModel) {
                generateModel({ model:model, attributes: attrs}, function (err, obj) {
                    if (err) {
                        console.log('bugger');
                        console.error(err);
                    } else {
                        console.log('The model was generated');
                    }
                });
            }
            if (!isScaffold && isView) {
                generateView({ view:view, attributes: attrs}, function (err, obj) {
                    if (err) {
                        console.log('bugger');
                        console.error(err);
                    } else {
                        console.log('The model was generated');
                    }
                });
            }
     });

   
asciify('YGen',  function (err, ascii) {
    console.log(ascii.toString());
    program.parse(process.argv);
    //console.log(program);


     
});