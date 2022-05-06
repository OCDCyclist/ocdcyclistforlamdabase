const {getAccessToken} = require('./getAccessToken');
const {getHistoricalRidesFromStrava} = require('./getHistoricalRidesFromStrava');
const {uploadToS3Bucket} = require('./uploadToS3Bucket');
const {updateRidesToDB} = require('./updateRidesToDB');

const updateHistoricalRidesStrava = async (historialRiderIDYearMonth, s3, docClient)=>{
    const accessToken = await getAccessToken(historialRiderIDYearMonth.RiderID, docClient);
    const recentRides = await getHistoricalRidesFromStrava(historialRiderIDYearMonth, accessToken);

/*    const promiseArray = [];
    if( recentRides.length > 0 ){
        promiseArray.push( updateRidesToDB(recentRides, docClient) );
        promiseArray.push( uploadToS3Bucket(thisRiderID, recentRides, s3) );
    }
    await Promise.all(promiseArray);*/
    console.log('all done updateHistoricalRidesStrava');
}

exports.updateHistoricalRidesStrava = updateHistoricalRidesStrava;
