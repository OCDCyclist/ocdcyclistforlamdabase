const {refreshStravaToken} = require('./src/refreshStravaToken');

const eventHandlerRefreshTokens = async (event, docClient) =>{
    const isvalidString = val => typeof val === 'string' && val.trim().length > 0;

    const api = {
        ClientID: process.env.CLIENTID,
        ClientSecret: process.env.CLIENTSECRET,
        ClientPermissions: process.env.CLIENTPERMISSIONS
    };

    const riders = [];
    const promiseArray = [];

    const params = {
        ProjectionExpression: "RiderID",
        TableName: "Riders"
    };
    const result = await docClient.scan(params).promise();
    const records = Array.isArray(result.Items) ? result.Items : [];

    for( let i = 0; i < records.length; i++){
        const thisRiderID = records[i].RiderID;
        if( isvalidString(thisRiderID) && !riders.includes( thisRiderID) ){
            riders.push(thisRiderID)
        }
    }

    for( let i = 0; i < riders.length; i++){
        const thisRiderID = riders[i];
        promiseArray.push( refreshStravaToken(thisRiderID, api, docClient) );
    }

    await Promise.all(promiseArray);
}

exports.eventHandlerRefreshTokens = eventHandlerRefreshTokens;