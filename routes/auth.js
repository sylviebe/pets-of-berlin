const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Pet = require("../models/Pet");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/userPage",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {

  console.log(req.body)
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (username === "" || password === "") {

    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    });

    newUser.save()
      .then(user => {
        req.login(user, () => {
          res.redirect("/auth/userPage");
        })
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});


//********REDIRECT TO USER PAGE CODE***********/
const ensureLogin = require("connect-ensure-login");

router.get("/userPage", ensureLogin.ensureLoggedIn(), (req, res) => {
  let user = req.user._id
  console.log(user, "userid")
  User.findOne({ _id: user })
    .then(userInfo => {
      Pet.find({ owner: user })
        .then(pets => {
          console.log(pets)
          res.render("auth/userPage", { userInfo, pets });
        })

    })
    .catch(err => {
      res.redirect('/auth/login')
    })
});

//********END OF REDIRECT TO USER PAGE CODE***********/



//***********create the new-pet-page********** */
router.get("/new-pet", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/new-pet", { user: req.user });
});

router.post("/new-pet", (req, res) => {
  let owner = req.user._id
  console.log(req.body, "REQ BODY")
  const { name, colour, age, animalFamily, pic } = req.body
  const addressSplit = req.body.address.split(",")
  const location = {
    lat: req.body.lat,
    lng: req.body.lng,
    address: addressSplit[0],
    city: addressSplit[1]
  }
  Pet.create({ name, colour, age, animalFamily, location, owner })
    .then(() => {
      res.redirect("/auth/userPage")
    })
    .catch(err => {
      console.log("you have an error", err)
      res.redirect("/auth/new-pet")
    })
})
//************end of the new-pet-page*********** */

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
