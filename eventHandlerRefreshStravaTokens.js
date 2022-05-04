const {refreshStravaToken} = require('./src/refreshStravaToken');

const eventHandlerRefreshStravaTokens = async (event, docClient) =>{
    const isvalidString = val => typeof val === 'string' && val.trim().length > 0;

    const api = {
        ClientID: process.env.CLIENTID,
        ClientSecret: process.env.CLIENTSECRET,
        ClientPermissions: process.env.CLIENTPERMISSIONS
    };

    const records = event.Records;
    const riders = [];
    const promiseArray = [];

    for( let i = 0; i < records.length; i++){
        const thisRiderID = records[i].MessageAttributes.RiderID.StringValue;
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

exports.eventHandlerRefreshStravaTokens = eventHandlerRefreshStravaTokens;