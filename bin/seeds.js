// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Pet = require('../models/Pet');

const bcryptSalt = 10;

mongoose
    .connect('mongodb://localhost/guinea-pig-match-app', { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });

let users = [
    {
        username: 'alice',
        password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt))
    },
    {
        username: 'bob',
        password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt))
    }
];

let pets = [
    {
        name: 'Karla',
        color: 'Black',
        age: 5,
        animalFamily: 'Guinea Pig',
        owner: '5cbf04011b6c4ab9e0b1792a',
        avatarUrl: 'images/default-avatar.png',
        location: {
            lat: 52,
            lng: 13,
            address: 'Thorstrasse 20',
            city: 'Berlin'
        },
        countryCode: 'DE'
    },
    {
        name: 'Ian Curtis',
        color: 'Red',
        age: 4,
        animalFamily: 'Guinea Pig',
        owner: '5cbf04011b6c4ab9e0b1792a',
        avatarUrl: 'images/default-avatar.png',
        location: {
            lat: 11,
            lng: 13,
            address: 'Thorstrasse 30',
            city: 'Berlin'
        },
        countryCode: 'DE'
    },
    {
        name: 'Curtis',
        color: 'blue',
        age: 4,
        animalFamily: 'Guinea Pig',
        owner: '5cbf04011b6c4ab9e0b1792a',
        avatarUrl: 'images/default-avatar.png',
        location: {
            lat: 41,
            lng: 13,
            address: 'Thorstrasse 40',
            city: 'Berlin'
        },
        countryCode: 'DE'
    }
];
// Deleting all the users
User.deleteMany()
    .then(() => {
        return User.create(users);
    })
    .then(() => {
        return Pet.create(pets);
    })
    .then(usersCreated => {
        console.log(`${usersCreated.length} users created with the following id:`);
        console.log(usersCreated.map(u => u._id));
    })
    .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect();
    })
    .catch(err => {
        mongoose.disconnect();
        throw err;
    });
