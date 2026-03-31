const express = require("express");
const router = express.Router();

const Bookmark = require("../models/Bookmark");

router.post("/bookmark", async (req, res) => {

  try {

    const { topic, documentId } = req.body;

    const bookmark = new Bookmark({
      topic,
      documentId
    });

    await bookmark.save();

    res.json({
      message: "Topic bookmarked for revision"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.get("/bookmarks", async (req, res) => {

  try {

    const bookmarks = await Bookmark.find();

    res.json(bookmarks);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
