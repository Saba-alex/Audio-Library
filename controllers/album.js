const HttpError = require("../http.error");
const albumServices = require("../services/album");

const createAlbum = async (req, res, next) => {
  const { name, description, showNbTracks } = req.body;
  const createdBy = req.userData.userId;
  try {
    const album = await albumServices.createAlbum(
      name,
      description,
      showNbTracks,
      createdBy
    );
    res.status(201).json(album);
  } catch (err) {
    const error = new HttpError("Could not create album", 500);
    return next(error);
  }
};

const updateAlbum = async (req, res, next) => {
  const { albumId } = req.params;
  const { newData } = req.body;
  const updatedBy = req.userData.userId;
  try {
    const existingAlbum = await albumServices.getAlbumById(albumId);
    if (!existingAlbum) {
      const error = new HttpError("Album not found", 404);
      return next(error);
    }
    const updatedAlbum = await albumServices.updateAlbum(
      albumId,
      newData,
      updatedBy
    );
    res.status(200).json(updatedAlbum);
  } catch (err) {
    const error = new HttpError("Could not update album", 500);
    return next(error);
  }
};

const getAllAlbums = async (req, res, next) => {
  try {
    const allAlbums = await albumServices.getAllAlbums();
    res.status(200).json(allAlbums);
  } catch (err) {
    const error = new HttpError("Could not fetch albums", 500);
    return next(error);
  }
};

const getAlbumById = async (req, res, next) => {
  const { albumId } = req.params;
  try {
    const album = await albumServices.getAlbumById(albumId);
    if (!album) {
      const error = new HttpError("Album not found", 404);
      return next(error);
    }
    res.status(200).json(album);
  } catch (err) {
    const error = new HttpError("Could not fetch album", 500);
    return next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  const { albumId } = req.params;
  try {
    const isAlbumRelatedToSongs = await albumServices.isAlbumRelatedToSongs(
      albumId
    );
    if (isAlbumRelatedToSongs) {
      const error = new HttpError(
        "Cannot delete the album because it is related to songs",
        422
      );
      return next(error);
    }

    const existingAlbum = await albumServices.getAlbumById(albumId);
    if (!existingAlbum) {
      const error = new HttpError("Album not found", 404);
      return next(error);
    }
    const deletedAlbum = await albumServices.deleteAlbum(albumId);
    res.status(200).json(deletedAlbum);
  } catch (err) {
    const error = new HttpError("Could not delete album", 500);
    return next(error);
  }
};

exports.createAlbum = createAlbum;
exports.updateAlbum = updateAlbum;
exports.getAllAlbums = getAllAlbums;
exports.getAlbumById = getAlbumById;
exports.deleteAlbum = deleteAlbum;
