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


router.post('/:projId/:userId', function(req, res, next){
	console.log('made it here');
	var fstream;
	req.pipe(req.busboy);
	req.busboy.on('file', function(fieldname, file, filename){
		console.log('Uploading: ' + filename);
		//Path where image will be uploaded
    fstream = fs.createWriteStream(rootPath + '/files/' + filename);
    file.pipe(fstream);
    fstream.on('close', function () {    
        console.log("Upload Finished of " + filename);              
        // res.redirect('/');           //where to go next
        // fs.readFile(rootPath + '/files/' + filename, 'utf8', function(err, data){
        // 	if (err){
        // 		console.log(err);
        // 	}
        // 	var dataSource = {
        // 		fileName: filename,
        // 		dataType: 'linear',
        // 		data: data
        // 	}
        // 	DataSource.create(dataSource);
        // })

        fs.createReadStream(rootPath + '/files/' + filename).pipe(converter);

        converter.on('end_parsed', function(data) {
          console.log(data);
          var dataSource = {
            user: req.params.userId,
            project: req.params.projId,
            fileName: filename,
            dataType: 'linear',
            data: JSON.stringify(data)
          }
          DataSource.create(dataSource);    
        });

      });
	})
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