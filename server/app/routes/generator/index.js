var router = require('express').Router();
var path = require('path');
var generator = require(path.join(__dirname, '../../../../generator'));

router.post('/js', function(req, res){
	generator.writeFactory(req.body.name)
	.then(function(factory){
		res.send(factory);
	});
});

router.post('/html', function(req, res){
	generator.writeTemplate(req.body.name)
	.then(function(index){
		res.send(index);
	});
});

module.exports = router;