const express =require('express')
const router = express.Router();
const albumControllers = require("../controllers/album");

router.post("/createAlbum", albumControllers.createAlbum);
router.put("/updateAlbum/:albumId", albumControllers.updateAlbum);
router.get("/", albumControllers.getAllAlbums);
router.get("/:albumId", albumControllers.getAlbumById);
router.delete("/deleteAlbum/:albumId", albumControllers.deleteAlbum);

module.exports = router;