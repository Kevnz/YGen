var heredoc = require('heredoc');
var Handlebars = require('handlebars');
var YUI = require('yui'); 
var Y = require('yui').use();
var viewTemplate = heredoc(function () {/*
YUI.add('{{paramCase}}-view', function (Y) {
    var {{pascalCase}}View = Y.Base.create('{{camelCase}}View', Y.View, [], {
        event
        
    });
    Y.{{pascalCase}}View = {{pascalCase}}View;
},
'0.0.1', {
    requires: ['item-view', 'handlebars', 'node-base', 'event-base']
});
*/});

exports.collectionViewGenerator = function (options, callback) {

    var viewName = options.view;
    var changeCase = require('change-case');

    var cases = require('./utils/case').getCases(viewName);
    var source = viewTemplate;
    var template = Handlebars.compile(source);

    var data = Y.mix(  cases, { attrs: options.attributes});

    var source = viewTemplate;s
    var template = Handlebars.compile(source);
 
    var result = template(data);
    console.log(result);
    var fs = require('./utils/file');
    fs.mkdir('views');
    fs.write('views/' + viewName + '.js', result);
    callback(null, {});
}