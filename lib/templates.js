var heredoc = require('heredoc');
var Handlebars = require('handlebars');
var YUI = require('yui'); 
var Y = require('yui').use();
var templateLoaderTemplate = heredoc(function () {/*
YUI.add('{{paramCase}}-template', function (Y) { 

    Y.namespace('templates').{{pascalCase}}Template = Y.TemplateLoader('/js/apps/{{name}}/templates/{{paramCase}}-template.handlebars'); 
}, '0.0.1', {
    requires:['template-loader','handlebars']

});
*/});

var templateFileTemplate = heredoc(function () {/*
    <{{tag}}>
        {{#foreach attrs}}
        <label>{{name}} </label>

                value: '{{value}}'
            }{{#unless $last}},{{/unless}}{{/foreach }}
    </{{tag}}>
*/});

Handlebars.registerHelper("foreach", function(arr,options) {
    if(options.inverse && !arr.length)
        return options.inverse(this);

    return arr.map(function(item,index) {
        item.$index = index;
        item.$first = index === 0;
        item.$last  = index === arr.length-1;
        return options.fn(item);
    }).join('');
});
Handlebars.registerHelper("inputType", function(name, value) {
    var inputType ='text';
    if (value === 'string') {
        inputType = 'text';
    } else if (value==='date') {
        inputType='date';
    }
    return '<input type="text" id="' + name + '">';

});
exports.viewGenerator = function (options, callback) {

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
    fs.mkdir('templates');
    fs.write('views/' + viewName + '.js', result);
    callback(null, {});
}