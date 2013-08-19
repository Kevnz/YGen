/*
YUI.add({{paramCase}}, function (Y) {
	Y.namespace('data').User =  Y.Base.create('userModel', Y.Model, [Y.ModelSync.REST], {
		root: '/users',
		//idAttribute : '??',
		initializer: function () {
			Y.log('initializer of user');
			this.weighIns = new Y.data.WeighInList();

		}
	}, {
		ATTRS: {
		{{#attrs}}
 			{{name}} : {
				value: {{value}}
			}
		{{/attrs}}
		}
	});
}, '0.0.1', {requires:['model', 'model-sync-rest']});
*/
exports.modelGenerator = function (options, callback) {

	var modelName = options.model;
	var changeCase = require('change-case');

	var paramCase = changeCase.paramCase(modelName);
	var camelCase = changeCase.camelCase(modelName);
	var pascalCase = changeCase.pascalCase(modelName);
	var attrs = options.attributes.split(',');






}