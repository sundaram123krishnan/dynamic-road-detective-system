const { MongoClient } = require('mongodb');

// Define the MongoDB connection details and collection name
const MONGODB_URI = process.env.MONGODB_URI;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

exports.handler = async (event) => {
  try {
    // Parse the JSON body from the HTTP request
    const { latitude, longitude } = JSON.parse(event.body);

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Access the MongoDB collection
    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    // Insert location data into the collection
    const insertResult = await collection.insertOne({ latitude, longitude });

    // Close the MongoDB connection
    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Location saved successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while saving the location' }),
    };
  }
};
