const HttpError = require("../http.error");
const tracksServices = require("../services/tracks");
const { validationResult } = require("express-validator");

const createTrack = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const err = new HttpError(
      "Validation failed, entered data is incorrect.",
      422
    );
    return next(err) 
     
  }

  const { name, singer, categoryId } = req.body;
  const { albumId } = req.params;
  try {
    const createdTrack = await tracksServices.createTrack({
      name,
      singer,
      categoryId,
      albumId,
    });

    res.status(201).json(createdTrack);
  } catch (error) {
    const httpError = new HttpError("Could not create track", 500);
    return next(httpError);
  }
};

const deleteTrack = async (req, res, next) => {
  

  const { trackId } = req.params;
  try {
    const deletedTrack = await tracksServices.deleteTrack(trackId);

    if (!deletedTrack) {
      const error = new HttpError("Track not found", 404);
      return next(error);
    }

    res.status(201).json(deletedTrack);
  } catch (error) {
     const httpError = new HttpError("Could not delete track", 500);
    return next(httpError);
  }
};


const getTracksByAlbumId = async (req, res, next) => {
  const { albumId } = req.params;
  const { categoryId } = req.query;

  try {
    const tracks = await tracksServices.getTracksbyAlbumId(albumId, categoryId);
    res.status(200).json(tracks);
  } catch (error) {
    const httpError = new HttpError("Could not fetch tracks", 500);
    return next(httpError);
  }
};

exports.getTracksByAlbumId = getTracksByAlbumId;
exports.createTrack = createTrack;
exports.deleteTrack = deleteTrack;
