var heredoc = require('heredoc');
var Handlebars = require('handlebars');
var appTemplate = heredoc(function () {/*
YUI.add('{{paramCase}}', function (Y) {
	Y.{{pascalCase}} = Y.Base.create('{{paramCase}}App', Y.App, [], {
        views: {
            home: {
                type: 'view',
                preserve: true
            }
        },
        showDefault: function (req, res, next) {
		
			//this.showView('home', { });
        },
		initializer: function () { 
            this.route('/{{paramCase}}', 'show{{paramCase}}');
		},
        addApp: function (appName, app) {
            this[appName] = new app();
        } 
	}, {
		ATTRS: {             
			routes: {
                value: [
                    { path: '/', callbacks: 'showDefault' }
                ]
            }
		}
	});
}, '0.0.1', {requires:['app', 'app-transitions']});
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

exports.appGenerator = function (options, callback) {

	var appName = options.name;
	var changeCase = require('change-case');

	var paramCase = changeCase.paramCase(appName);
	var camelCase = changeCase.camelCase(appName);
	var pascalCase = changeCase.pascalCase(appName);
	//var attrs = options.attributes.split(',');
	console.log(options);

	var source = appTemplate;
	var template = Handlebars.compile(source);

	var data = { paramCase: paramCase, pascalCase: pascalCase, attrs: options.attributes};
	var result = template(data);
	console.log(result);
	var fs = require('./utils/file');
	fs.mkdir('app');
	fs.mkdir('app/models');
	fs.mkdir('app/views');
	fs.write('app/'+ appName + '.js', result);
	callback(null, {});
}