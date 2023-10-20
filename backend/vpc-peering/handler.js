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
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Location saved successfully' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ error: 'An error occurred while saving the location' }),
    };
  }
};

module.exports.options = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'OPTIONS,POST',
    },
  };

  callback(null, response);
};
