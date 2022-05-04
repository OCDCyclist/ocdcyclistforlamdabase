const {getAccessToken} = require('./getAccessToken');
const {getRecentRidesFromStrava} = require('./getRecentRidesFromStrava');
const {uploadToS3Bucket} = require('./uploadToS3Bucket');
const {updateRidesToDB} = require('./updateRidesToDB');

const uploadRecentRides = async (thisRiderID, s3, docClient)=>{
    const accessToken = await getAccessToken(thisRiderID, docClient);
    const recentRides = await getRecentRidesFromStrava(thisRiderID, accessToken);

    const promiseArray = [];
    if( recentRides.length > 0 ){
        promiseArray.push( updateRidesToDB(recentRides, docClient) );
        promiseArray.push( uploadToS3Bucket(thisRiderID, recentRides, s3) );
    }
    await Promise.all(promiseArray);
    console.log('all done uploadRecentRides');
}

exports.uploadRecentRides = uploadRecentRides;