const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tracksSchema = new Schema({
  name: String,

  singer: String,

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  albumId: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },
});

module.exports = mongoose.model("Tracks", tracksSchema);
