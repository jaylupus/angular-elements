'use strict';
var router = require('express').Router();
var DataSource = require('mongoose').model('DataSource');



router.get('/:id', function(req, res, next) {
  DataSource.findById(req.params.id)
    .then(function(data) {
      console.log(data);
      res.json(data);
    })
    .catch(function(err) {
      res.status(404).send(err);
    }, next);
});


module.exports = router;