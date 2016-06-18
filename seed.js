/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/
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

var sampleConfig=[
    {project_name : 'ourfirst app',
    pages:{
        page_1:{
          ai_directive : true,
          ai_directive_type : 'layout',
          ai_directive_name : 'ai_page',
          ai_directive_page : '1',
          ai_directive_row : '',
          ai_directive_col : '',
          ai_directive_attributes : {
              ai_class : '/css/row_a/style.css',
              ai_page_title:'',
              ai_page_menu_text :''
          },
          rows:{
              row_1:{
                  ai_directive : true,
                  ai_directive_type : 'layout',
                  ai_directive_name : 'ai_row',
                  ai_directive_page : '1',
                  ai_directive_row : '1',
                  ai_directive_col : '',
                  ai_directive_attributes : {
                      ai_class : '/css/row_a/style.css',
                      class : 'row',
                  },
                  cols:{
                      col_1:{
                          ai_directive : true,
                          ai_directive_type : 'layout',
                          ai_directive_name : 'ai_col',
                          ai_directive_page : '1',
                          ai_directive_row : '1',
                          ai_directive_col: '1',
                          ai_directive_attributes : {
                              ai_class : '/css/row_a/style.css',
                              class : 'col-md-6'
                          },
                          ai_content: {
                                ai_directive : true,
                                ai_directive_type : "content",
                                ai_directive_name : "force_basic",
                                ai_directive_page : '1',
                                ai_directive_row : '1',
                                ai_directive_col : '1',
                                ai_directive_attributes : {
                                    ai_title: "Basic Force Data",
                                    ai_height : "400",
                                    ai_width : "400",
                                    node_width : "5",
                                    ai_info_type:"file",
                                    ai_info_source:"hello"
                                  }
                        }
                    },col_2:{
                          ai_directive : true,
                          ai_directive_type : 'layout',
                          ai_directive_name : 'ai_col',
                          ai_directive_page : '1',
                          ai_directive_row : '1',
                          ai_directive_col: '2',
                          ai_directive_attributes : {
                              ai_class : 'myclass',
                              class : 'col-md-6'
                          },
                          ai_content: {
                                ai_directive : true,
                                ai_directive_type : 'content',
                                ai_directive_name : 'section_text',
                                ai_directive_page : '1',
                                ai_directive_row : '1',
                                ai_directive_col : '2',
                                ai_directive_attributes : {
                                    ai_title: 'Some info',
                                    solo_table_class : 'myclass',
                                    solo_table_info_source : 'myclass',
                                    solo_table_info_type : 'file'
                                }
                        }
                    }
                }
              },
              row_2:{
                   ai_directive : true,
                    ai_directive_type : 'layout',
                    ai_directive_name : 'ai_row',
                    ai_directive_page : '1',
                    ai_directive_row : '2',
                    ai_directive_col : '',
                    ai_directive_attributes : {
                        ai_class : '/css/row_a/style.css',
                        class : 'row',
                    },
                   cols:{
                         col_1:{
                                ai_directive : true,
                                ai_directive_type : 'layout',
                                ai_directive_name : 'ai_col',
                                ai_directive_page : '1',
                                ai_directive_row : '2',
                                ai_directive_col: '1',
                                ai_directive_attributes : {
                                    ai_class : '/css/row_a/style.css',
                                    class : 'col-md-6'
                                },
                                ai_content: {
                                          ai_directive : true,
                                          ai_directive_type : 'content',
                                          ai_directive_name : 'solo_table',
                                          ai_directive_page : '1',
                                          ai_directive_row : '2',
                                          ai_directive_col : '1',
                                          ai_directive_attributes : {
                                              solo_table_title: 'Solo table',
                                              solo_table_class : 'myclass',
                                              solo_table_info_source : 'myclass',
                                              solo_table_info_type : 'file'
                                          }
                                }
                        }
                   }
              }
            }
        }
    }

}];


var wipeCollections = function() {
  var removeUsers = User.remove({});
  var removeProjects = Project.remove({});
  return Promise.all([
    removeUsers,
    removeProjects
  ]);
};

var seedUsers = function() {

  var users = [{
    email: 'testing@fsa.com',
    password: 'password'
  }, {
    email: 'obama@gmail.com',
    password: 'potus'
  }];

  return User.create(users);

};

var seedSmallFamTree = function() {
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
      return DataSource.create(dataSource)
    });
};

var createForceManifest= function(dataRecord){
 console.log(dataRecord);
 let fileId= dataRecord._id;
 // going to also seed config object!
 sampleConfig[0].pages.page_1.rows.row_1.cols.col_1.ai_content.ai_directive_attributes.ai_info_source=fileId;
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

var paragraphData="Chambray iPhone bushwick, irony gastropub keffiyeh semiotics. Bushwick 90's cray, brooklyn helvetica cold-pressed retro cardigan cronut iPhone fanny pack. Fashion axe narwhal asymmetrical, selvage tacos celiac poutine meggings blue bottle authentic selfies shoreditch. Irony green juice fingerstache flexitarian, pork belly brooklyn locavore pabst mustache seitan.";

var seedparagraphData = function() {

      var dataSource = {
        fileName: 'hipster',
        dataType: 'text',
        data: paragraphData
      }
      return DataSource.create(dataSource)
      // .then(function(data){
      //   console.log(data);
      //   debugger;
      //   return data
      // })
};


var seedDataSource = function() {
  return new Promise(function(fulfill, reject) {
      fs.readFile('./iris.json', 'utf8', function(err, res) {
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

var seedProject = function(data1,data2) {
  console.log(data1._id);
  console.log(data2._id);
  console.log(sampleConfig[0].pages.page_1)
  sampleConfig[0].pages.page_1.rows.row_1.cols.col_2.ai_content.ai_directive_attributes.ai_info_source=data2._id;
  console.log(sampleConfig[0].pages.page_1.rows.row_1.cols.col_2.ai_content.ai_directive_attributes.ai_info_source);
  debugger;

  return User.findOne({ email: 'obama@gmail.com' })
    .then(function(obama) {

          return {
            name: 'Obama\s Iris',
            user: obama._id,
            config:sampleConfig,
            dataSource: [data1._id,data2._id]
          };

    })
    .then(function(project) {
      return Project.create(project);
    });
};

var seedProject2 = function() {
  return User.findOne({ email: 'testing@fsa.com' })
    .then(function(tester) {
      return DataSource.findOne({ fileName: 'iris' })
        //obama
        .then(function(iris) {

          return {
            name: 'tester Iris',
            user: tester._id,
            config:sampleConfig,
            dataSource: iris._id
          };
        });
    })
    .then(function(project) {
      return Project.create(project);
    });
};

var seedProject3 = function() {
  return User.findOne({ email: 'obama@gmail.com' })
    .then(function(obama) {
      return DataSource.findOne({ fileName: 'iris' })
        //obama
        .then(function(iris) {

          return {
            name: 'Obama Secret Project',
            user: obama._id,
            config:sampleConfig,
            dataSource: iris._id
          };
        });
    })
    .then(function(project) {
      return Project.create(project);
    });
};

connectToDb
  .then(function() {
    return wipeCollections();
  })
  .then(function() {
    return seedUsers();
  })
  .then(seedSmallFamTree)
  .then(createForceManifest)
  .then(function() {
    return Promise.all([seedDataSource(),seedparagraphData()])
  })
  .spread(seedProject)
  .then(seedProject2)
  .then(seedProject3)
  .then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function(err) {
    console.error(err);
    process.kill(1);
  });
