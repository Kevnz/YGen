exports.scaffold = {



    generateScaffold: function (options) {
        //generate app
        var appGenerator = require('./app');
        var modelGenerator = require('./models');
        var viewGenerator = require('./views');
        //do I need a collection and collection view?probably
        
        var appGenerator(options, function () {

        });
    }
};