const HttpError = require("../http.error");
const Album = require("../models/album");

const createAlbum = async (name, description, showNbTracks, createdBy) => {
  const createdAlbum = new Album({
    name,
    description,
    showNbTracks,
    createdBy,
  });
  await createdAlbum.save();

  if (!createdAlbum) {
    const error = new HttpError("Could not create album ", 500);
    throw error;
  }

  return createdAlbum;
};

const updateAlbum = async (albumId, newData, updatedBy) => {
  const album = await Album.findById(albumId);
  const updatedData = { ...album.toObject(), ...newData, updatedBy };
  album.set(updatedData);
  const updatedAlbum = await album.save();
  console.log("Album updated successfully");
  return updatedAlbum;
};

const getAllAlbums = async () => {
  const allAlbums = await Album.find();
  return allAlbums;
};

const getAlbumById = async (albumId) => {
  const album = await Album.findById(albumId);
  return album;
};

const deleteAlbum = async (albumId) => {
  const deletedAlbum = await Album.deleteOne({ _id: albumId });
  console.log("Album deleted successfully");
  return deletedAlbum;
};

const isAlbumRelatedToSongs = async (albumId) => {
  const album = await Album.findById(albumId).populate("tracks");
  console.log("Error checking if the album is related to songs");
  return album.tracks.length > 0;
};

exports.createAlbum = createAlbum;
exports.updateAlbum = updateAlbum;
exports.getAllAlbums = getAllAlbums;
exports.getAlbumById = getAlbumById;
exports.deleteAlbum = deleteAlbum;
exports.isAlbumRelatedToSongs = isAlbumRelatedToSongs;
