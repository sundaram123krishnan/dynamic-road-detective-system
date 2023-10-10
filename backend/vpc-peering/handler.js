const { MongoClient } = require('mongodb');

// Replace these with your MongoDB connection details
const MONGODB_URI = 'mongodb+srv://krishnsundaram:zZdqmFc1hh9SJ8PG@cluster0.wyvjx1u.mongodb.net/';
const COLLECTION_NAME = 'locations';

exports.handler = async (event) => {
  try {
    // Parse the JSON body directly without the event parameter
    const { latitude, longitude } = JSON.parse(event.body);

    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db();
    const collection = db.collection(COLLECTION_NAME);

    const insertResult = await collection.insertOne({ latitude, longitude });

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
