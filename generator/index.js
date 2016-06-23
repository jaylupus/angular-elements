var fs = require('fs');
var path = require('path');
var jade = require('jade');
var Promise = require('bluebird');
var Project = require('mongoose').model('Project');
var _ = require('lodash');

var readFile = Promise.promisify(require("fs").readFile);

var getDirectiveUrl = function(directiveName) {
  return path.join('directiveStore', directiveName, directiveName + '.html');
};

module.exports.writeFactory = function(manifestObj) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.join(__dirname, '/factory.js'), 'utf8', function(err, factoryJS) {
      if (err)
        reject(err);
      else
        resolve(factoryJS.replace('{{manifests}}', JSON.stringify(manifestObj)));
    });
  });
};

module.exports.writeTemplate = function(directiveNames) {
  var directiveUrls = directiveNames.map(getDirectiveUrl);

  return Promise.all(directiveUrls.map(url => readFile(path.join(__dirname, '../browser', url), 'utf8')))
    .then(function(directiveContents) {
      var directives = directiveUrls.map(function(elem, index) {
        return { url: elem, content: directiveContents[index] };
      });
      return jade.renderFile(path.join(__dirname, '/index.jade'), { directives: directives });
    });
};

// module.exports.writeApp = function(appConfig) {
//   var controllerUrl;
//   var directiveUrls;
//   var factoryUrl;
//   return Promise.all(_.concat(controllerUrl, directiveUrls, factoryUrl).map(url => readFile(url, 'utf8')))
//   .then(function(contents){
//     return contents.join('\n').replace('{{manifests}}', JSON.stringify(appConfig));
//   });
// };