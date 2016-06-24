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
        console.log("Upload Finished of " + filename); //cool;
        return new Promise(function(fulfill, reject) {
            fs1.readFile(rootPath+'/files/'+filename, 'utf8', function(err, res) {
              if (err) {
                console.log(err);
                reject(err);
              }
              else fulfill(res);
            });
          })
          .then(function(contents) {
            converter.fromString(contents, function(err,result){
                            //your code here

            var dataSource = {
              fileName: filename,
              data: JSON.stringify(result)
            };

            return DataSource.create(dataSource).then(function(dataObj){
              console.log(dataObj);
              res.send(dataObj);
            })
          });
          })

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