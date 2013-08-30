exports.scaffold = {



    generateScaffold: function (options) {
        //generate app
        var appGenerator = require('./app');
        var modelGenerator = require('./models');
        var modelListGenerator = require('./model-list');
        var viewGenerator = require('./views');
        var listViewGenerator = require('./list-views');
        var templateGenerator = require('./template');
        
        appGenerator(options, function () {
        	modelGenerator(options, function () {
        		viewGenerator(options, function () {
        			modelListGenerator(options, function () {
        				listViewGenerator(options, function () {
        					templateGenerator(options, function () {
								console.log('The app, the view, the template, and the model have been generated');
        					});
        				});
        			});
        		});
        	});
        });
    }
};