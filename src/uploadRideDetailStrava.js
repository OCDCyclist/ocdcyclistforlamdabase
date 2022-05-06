const {getAccessToken} = require('./getAccessToken');
const {getRideDetailStrava} = require('./getRideDetailStrava');
const {uploadRideDetailToS3Bucket} = require('./uploadRideDetailToS3Bucket');

const uploadRideDetailStrava = async (thisRide, s3, docClient)=>{
    const accessToken = await getAccessToken(thisRide.RiderID, docClient);
    const rideDetail = await getRideDetailStrava(thisRide, accessToken);

    const promiseArray = [];
    if( rideDetail ){
        promiseArray.push( uploadRideDetailToS3Bucket(rideDetail, s3) );
    }
    await Promise.all(promiseArray);
    console.log('all done uploadRideDetailStrava');
}

exports.uploadRideDetailStrava = uploadRideDetailStrava;