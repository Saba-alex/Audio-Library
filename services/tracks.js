const Tracks = require("../models/tracks");

const getTracksbyAlbumId = async (albumId, categoryId) => {
  let tracks = await Tracks.find({ albumId });

  if (categoryId) {
    tracks = tracks.filter((track) => String(track.categoryId) === categoryId);
  }

  tracks.sort((a, b) => b.createdAt - a.createdAt);

  return tracks;
};

const createTrack = async (name, singer, categoryId, albumId) => {
  const createdTrack = new Tracks({
    name,
    singer,
    category: categoryId,
    album: albumId,
  });

  await createdTrack.save();
  console.log("Song added to the album successfully");
  return createdTrack;
};

const deleteTrack = async (trackId) => {
  const deletedTrack = await Tracks.deleteOne({ _id: trackId });
  console.log("track deleted successfully");
  return deletedTrack;
};

exports.getTracksbyAlbumId = getTracksbyAlbumId;
exports.createTrack = createTrack;
exports.deleteTrack = deleteTrack;
