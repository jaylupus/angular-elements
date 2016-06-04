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

var wipeCollections = function() {
  var removeUsers = User.remove({});
  return Promise.all([
    removeUsers
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
  return User.find({ email: 'obama@gmail.com' })
    .then(function(obama) {
      return DataSource.findOne({ fileName: 'iris' })
        .then(function(iris) {
          return {
            name: 'Obama\s Iris',
            user: obama._id,
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
  .then(function() {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch(function(err) {
    console.error(err);
    process.kill(1);
  });