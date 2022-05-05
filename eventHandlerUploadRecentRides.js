const {uploadRecentRides} = require('./src/uploadRecentRides');
const {getRidersFromEvent} = require('./src/getRidersFromEvent');

const eventHandlerUploadRecentRides = async (event, s3, docClient) =>{
    const riders = await getRidersFromEvent( event, docClient);
    const promiseArray = [];

    for( let i = 0; i < riders.length; i++){
        promiseArray.push( uploadRecentRides( riders[i], s3, docClient) );
    }

    await Promise.all(promiseArray);
    console.log('all done eventHandlerUploadRecentRides')
}
exports.eventHandlerUploadRecentRides = eventHandlerUploadRecentRides;

