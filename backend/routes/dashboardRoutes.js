const express = require("express");
const router = express.Router();

const Revision = require("../models/Revision");
const Bookmark = require("../models/Bookmark");
const Document = require("../models/Document");

router.get("/dashboard", async (req, res) => {

  try {

    const today = new Date();

    const revisions = await Revision.find({
      revisionDate: { $lte: today }
    });

    const bookmarks = await Bookmark.find();

    const documents = await Document.find();

    res.json({

      totalDocuments: documents.length,

      totalBookmarks: bookmarks.length,

      todayRevisions: revisions.length,

      revisionTopics: revisions,

      bookmarkedTopics: bookmarks

    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
