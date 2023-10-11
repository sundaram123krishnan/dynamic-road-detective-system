const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { latitude, longitude } = JSON.parse(event.body);

    const params = {
      TableName: 'Location', // Replace with your DynamoDB table name
      Item: {
        LocationId: Date.now().toString(), // Using a timestamp as the unique ID
        Latitude: latitude,
        Longitude: longitude,
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
