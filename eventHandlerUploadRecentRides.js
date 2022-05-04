const {uploadRecentRides} = require('./src/uploadRecentRides');

const eventHandlerUploadRecentRides = async (event, s3, docClient) =>{
    const isvalidString = val => typeof val === 'string' && val.trim().length > 0;

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
        promiseArray.push( uploadRecentRides( riders[i], s3, docClient) );
    }

    await Promise.all(promiseArray);
    console.log('all done eventHandlerUploadRecentRides')
}
exports.eventHandlerUploadRecentRides = eventHandlerUploadRecentRides;

