//this is my routes index

'use strict';
var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');

module.exports = router;

router.use('/wiki', wikiRouter);
//router.use('/users', userRouter);

router.use('/users', userRouter);
//router.use('/users', userRouter);