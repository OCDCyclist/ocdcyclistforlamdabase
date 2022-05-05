require('dotenv').config();
const {eventHandlerUploadRecentRides} = require('./eventHandlerUploadRecentRides');
const {eventHandlerRefreshTokens} = require('./eventHandlerRefreshTokens');
const {sampleEventUploadRecentRides} = require('./data/sampleEventUploadRecentRides');
const {sampleEventRefreshStravaTokens} = require('./data/sampleEventRefreshStravaTokens');

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
//AWS.config.logger = console;
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

( async () => {
  //await eventHandlerUploadRecentRides(sampleEventUploadRecentRides, s3, docClient);
})();


( async () => {
  await eventHandlerRefreshTokens(sampleEventRefreshStravaTokens, docClient);
})();

