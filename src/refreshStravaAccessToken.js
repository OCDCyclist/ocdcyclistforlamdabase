const fetch = require("node-fetch");

const refreshStravaAccessToken = async (riderID, api, docClient) => {
    if (typeof riderID !== "string" || riderID.trim().length === 0) {
      console.log(`Invalid riderid provided to refreshStravaAccessToken.`);
      return false;
    }

    if (typeof docClient !== "object") {
      console.log(`Invalid docClient provided to refreshStravaAccessToken.`);
      return false;
    }

    // First lookup the refresh token and  ID for the Rider.
    const refreshToken = await getRefreshToken(riderID, docClient);
    const tokenExchangeObject = createTokenExchangeObject( api, refreshToken );
    const newTokens = await getNewTokens( tokenExchangeObject);
    await updateTokensToDB( riderID, newTokens, docClient);
};

const getRefreshToken = async (riderID, docClient) =>{
    const paramsForDynamoDB = {
        TableName: "Riders",
        Key: Object.assign({}, { RiderID: riderID }),
        ProjectionExpression: "RiderID, RefreshToken",
      };

    return await docClient
      .get(paramsForDynamoDB)
      .promise()
      .then(async result => result.Item.RefreshToken.trim().length > 0 ? result.Item.RefreshToken.trim() : undefined)
      .catch( err => console.log( `getRefreshToken error retrieving the refresh token for RiderID ${riderID}: ${err.message}`) );
}

const getNewTokens = async tokenExchangeObject =>{
  return await fetch('https://www.strava.com/oauth/token', {
    method: "post",
    body: JSON.stringify(tokenExchangeObject),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(tokens => tokens)
    .catch(err => console.log(`Error in getNewTokens for tokenExchangeObject ${tokenExchangeObject.refresh_token}: ${err.message}`) );
};

const updateTokensToDB = async (riderID, newTokens, docClient) =>{

  var params = {
    TableName: "Riders",
    Key: { RiderID : riderID },
    Item: newTokens,
    UpdateExpression: 'set AccessToken = :at, RefreshToken = :rt, AccessTokenExpires = :ate',
    ExpressionAttributeValues: {
      ':at' : newTokens.access_token,
      ':rt' : newTokens.refresh_token,
      ':ate': newTokens.expires_at
    }
  };

  await docClient.update(params).promise()
    .then( result =>{
      console.log(`Successfully updated access tokens for RiderID=${riderID}`);
    })
    .catch( err =>{
      console.log(`Error while updating existing ride for RiderID=${riderID}: ${JSON.stringify(err)}`);
    });
};

const createTokenExchangeObject = (api, refreshToken) =>{
    const returnValue =  {
        client_id: api.ClientID,
        client_secret: api.ClientSecret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    };
    return returnValue;
}

exports.refreshStravaAccessToken = refreshStravaAccessToken;
