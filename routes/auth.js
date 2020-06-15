const express = require("express");
const router = express.Router();
const passport = require("passport");

//Bring in Models
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");

//Bring in middleware
const protected = require("../middleware/auth/protectedRoute");

//Get user route
// public access
router.get("/user", (req, res, next) => {
  res.json({ user: req.user });
});

//Register route
//  Public Access
router.post("/register", async (req, res) => {
  console.log("registering user");
  await User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err) => {
      if (err) {
        console.log("error while user register!", err);
        res.json({ success: false });
        return next(err);
      }
    }
  );

  console.log("user registered");
  res.json({ success: true });
});

//Login Route
//  Public Access
router.post("/login", passport.authenticate("local"), (req, res) => {
  if (req.user) {
    res.json({ success: true, user: req.user });
    console.log("user logged in");
  } else {
    res.json({ success: false });
  }
});

//Logout Route
//  Private access
router.get("/logout", (req, res) => {
  req.logout();
  res.json({ success: true });
});

module.exports = router;
