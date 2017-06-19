//this is where I define routes

'use strict';

//import stuff
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; // page table/model
var User = models.User; //user table/model


// set /wiki homepage
router.get('/', function(req, res, next) {
    Page.findAll()
        .then(function(pages) {
            var pageTitles = []
            for (var i = 0; i < pages.length; i++) {
                pageTitles.push(pages[i].dataValues.title)
            }
            res.render('index', { titles: pageTitles })

        })
        .catch(next)
})


// render the add page htm for /wiki/add

router.get('/add', function(req, res, next) {
    res.render('addpage');
    next();
});


// capture the field input when submitted

router.post('/', function(req, res, next) {
    User.findOrCreate({
            where: {
                name: req.body.authorName,
                email: req.body.authorEmail
            }
        })
        .then(function(values) {

            var user = values[0];

            var page = Page.build({
                title: req.body.title,
                content: req.body.content
            });

            return page.save().then(function(page) {
                return page.setAuthor(user);
            });

        })
        .then(function(page) {
            res.redirect(page.route);
        })
        .catch(next);
});

//route for getting specific wikipage

router.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
            where: {
                urlTitle: req.params.urlTitle
            },
            include: [
                { model: User, as: 'author' }
            ]
        })
        .then(function(page) {
            // page instance will have a .author property
            // as a filled in user object ({ name, email })
            if (page === null) {
                res.status(404).send();
            } else {
                console.log('page', page)
                res.render('wikipage', {
                    page: page
                });
            }
        })
        .catch(next);
    next();
})



//get wiki searchpage

router.get('/search', function(req, res) {
    res.render('search')
});



// export my routes
module.exports = router;