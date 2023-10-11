const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = async (event) => {
  try {
    const { latitude, longitude } = JSON.parse(event.body);

    const params = {
      TableName: 'LocationData',
      Item: {
        LocationId: Date.now().toString(),
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
