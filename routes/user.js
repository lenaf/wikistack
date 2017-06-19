'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; // page table/model
var User = models.User; //user table/model

module.exports = router

router.get('/', function(req, res, next) {
    User.findAll({})
        .then(function(users) {
            res.render('users', { users: users });
        }).catch(next);
});

router.get('/:userId', function(req, res, next) {

    var userPromise = User.findById(req.params.userId);
    var pagesPromise = Page.findAll({
        where: {
            authorId: req.params.userId
        }
    });

    Promise.all([
            userPromise,
            pagesPromise
        ])
        .then(function(values) {
            var user = values[0];
            var pages = values[1];
            console.log('user', user, 'pages', pages)
            res.render('user', { user: user, pages: pages });
        })
        .catch(next);

});

// router.post('/', function(req, res, next) {
//     res.send('got to POST /wiki/');
// });

// router.get('/add', function(req, res, next) {
//     res.send('got to GET /wiki/add');
// });