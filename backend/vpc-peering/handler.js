const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // const requestBody = JSON.parse(event.body);

    const requestBody = {
      latitude: 123,
      longitude: 123
    }

    // Check if the request body contains valid latitude and longitude values
    if (!requestBody.latitude || !requestBody.longitude) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid request data. Both latitude and longitude are required.' }),
      };
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE, // Replace with your DynamoDB table name
      Item: {
        LocationId: Date.now().toString(), // Using a timestamp as the unique ID
        Latitude: requestBody.latitude,
        Longitude: requestBody.longitude,
      },
    };

    await dynamodb.put(params).promise();

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
