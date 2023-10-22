const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = async (event) => {
  try {
    const { latitude, longitude, image_source, text } = JSON.parse(event.body);

    const locationId = Date.now();

    const params = {
      TableName: 'Location',
      Item: {
        LocationId: locationId,
        Latitude: latitude,
        Longitude: longitude,
        Image_source: image_source,
        Text: text,
      },
    };

    await dynamodb.put(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
      body: JSON.stringify({ message: 'Location saved successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 400, // Change the status code to 400 (Bad Request) or any other appropriate code
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      },
      body: JSON.stringify({ error: error.message || 'An error occurred while saving the location' }),
    };
  }
};

