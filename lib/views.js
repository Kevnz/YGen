var heredoc = require('heredoc');
var Handlebars = require('handlebars');
var YUI = require('yui'); 
var Y = require('yui').use();
var viewTemplate = heredoc(function () {/*
YUI.add('{{paramCase}}-view', function (Y) {
    var {{pascalCase}}View = Y.Base.create('{{camelCase}}View', Y.View, [], {
        initializer: function (config) {        
            this.publish('render', {
                broadcast: true,
                bubbles: true,
                emitFacade: true
            });
            //this.get('model').after(['load', 'change', 'reset'], this.render, this);
            {{pascalCase}}View.superclass.constructor.apply(this, arguments);
        },
        render: function () {
            {{pascalCase}}View.superclass.render.apply(this, arguments);
            var container = this.get('container'); 
            var model = this.get('model') ? this.get('model').toJSON() : {};
            var source = Y.one(this.template).getHTML(),
                compiledTemplate = Y.Handlebars.compile(source),
                html = compiledTemplate(model);

            container.setHTML(html);

            if (!container.inDoc()) {
                Y.one('body').append(container);
            }
            this.fire('render');
            this.onRender();
            return this;
        }
    });
    Y.{{pascalCase}}View = {{pascalCase}}View;
},
'0.0.1', {
    requires: ['item-view', 'handlebars', 'node-base', 'event-base']
});
*/});

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
    fs.mkdir('views');
    fs.write('views/' + viewName + '.js', result);
    callback(null, {});
}