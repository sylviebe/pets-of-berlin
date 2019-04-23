const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const User = require('../models/User');
/*const Place = require('../models/place.js')*/

/* GET home page */
router.get('/', (req, res, next) => {
    console.log('hello from get route');
    res.render('index');
});

/*For Petprofil location !!MUSS ANGEPASST WERDEN!! 

const Place = require('../models/place.js');

router.get('/add-places', (req, res, next) => {
    res.render('add-places');
});

router.post('/add-places', (req, res, next) => {
    const newPlace = new Place({
        name: req.body.name,
        place: req.body.place,
        location: {
            coordinates: [req.body.longitude, req.body.latitude]
        }
    });

    newPlace
        .save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
});*/

module.exports = router;
