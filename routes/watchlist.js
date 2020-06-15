const express = require("express");
const router = express.Router();

//Bring in models
const Watchlist = require("../models/Watchlist");

//Create watchlist Route
//Private Access
router.post("/create", async (req, res) => {
  try {
    const user = req.user;

    console.log(req.user);
    const watchlist = [
      { id: "bitcoin" },
      { id: "dogecoin" },
      { id: "ethereum" },
      { id: "dash" },
      { id: "dash" },
      { id: "eos" },
      { id: "cardano" },
      { id: "wanchain" },
    ];
    await Watchlist.create({ user: user._id, watchlist }, (err) => {
      if (err) {
        console.log(err);
      }
    });

    console.log("watchlist ceated");
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Could not create watchlist" });
  }
});

//Fetch Watchlist route
//Private Access
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return next;
    }
    //Search for watchlist in DB
    const doc = await Watchlist.findOne({ user: req.user._id });
    const watchlist = await doc.watchlist;

    //Alert if watchlist cant be found
    if (!doc) {
      console.log("watchlist not found");
      res.status("500").json({ success: false, msg: "Watchlist not found" });
    }

    console.log(watchlist);

    //return watchlist in json format
    res.status(200).json({ success: true, watchlist: doc.watchlist });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

//Add To Watchlist Route
router.put("/", async (req, res) => {
  try {
    const coinId = req.body.coinId;
    const doc = await Watchlist.findOne({ user: req.user._id });
    const watchlist = await doc.watchlist;

    console.log(doc);
    if (!doc) {
      res.status(500).json({ success: false, msg: "watchlist not found" });
      return next;
    }
    //If watchlist is found, continue to update it
    doc.watchlist = [...watchlist, { id: coinId }];
    await doc.save();

    res.status(200).json({ success: true, watchlist: doc.watchlist });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});

module.exports = router;
