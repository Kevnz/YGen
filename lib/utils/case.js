var changeCase = require('change-case');
exports.getCases = function (name) {
    var paramCase = changeCase.paramCase(name);
    var camelCase = changeCase.camelCase(name);
    var pascalCase = changeCase.pascalCase(name);
    return { paramCase: paramCase, camelCase: camelCase, pascalCase: pascalCase };
}