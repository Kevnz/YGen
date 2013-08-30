var heredoc = require('heredoc');
var Handlebars = require('handlebars');
var YUI = require('yui'); 
var Y = require('yui').use();
var viewTemplate = heredoc(function () {/*
YUI.add('{{paramCase}}list-view', function (Y) {

    Y.{{pascalCase}}ListView = Y.Base.create('{{paramCase}}listView', Y.CollectionView, [], {
        initializer: function () {

        },
        destroy: function() {

        },
        events: {

        },
        onRender: function () {

        }
    });

},
'0.0.1', {
    requires: ['{{pascalCase}}-list', 'collection-view']
});
*/});

exports.listViewGenerator = function (options, callback) {

    var viewName = options.view;
    var changeCase = require('change-case');

    var cases = require('./utils/case').getCases(viewName);
    var source = viewTemplate;
    var template = Handlebars.compile(source);

    var data = Y.mix(  cases, { attrs: options.attributes});

    var source = viewTemplate;
    var template = Handlebars.compile(source);
 
    var result = template(data);
    console.log(result);
    var fs = require('./utils/file');
    fs.mkdir('views');
    fs.write('views/' + viewName + '.js', result);
    callback(null, {});
}