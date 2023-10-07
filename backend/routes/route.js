const express = require("express");
const router = express.Router();
const product = require("../model/location");

app.post('/api/location', async (req, res) => {
    try {
      const { latitude, longitude } = req.body;
      const location = new Location({ latitude, longitude });
      await location.save();
      res.json({ success: true, message: 'Location saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error saving location' });
    }
  });

  module.exports = router;