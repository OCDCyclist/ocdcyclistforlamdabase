const {getAccessToken} = require('./getAccessToken');
const {getRecentRidesFromStrava} = require('./getRecentRidesFromStrava');
const {uploadToS3Bucket} = require('./uploadToS3Bucket');
const {updateRidesToDB} = require('./updateRidesToDB');

const refreshRiderActivities = async (riderID, docClient, s3 ) =>{
    const accessToken = await getAccessToken(riderID, docClient);
    if( accessToken){
      const recentRides = await getRecentRidesFromStrava(riderID, accessToken);
      if( recentRides.length > 0 ){
       uploadToS3Bucket(riderID, recentRides, s3);
       updateRidesToDB(recentRides, docClient);
      }
    }
  };

  exports.refreshRiderActivities = refreshRiderActivities;