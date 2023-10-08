const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Location = require('./model/location'); // Create a Location model

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://krishnsundaram:5QlZ3Qv4bWaqeD7G@cluster0.mviqfkr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/location', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const location = new Location({ latitude, longitude });
    await location.save();
    res.json({location});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error saving location' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
