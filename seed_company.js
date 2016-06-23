/*

Loads flare data for circle pack example;
*/

var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var DataSource = mongoose.model('DataSource');
var Project = mongoose.model('Project');


var seedDataSource_company = function() {
  return new Promise(function(fulfill, reject) {
      fs.readFile('./sample_data_sets/companies.json', 'utf8', function(err, res) {
        if (err) {
          console.log(err);
          reject(err);
        }
        else fulfill(res);
      });
    })
    .then(function(contents) {
      var dataSource = {
        fileName: 'iris',
        dataType: 'linear',
        data: contents
      };
      return DataSource.create(dataSource);
    });
};

var createManifest_company= function(dataRecord){
 console.log(dataRecord);
 let fileId= dataRecord._id;
 console.log(rootPath);
 console.log(fileId);
 debugger;
 let manifestPath=rootPath+ '/browser/directiveStore/nvd3-bar-chart/manifest.json';

 let manifestString= `{
    "ai_directive" : "true",
    "ai_directive_type" : "content",
    "ai_directive_name" : "nvd3-bar-chart",
    "ai_directive_preview":"./directiveStore/nvd3-bar-chart/preview.png",
    "ai_directive_desc":"NVD3 Discrete Bar Chart",
    "ai_directive_attributes" : {
        "ai_title": "Corporate Profits",
        "ai_height" : "500",
        "ai_width" : "600",
        "key":"Profits",
        "label":"Ticker",
        "yvalue":"2014",
        "ai_info_source":"${fileId}"
      }
    },`

 return fsp.writeFile(manifestPath, manifestString)
}

connectToDb
  .then(seedDataSource)
  .then(function(res) {
    console.log(res)
    console.log('file id is:',res._id);
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function(err) {
    console.error(err);
    process.kill(1);
  });
