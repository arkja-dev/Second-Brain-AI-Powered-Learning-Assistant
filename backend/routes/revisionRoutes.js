const express = require("express");
const router = express.Router();

const Revision = require("../models/Revision");

router.post("/schedule-revision", async (req, res) => {

  try {

    const { topic, documentId, daysLater } = req.body;

    const revisionDate = new Date();
    revisionDate.setDate(revisionDate.getDate() + (daysLater || 30));

    const revision = new Revision({
      topic,
      documentId,
      revisionDate
    });

    await revision.save();

    res.json({
      message: "Revision scheduled",
      revisionDate
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


router.get("/today-revisions", async (req, res) => {

  try {

    const today = new Date();

    const revisions = await Revision.find({
      revisionDate: { $lte: today }
    });

    res.json(revisions);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;
