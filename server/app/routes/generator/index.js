var router = require('express').Router();
var path = require('path');
var generator = require(path.join(__dirname, '../../../../generator'));

router.get('/js', function(req, res){
	generator.writeFactory(req.body)
	.then(function(factory){
		res.send(factory);
	});
});

router.get('/html', function(req, res){
	generator.writeTemplate(req.body)
	.then(function(index){
		res.send(index);
	});
});

module.exports = router;