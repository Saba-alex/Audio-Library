const express =require('express')
const router = express.Router();
const { validate} = require("express-validator");
const Joi = require('joi')
const auth = require('../middleware/check-auth')

const tracksControllers = require("../controllers/tracks");

// const TrackValidation = [
//     check('name').not().isEmpty().trim().withMessage('Name is required'),
//     check('singer').not().isEmpty().trim().withMessage('Singer is required'),
//     check('category').not().isEmpty(),
//     check('albumId').not().isEmpty()
// ];

const joiForTrack= Joi.object({
    name: Joi.string().required(),
    singer: Joi.string().required(),
    categoryId: Joi.string().required(),
    albumId: Joi.string().required()
  });

router.post("/createTrack",validate({body:joiForTrack}), tracksControllers.createTrack);

router.delete("/deleteTrack/:trackId" ,tracksControllers.deleteTrack);
router.get('/:albumId', auth, tracksControllers.getTracksByAlbumId);


module.exports = router;