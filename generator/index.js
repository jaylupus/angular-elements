//Dependencies
var fs = require('fs');
var path = require('path');
var jade = require('jade');
var Promise = require('bluebird');
var _ = require('lodash');

//Helper functions
var readFile = Promise.promisify(require('fs').readFile);

var getDirectiveUrl = function(directiveName) {
  return path.join('directiveStore', directiveName, directiveName + '.html');
};

var getDirectivesFromConfig = function(config, directives) {
  var directives = directives || [];

  if (config.hasOwnProperty('ai_directive_name'))
    directives.push(config.ai_directive_name);

  for (var prop in config) {
    if (typeof config[prop] === 'object')
      getDirectivesFromConfig(config[prop], directives);
  }

  return directives;
};

var getFilteredDirectivesFromConfig = function(config) {
  return _.difference(getDirectivesFromConfig(config), ['ai_page', 'ai_col', 'ai_row']);
};

//Export functions
module.exports.writeTemplate = function(appConfig) {

  var directiveUrls = getFilteredDirectivesFromConfig(appConfig).map(getDirectiveUrl);

  return Promise.all(directiveUrls.map(url => readFile(path.join(__dirname, '../browser', url), 'utf8')))
    .then(function(directiveContents) {
      var directives = directiveUrls.map(function(elem, index) {
        return { url: elem, content: directiveContents[index] };
      });
      return jade.renderFile(path.join(__dirname, '/index.jade'), { directives: directives, project: appConfig.project_name });
    });
};

module.exports.writeApp = function(appConfig) {
  var controllerUrl;
  var directiveUrls = getDirectivesFromConfig(appConfig).map(getDirectiveUrl);
  var factoryUrl;
  return Promise.all(_.concat(controllerUrl, directiveUrls, factoryUrl).map(url => readFile(url, 'utf8')))
    .then(function(contents) {
      return contents.join('\n').replace('{{manifests}}', JSON.stringify(appConfig));
    });
};