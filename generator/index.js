//Dependencies
var fs = require('fs');
var path = require('path');
var jade = require('jade');
var Promise = require('bluebird');
var _ = require('lodash');

//Helper functions
var readFile = Promise.promisify(require('fs').readFile);

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

var getDirectivePath = function(directiveName) {
  return path.join('directiveStore', directiveName, directiveName);
};

var getDirectiveHtmlPath = function(directiveName) {
  return getDirectivePath(directiveName) + '.html';
};

var getDirectiveJsPath = function(directiveName) {
  return path.join(__dirname, '../browser', getDirectivePath(directiveName) + '.js');
};

var getFilteredDirectivesFromConfig = function(config) {
  return _.difference(getDirectivesFromConfig(config), ['ai_page', 'ai_col', 'ai_row']);
};

var writeTemplate = function(project) {
  var appConfig = project.config[0];

  var directivePaths = getFilteredDirectivesFromConfig(appConfig).map(getDirectiveHtmlPath);

  return Promise.all(directivePaths.map(directivePath => readFile(path.join(__dirname, '../browser', directivePath), 'utf8')))
    .then(function(directiveContents) {
      var directives = directivePaths.map(function(elem, index) {
        return { id: elem, content: directiveContents[index] };
      });
      return jade.renderFile(path.join(__dirname, '/index.jade'), { directives: directives, project: appConfig.project_name });
    });
};

var writeApp = function(project) {
  
  var appConfig = project.config[0];
  var data = JSON.stringify(project.dataSource[0].data);

  var controllerPath = path.join(__dirname, '/controller.js');
  var appPath = path.join(__dirname, '/app.js');
  var factoryPath = path.join(__dirname, '/factory.js');
  var dataFactoryPath = path.join(__dirname, '/data_factory.js');


  var directivePaths = getFilteredDirectivesFromConfig(appConfig).map(getDirectiveJsPath);

  return Promise.all(_.concat(appPath, controllerPath, directivePaths, factoryPath, dataFactoryPath).map(filePath => readFile(filePath, 'utf8')))
    .then(function(contents) {
      return contents.join('\n').replace('{{project}}', JSON.stringify(appConfig)).replace('{{data}}', data);
    });
};

module.exports = {
  writeApp: writeApp,
  writeTemplate: writeTemplate
};