var heredoc = require('heredoc');
var Handlebars = require('handlebars');
var modelTemplate = heredoc(function () {/*
YUI.add('{{paramCase}}', function (Y) {
	Y.namespace('data').{{pascalCase}} =  Y.Base.create('{{paramCase}}Model', Y.Model, [Y.ModelSync.REST], {
		//root: '/??',
		//idAttribute : '??',
		initializer: function () { 

		}
	}, {
		ATTRS: { {{#foreach attrs}}
 			{{name}} : {
				value: {{value}}
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
	var changeCase = require('change-case');

	var paramCase = changeCase.paramCase(modelName);
	var camelCase = changeCase.camelCase(modelName);
	var pascalCase = changeCase.pascalCase(modelName);
	//var attrs = options.attributes.split(',');
	console.log(options);

	var source = modelTemplate;
	var template = Handlebars.compile(source);

	var data = { paramCase: paramCase, pascalCase: pascalCase, attrs: options.attributes};
	var result = template(data);
	console.log(result);
	var fs = require('./utils/file');
	console.log(fs);
	fs.mkdir('models');
	fs.write('models/' + modelName + '.js', result);
	callback(null, {});
}