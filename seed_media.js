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

var seedNodes_media = function() {
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


var seedEdges_media = function() {
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

var createManifest_media= function(nodeData,edgeData){
 let nodeId= nodeData._id;
 let edgeId= edgeData._id;

 let manifestPath=rootPath+ '/browser/directiveStore/d3-force-images/manifest.json';

 let manifestString= `{
    "ai_directive" : "true",
    "ai_directive_type" : "content",
    "ai_directive_name" : "d3-force-images",
    "ai_directive_attributes" : {
        "ai_title": "Force Network with Image Nodes",
        "ai_height" : "500",
        "ai_width" : "500",
        "bcolor": "#b3d1ff",
        "ai_info_node_source":"${nodeId}",
        "ai_info_edge_source":"${edgeId}"
      }
    },`

 return fsp.writeFile(manifestPath, manifestString)
}



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