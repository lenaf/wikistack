//this is where I define routes

'use strict';

//import stuff
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; // page table/model
var User = models.User; //user table/model

// in case we go to /wiki, redirect to /

router.get('/', function(req, res, next) {
    res.redirect('/');
    next();
});

// render the add page htm for /wiki/add

router.get('/add', function(req, res, next) {
    res.render('addpage');
    next();
});

// capture the field input when submitted

router.post('/', function(req, res, next) {
    var page = Page.build({
        title: req.body.title,
        content: req.body.content
    });
    page.save()
        .then(function(savedPage) {
            res.redirect(savedPage.route);
        }).catch(next);
});

//route for getting specific wikipage

router.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
            where: {
                urlTitle: req.params.urlTitle
            }
        })
        .then(function(page) {
            console.log('page', page)
            res.render('wikipage', page.dataValues);
        })
        .catch(next);
})

// export my routes
module.exports = router;