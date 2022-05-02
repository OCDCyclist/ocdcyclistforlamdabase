const getAccessToken = async (riderID, docClient) => {
  if (typeof riderID !== "string" || riderID.trim().length === 0) {
    console.log(`Invalid riderid provided to getAccessToken.`);
    return false;
  }

  if (typeof docClient !== "object") {
    console.log(`Invalid docClient provided to getAccessToken.`);
    return false;
  }

  // First lookup the access ID for the Rider.
  const paramsForDynamoDB = {
    TableName: "Riders",
    Key: Object.assign({}, { RiderID: riderID }),
    ProjectionExpression: "RiderID, AccessToken",
  };

  const accessToken = await docClient
    .get(paramsForDynamoDB)
    .promise()
    .then(async (result) => {
      if (result.Item.AccessToken.trim().length > 0) {
        return result.Item.AccessToken.trim();
      }
      return undefined;
    })
    .catch((err) => {
      console.log(
        `Error retrieving the access token for RiderID ${riderID}: ${err.message}`
      );
      return undefined;
    });

  if (!accessToken) {
    console.log(`Unable to retrieve access token for RiderID ${riderID}`);
    return undefined;
  }
  return accessToken;
};

exports.getAccessToken = getAccessToken;
