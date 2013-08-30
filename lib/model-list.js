var heredoc = require('heredoc');
var Handlebars = require('handlebars');
var YUI = require('yui'); 
var Y = require('yui').use();
var modelTemplate = heredoc(function () {/*
YUI.add('{{paramCase}}-list', function (Y) {
    Y.namespace('data').{{pascalCase}}List =  Y.Base.create('{{camelCase}}ModelList', Y.ModelList, [Y.ModelSync.REST], {
        //root: '/??',
        //idAttribute : '??',
        model: Y.data.{{pascalCase}}
        initializer: function () { 

        }
    }, {
        ATTRS: { {{#foreach attrs}}
            {{name}} : {
                value: '{{value}}'
            }{{#unless $last}},{{/unless}}{{/foreach }}
        }
    });
}, '0.0.1', {requires:['model-list', 'model-sync-rest']});
*/});
 

exports.modelListGenerator = function (options, callback) {

    var modelName = options.model;
    var cases = require('./utils/case').getCases(modelName);
    var source = modelTemplate;
    var template = Handlebars.compile(source);

    var data = Y.mix(  cases, { attrs: options.attributes});
    var result = template(data);
    console.log(result);
    var fs = require('./utils/file');
    fs.mkdir('models');
    fs.write('models/' + modelName + '.js', result);
    callback(null, true);
}