const Tracks = require("../models/tracks");

const createTrack = async (name, singer, category, albumId) => {
  try {
    const createdTrack = new Tracks({
      name,
      singer,
      category,
      album: albumId,
    });

    await createdTrack.save();
    console.log("Song added to the album successfully");
    return createdTrack;
  } catch (err) {
    console.log(`could not create any track: ${err}`);
    throw err;
  }
};

const deleteTrack = async (trackId) => {
  try {
    const deletedTrack = await Tracks.deleteOne({ _id: trackId });
    console.log("track deleted successfully");
    return deletedTrack;
  } catch (err) {
    console.log(`could not Delete any track: ${err}`);
    throw err;
  }
};


  exports.createTrack = createTrack;
  exports.deleteTrack = deleteTrack;
  

