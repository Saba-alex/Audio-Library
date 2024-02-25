const Album = require("../models/album");

const createAlbum = async (name, description, showNbTracks) => {
  try {
    const createdAlbum = new Album({ name, description, showNbTracks });
    await createdAlbum.save();
    console.log("Album created successfully");
    return createdAlbum;
  } catch (err) {
    console.log(`could not create any Album: ${err}`);
    throw err;
  }
};

const updateAlbum = async (albumId, newData) => {
  try {
    const album = await Album.findById(albumId);

    const updatedData = {
      ...album.toObject(),
      ...newData,
    };

    album.set(updatedData);
    const updatedAlbum = await album.save();
    console.log("Album updated successfully");
    return updatedAlbum;
  } catch (err) {
    console.log(`could not update any Album: ${err}`);
    throw err;
  }
};

const getAllAlbums = async () => {
  try {
    const allAlbums = await Album.find();
    return allAlbums;
  } catch (err) {
    console.log(`could not find any Albums`);
    throw err;
  }
};

const getAlbumById = async (albumId) => {
  try {
    const album = await Album.findById(albumId);
    return album;
  } catch (err) {
    console.log(`could not find any Album: ${err}`);
    throw err;
  }
};

const deleteAlbum = async (albumId) => {
  try {
    const deletedAlbum = await Album.deleteOne({ _id: albumId });
    console.log("Album deleted successfully");
    return deletedAlbum;
  } catch (err) {
    console.log(`could not Delete any Album: ${err}`);
    throw err;
  }
};

exports.createAlbum = createAlbum;
exports.updateAlbum = updateAlbum;
exports.getAllAlbums = getAllAlbums;
exports.getAlbumById = getAlbumById;
exports.deleteAlbum = deleteAlbum;
  

  

