'use strict';

var router = require('express').Router();
var DataSource = require('mongoose').model('DataSource');
var Busboy = require('connect-busboy');
var fs = require('fs-extra')
var rootPath = __dirname.slice(0, 34);


router.post('/', function(req, res, next){
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
        fs.readFile(rootPath + '/files/' + filename, 'utf8', function(err, data){
        	if (err){
        		console.log(err);
        	}
        	var dataSource = {
        		fileName: filename,
        		dataType: 'linear',
        		data: data
        	}
        	DataSource.create(dataSource);
        })
    });
	})
	

});

module.exports = router;