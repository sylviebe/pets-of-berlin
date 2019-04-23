const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

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
  const username = req.body.username;
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
      password: hashPass
    });

    newUser.save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});


//********REDIRECT TO USER PAGE CODE***********/
const ensureLogin = require("connect-ensure-login");

router.get("/userPage", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/userPage", { user: req.user });
});

//********END OF REDIRECT TO USER PAGE CODE***********/



//***********create the new-pet-page********** */
router.get("/new-pet", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/new-pet", { user: req.user });
});

//************end of the new-pet-page*********** */

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
