const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  showNbTracks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  lastSongAddedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Album", albumSchema);
