'use strict';
var router = require('express').Router();
var User = require('mongoose').model('User');

router.get('/', function(req, res, next) {
  User.find({})
    .then(function(cats) {
      res.json(cats);
    })
    .catch(function(err) {
      res.json(err);
    }, next);
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id)
    .then(function(user) {
      res.json(user);
    })
    .catch(function(err) {
      res.send(404).send(err);
    }, next);
});


module.exports = router;