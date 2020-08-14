const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//Bring in local files/modules/middleware
const connectDB = require("./db/connectDB");

//Bring in Route files
const auth = require("./routes/auth");
const watchlist = require("./routes/watchlist");

//Bring in models
const User = require("./models/User");

//config app
app.use(express.json());

// Configure passport middleware and session
app.use(session({ secret: "helloworld" }));
app.use(passport.initialize());
app.use(passport.session());

//Configure passport-local to use User model for authentication
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to database
connectDB();

//Declare PORT var
const PORT = process.env.PORT || 5000;

//Mount routes
app.use("/auth", auth);
app.use("/watchlist", watchlist);
app.listen(PORT, console.log("express server started"));
