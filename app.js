const express = require("express");
const mongoose = require("mongoose");

const Tracks = require("./models/tracks");
const albumServices = require("./services/album");
const categoryServices = require("./services/category");
const tracksServices = require("./services/tracks");

const app = express();

const testCase = async () => {
  try {
    const popCategory = await categoryServices.addCategory("Pop", "Pop Music");
    const jazzCategory = await categoryServices.addCategory(
      "Jazz",
      "Jazz Music"
    );

    const myAlbum = await albumServices.createAlbum(
      "My Album",
      "the first Album",
      true
    );
    const tempAlbum = await albumServices.createAlbum(
      "Temp Album",
      "the temp Album",
      false
    );

    const AlbumTracks = [
      { name: "Track 1", singer: "Artist 1", category: popCategory._id },
      { name: "Track 2", singer: "Artist 2", category: popCategory._id },
      { name: "Track 3", singer: "Artist 3", category: popCategory._id },
    ];

    for (let tracks of AlbumTracks) {
      await tracksServices.createTrack(
        tracks.name,
        tracks.singer,
        tracks.category,
        myAlbum._id
      );
    }

    const tempAlbumTracks = [
      { name: "Track 1", singer: "Jazz Artist 1", category: jazzCategory._id },
      { name: "Track 2", singer: "Jazz Artist 2", category: jazzCategory._id },
      { name: "Track 3", singer: "Jazz Artist 3", category: jazzCategory._id },
    ];

    for (let tracks of tempAlbumTracks) {
      await tracksServices.createTrack(
        tracks.name,
        tracks.singer,
        tracks.category,
        tempAlbum._id
      );
    }

    const deleteTempAlbum = await albumServices.deleteAlbum(tempAlbum._id);
    console.log("Deleted Album:", deleteTempAlbum);

    const lastTrack = await Tracks.find({ album: myAlbum._id });

    const deleteLastTrack = lastTrack.pop();
    await tracksServices.deleteTrack(deleteLastTrack._id);
  } catch (err) {
    console.log(`error ${err}`);
  }
};

mongoose
  .connect(
    "mongodb+srv://alex:helloitsme@cluster0.7fveeqd.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    testCase();
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
