"use strict";

var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var DataSource = mongoose.model('DataSource');
var Project = mongoose.model('Project');
var fsp = require('fs-promise');
var rootPathArray = __dirname.split("server/app/routes/data");
var rootPath=rootPathArray[0]

var seedDataSource = function() {
  return new Promise(function(fulfill, reject) {
      fs.readFile('./sample_data_sets/small_fam_tree.json', 'utf8', function(err, res) {
        if (err) {
          console.log(err);
          reject(err);
        }
        else fulfill(res);
      });
    })
    .then(function(contents) {
      var dataSource = {
        fileName: 'roster',
        dataType: 'linear',
        data: contents
      };
      return DataSource.create(dataSource);
    });
};

var createManifest= function(dataRecord){
 console.log(dataRecord);
 let fileId= dataRecord._id;
 console.log(rootPath);
 console.log(fileId);
 debugger;
 let manifestPath=rootPath+ '/browser/directiveStore/d3-force-basic/manifest.json';

 let manifestString= `{
    "ai_directive" : "true",
    "ai_directive_type" : "content",
    "ai_directive_name" : "force_basic",
    "ai_directive_attributes" : {
        "ai_title": "Basic Force Graph",
        "ai_height" : "400",
        "ai_width" : "400",
        "node_width" : "5",
        "ai_info_source":"${fileId}"
    }
},`

 return fsp.writeFile(manifestPath, manifestString)

}



connectToDb
  .then(seedDataSource)
  .then(createManifest)
  .then(function(res) {
    console.log(res);
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function(err) {
    console.error(err);
    process.kill(1);
  });