const {getAccessToken} = require('./src/getAccessToken');
const {getRecentRidesFromStrava} = require('./src/getRecentRidesFromStrava');
const {uploadToS3Bucket} = require('./src/uploadToS3Bucket');
const {updateRidesToDB} = require('./src/updateRidesToDB');
const {refreshStravaAccessToken} = require('./src/refreshStravaAccessToken');

require('dotenv').config();

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
AWS.config.logger = console;
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const riderID = "1";

//const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

/*
( async () => {
  const accessToken = await getAccessToken(riderID, docClient);
  if( accessToken){
    const recentRides = await getRecentRidesFromStrava(riderID, accessToken);
    if( recentRides.length > 0 ){
     uploadToS3Bucket(riderID, recentRides, s3);
     updateRidesToDB(recentRides, docClient);
    }
  }
})();
*/
( async () => {

  const api = {
    ClientID: process.env.CLIENTID,
    ClientSecret: process.env.CLIENTSECRET,
    ClientPermissions: process.env.CLIENTPERMISSIONS
  };

 await refreshStravaAccessToken("1", api, docClient);
 console.log('All done.')
})();


