const client = require('../../dynamodbClientService');

/**
 * deleteUserConnection
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.connectionId the websocket connection id
 * @returns {Promise} the promise of the call to persistence
 */
exports.deleteUserConnection = async ({ applicationContext, connectionId }) => {
  const users = await client.query({
    ExpressionAttributeNames: {
      '#gsi1pk': 'gsi1pk',
    },
    ExpressionAttributeValues: {
      ':gsi1pk': connectionId,
    },
    IndexName: 'gsi1',
    KeyConditionExpression: '#gsi1pk = :gsi1pk',
    applicationContext,
  });

  for (const user of users) {
    await client.delete({
      applicationContext,
      key: {
        pk: user.pk,
        sk: connectionId,
      },
    });
  }
};
