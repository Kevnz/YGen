
var parseGeneratorCommand = function (argsArray) {
 
  var env = argsArray.pop();
  parseOptions(env);
  if (argsArray.length) {
    env.fields = parseFields(argsArray);
  }
  return env;
};

function parseOptions(env) {

  return env;
}

function parseFields(fieldsString) {
  return fieldsString.map(function(pair, index, arr) {
    var split = pair.split(':');
    var isLast = index == arr.length - 1;
    return {
      name: split[0],
      type: split[1],
      // a little template <3 to add a comma or not
      comma: isLast ? '' : ','
    };
  });
}


module.exports = function() {
  //console.log(arguments)
  var env = parseGeneratorCommand([].slice.call(arguments, 0));
  console.log( env);
  if (!env.resourceName) {
    console.log("Please provide a resource name. See 'ember generate --help'");
  } else {
    for (var generator in generators) {
      if (env[generator]) {
        generators[generator](env.resourceName, env);
      }
    }
  }
};