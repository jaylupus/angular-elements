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

// var nodeId;
// var edgeId;

var seedNodes = function() {
  return new Promise(function(fulfill, reject) {
      fs.readFile('./sample_data_sets/media-example-nodes.json', 'utf8', function(err, res) {
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


var seedEdges = function() {
  return new Promise(function(fulfill, reject) {
      fs.readFile('./sample_data_sets/media-example-edges.json', 'utf8', function(err, res) {
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

// var createManifest= function(nodeData,edgeData){
//   console.log(nodeData);
//   console.log(edgeData);

//   debugger;

//  let nodeId= nodeData._id;
//  let edgeId= edgeData._id;

//  let manifestPath=rootPath+ '/browser/directiveStore/d3-bostock-force/manifest.json';

//  let manifestString= `{
//     "ai_directive" : "true",
//     "ai_directive_type" : "content",
//     "ai_directive_name" : "bostock-force-example",
//     "ai_directive_attributes" : {
//         "ai_title": "Bostock Force-Directed Graph Example",
//         "ai_height" : "600",
//         "ai_width" : "600",
//         "node_width" : "5",
//         "charge":"-120",
//         "linkDistance":"30",
//         "ai_info_node_source":"${nodeId}",
//         "ai_info_edge_source":"${edgeId}"
//       }
//     },`

//  return fsp.writeFile(manifestPath, manifestString)
// }



connectToDb
  .then(function() {
    return Promise.all([seedNodes(),seedEdges()])
  })
  .spread(function(nodes,edges){
    console.log("node file is", nodes._id);
    console.log("edge file is", edges._id);
  })
  .then(function(res) {
    console.log(res);
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function(err) {
    console.error(err);
    process.kill(1);
  });