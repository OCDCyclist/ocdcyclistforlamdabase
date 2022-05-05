const {refreshStravaToken} = require('./src/refreshStravaToken');
const {getRidersFromEvent} = require('./src/getRidersFromEvent');

const eventHandlerRefreshTokens = async (event, docClient) =>{

    const api = {
        ClientID: process.env.CLIENTID,
        ClientSecret: process.env.CLIENTSECRET,
        ClientPermissions: process.env.CLIENTPERMISSIONS
    };

    const riders = await getRidersFromEvent( event, docClient);
    const promiseArray = [];

    for( let i = 0; i < riders.length; i++){
        const thisRiderID = riders[i];
        promiseArray.push( refreshStravaToken(thisRiderID, api, docClient) );
    }

    await Promise.all(promiseArray);
}

exports.eventHandlerRefreshTokens = eventHandlerRefreshTokens;