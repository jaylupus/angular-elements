var fs = require('fs');
var path = require('path');

module.exports.writeTemplate = function(directiveName) {
  var directiveUrl =  path.join('directiveStore', directiveName, directiveName + '.html');

  return new Promise(function(resolve, reject) {
      fs.readFile(path.join(__dirname, '../browser', directiveUrl), 'utf8', function(err, directiveHTML) {
        if (err)
          reject(err);
        else
          resolve(directiveHTML);
      })
    })
    .then(function(directiveHTML) {
      return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname, '/template.html'), 'utf8', function(err, templateHTML) {
          if (err)
            reject(err);
          else
            resolve(templateHTML.replace('{{directiveURL}}', directiveUrl).replace('{{directiveHTML}}', directiveHTML));
        })
      })
    });
};

module.exports.writeFactory = function(manifestObj) {
  return new Promise(function(resolve, reject){
    fs.readFile(path.join(__dirname, '/factory.js'), 'utf8', function(err, factoryJS){
      if (err)
        reject(err);
      else
        resolve(factoryJS.replace('{{manifests}}', JSON.stringify(manifestObj)));
    });
  });
};