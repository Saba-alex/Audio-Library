const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    name: String,

    description: String,

    showNbTracks: {
      type: Boolean,
      default: false,
    },

    lastSongAddedAt: Date,
    
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);
