'use strict';

var router = require('express').Router();
var DataSource = require('mongoose').model('DataSource');
var Busboy = require('connect-busboy');
var fs = require('fs-extra')
//var rootPath = __dirname.slice(0, 34);
var rootPathStr = __dirname.split('server/app/routes/data');
var rootPath = rootPathStr[0];
var Converter = require('csvtojson').Converter;
var converter = new Converter({});
var fs1 = require('fs');
var fsp = require('fs-promise');


router.post('/:projId/:userId', function(req, res, next){
	// var fstream;
	// req.pipe(req.busboy);
 //  console.log('Entering post route...');
	// req.busboy.on('file', function(fieldname, file, filename){
	// 	console.log('Uploading: ' + filename);
		//Path where image will be uploaded
    // fstream = fs.createWriteStream(rootPath + '/files/' + filename);
    // file.pipe(fstream);
    // fstream.on('close', function () {
    //   console.log(filename + ' uploaded to files directory'); //cool;
    //   return new Promise(function(fulfill, reject) {
    //       fs1.readFile(rootPath+'/files/'+filename, 'utf8', function(err, res) {
    //         if (err) {
    //           console.log(err);
    //           reject(err);
    //         }
    //         else fulfill(res);
    //       });
    //     })
    //     .then(function(contents) {
    //       console.log('contents are ' + contents);
    //       converter.fromString(contents, function(err,result){
    //                       //your code here
    //       console.log('result is ' + result);
    //       var dataSource = {
    //         user: req.params.userId,
    //         project: req.params.projId,
    //         fileName: filename,
    //         data: JSON.stringify(result)
    //       };

    //       return DataSource.create(dataSource).then(function(dataObj){
    //         console.log('dataOb is ' + dataObj);
    //         res.status('201').end();
    //       });
    //     });
    //   })
    // });

    // fstream = fs.createWriteStream(rootPath + '/files/' + filename);
    // file.pipe(fstream);
    // fstream.on('close', function(){
    //   console.log(filename + ' uploaded to files directory');
      // fs1.readFile(rootPath + 'files/' + filename, 'utf8', function(err, data){
      //   if (err) console.log(err);
      //   converter.fromString(data, function(err,result){
      //     if (err) console.log(err);
      //     console.log('result is ' + result);
      //     var _dataSource = {
      //       user: req.params.userId,
      //       project: req.params.projId,
      //       fileName: filename,
      //       data: JSON.stringify(result)
      //     };
      //     DataSource.create(_dataSource)
      //     .then(function(dataObj){
      //       console.log(dataObj);
      //       res.status('201');
      //     })
      //   });
      // });
          
    //   });
    // });
  //});
  console.log('Entering POST route');
  console.log('req.files is');
  console.log(req.files);
  console.log(req.files.file.name);
  var filePathName = rootPath + 'files/' + req.files.file.name;
  var filename = req.files.file.name;
  console.log('filePathName is ' + filePathName);
  
  fsp.writeFile(filePathName, req.files.file.data)
  .then(function(){
    console.log('hello');
    return fsp.readFile(filePathName, {encoding: 'utf8'})
  }).then(function(data){
    console.log('data is ' + data);
    var _dataSource = {
      user: req.params.userId,
      project: req.params.projId,
      fileName: filename,
      data: JSON.stringify(data)
    };

    return DataSource.create(_dataSource)
    .then(function(dataObj){
      console.log('dataObj is ' + dataObj);
      res.send(dataObj);
    })
 });
});


router.get('/:id', function(req, res, next) {
  DataSource.findById(req.params.id)
    .then(function(data) {
      //console.log(data);
      res.json(data);
    })
    .catch(function(err) {
      res.status(404).send(err);
    }, next);
});


module.exports = router;