const mongoose= require('mongoose')

const Schema = mongoose.Schema;

const tracksSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
});

module.exports = mongoose.model("Tracks", tracksSchema);
