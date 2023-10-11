const MongoClient = require('mongodb').MongoClient;

exports.handler = async (event, context) => {
  // Get the latitude and longitude from the event
  const latitude = event.latitude;
  const longitude = event.longitude;
  
  // Validate the latitude and longitude
  if (!latitude || !longitude) {
    return {
      statusCode: 400,
      body: JSON.stringify('Missing latitude or longitude'),
    };
  }

  // Create a connection to MongoDB
  const client = await MongoClient.connect('mongodb+srv://krishnsundaram:zZdqmFc1hh9SJ8PG@cluster0.wyvjx1u.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Get the database and collection
  const db = client.db('location');
  const collection = db.collection('location');

  // Insert the latitude and longitude into MongoDB
  await collection.insertOne({ latitude, longitude });

  // Close the connection to MongoDB
  await client.close();

  // Return a success response
  return {
    statusCode: 200,
    body: JSON.stringify('Successfully inserted data into MongoDB'),
  };
};
