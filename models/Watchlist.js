const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
  user: mongoose.Schema.Types.ObjectId,
  watchlist: Array,
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
