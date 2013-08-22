var heredoc = require('heredoc');
var Handlebars = require('handlebars');
var YUI = require('yui'); 
var Y = require('yui').use();
var modelTemplate = heredoc(function () {/*
YUI.add('{{paramCase}}', function (Y) {
    Y.namespace('data').{{pascalCase}} =  Y.Base.create('{{camelCase}}Model', Y.Model, [Y.ModelSync.REST], {
        //root: '/??',
        //idAttribute : '??',
        initializer: function () { 

        }
    }, {
        ATTRS: { {{#foreach attrs}}
            {{name}} : {
                value: '{{value}}'
            }{{#unless $last}},{{/unless}}{{/foreach }}
        }
    });
}, '0.0.1', {requires:['model', 'model-sync-rest']});
*/});
Handlebars.registerHelper("foreach",function(arr,options) {
    if(options.inverse && !arr.length)
        return options.inverse(this);

    return arr.map(function(item,index) {
        item.$index = index;
        item.$first = index === 0;
        item.$last  = index === arr.length-1;
        return options.fn(item);
    }).join('');
});

exports.modelGenerator = function (options, callback) {

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