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

    // If the event contains records then process them, otherwide process all Riders.
    if( event && 'Records' in event && Array.isArray( event.Records) && event.Records.length > 0 && 'RiderID' in  event.Records[0].MessageAttributes){
        const records = event.Records;
        for( let i = 0; i < records.length; i++){
            const thisRiderID = records[i].MessageAttributes.RiderID.StringValue;
            if( isvalidString(thisRiderID) && !riders.includes( thisRiderID) ){
                riders.push(thisRiderID)
            }
        }
    }
    else{
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
    }

    for( let i = 0; i < riders.length; i++){
        const thisRiderID = riders[i];
        promiseArray.push( refreshStravaToken(thisRiderID, api, docClient) );
    }

    await Promise.all(promiseArray);
}

exports.eventHandlerRefreshTokens = eventHandlerRefreshTokens;