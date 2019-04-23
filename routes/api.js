const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const User = require('../models/User');

router.get('/pets', (req, res, next) => {
    console.log('hello from get route');
    Pet.find().then(response => {
        res.json(response);
    });
    res.render('index');
});

module.exports = router;
