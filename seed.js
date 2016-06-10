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

var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var DataSource = mongoose.model('DataSource');
var Project = mongoose.model('Project');

var projectConfig1=[// this is the app config
  {
    project_name : 'ourfirst app',
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
                                ai_directive_type : 'content',
                                ai_directive_name : 'title-subtitle',
                                ai_directive_page : '1',
                                ai_directive_row : '1',
                                ai_directive_col: '1',
                                ai_directive_attributes : {
                                    ai_title: 'Dumb Report',
                                    ai_subtitle:' A Report for Idiots',
                                    ai_class : 'myclass',
                                    ai_info_source : 'myclass',
                                    ai_info_type : 'file'
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
                                ai_directive_name : 'section-text',
                                ai_directive_page : '1',
                                ai_directive_row : '1',
                                ai_directive_col : '2',
                                ai_directive_attributes : {
                                    ai_title: 'The Deal',
                                    ai_class : 'myclass',
                                    ai_info_source : 'myclass',
                                    ai_info_type : 'file'
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
                                        ai_directive_name : 'pie-graph',
                                        ai_directive_page : '1',
                                        ai_directive_row : '2',
                                        ai_directive_col : '1',
                                        ai_directive_attributes : {
                                            ai_title: 'Color Pizza',
                                            ai_class : 'myclass',
                                            ai_info_source : 'myclass',
                                            ai_info_type : 'file'
                                        }
                              }
                      }
                 }
              }
            }
        }
    }
  }]// end projectConfig1


  var projectConfig2=[// this is the app config
  {
    project_name : 'our second app',
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
                                ai_directive_type : 'content',
                                ai_directive_name : 'title-subtitle',
                                ai_directive_page : '1',
                                ai_directive_row : '1',
                                ai_directive_col: '1',
                                ai_directive_attributes : {
                                    ai_title: 'Much Better Report',
                                    ai_subtitle:' A Report for Tiny Men',
                                    ai_class : 'myclass',
                                    ai_info_source : 'myclass',
                                    ai_info_type : 'file'
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
                                ai_directive_name : 'justatable',
                                ai_directive_page : '1',
                                ai_directive_row : '1',
                                ai_directive_col : '2',
                                ai_directive_attributes : {
                                    ai_title: 'some folks',
                                    ai_class : 'myclass',
                                    ai_info_source : 'myclass',
                                    ai_info_type : 'file'
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
                                        ai_directive_name : 'pie-graph',
                                        ai_directive_page : '1',
                                        ai_directive_row : '2',
                                        ai_directive_col : '1',
                                        ai_directive_attributes : {
                                            ai_title: 'Frizbee?',
                                            ai_class : 'myclass',
                                            ai_info_source : 'myclass',
                                            ai_info_type : 'file'
                                        }
                              }
                      }
                 }
              }
            }
        }
    }
  }]// end projectConfig2

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


var seedDataSource = function() {
  return new Promise(function(fulfill, reject) {
      fs.readFile('./iris.json', 'utf8', function(err, res) {
        if (err) reject(err);
        else fulfill(res);
      });
    })
    .then(function(err, contents) {
      var dataSource = {
        fileName: 'iris',
        dataType: 'linear',
        data: contents
      };
      return DataSource.create(dataSource);
    });
};

var seedProject = function() {
  return User.findOne({ email: 'obama@gmail.com' })
    .then(function(obama) {
      return DataSource.findOne({ fileName: 'iris' })
        //obama
        .then(function(iris) {

          return {
            name: 'Obama\s Iris',
            user: obama._id,
            config:projectConfig1,
            dataSource: iris._id
          };
        });
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
            config:projectConfig2,
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
          console.log(obama)
          debugger;
          return {
            name: 'Obama Secret Project',
            user: obama._id,
            config:projectConfig2,
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
  .then(function() {
    return seedDataSource();
  })
  .then(function() {
    return seedProject();
  })
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
