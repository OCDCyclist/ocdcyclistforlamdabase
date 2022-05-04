
require('dotenv').config();

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
//AWS.config.logger = console;
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

( async () => {
  const {eventHandlerUploadRecentRides} = require('./eventHandlerUploadRecentRides');
  const {sampleEventUploadRecentRides} = require('./data/sampleEventUploadRecentRides');
  console.time('RecentRides')
  await eventHandlerUploadRecentRides(sampleEventUploadRecentRides, s3, docClient);
  console.timeEnd('RecentRides')
  console.log('all done eventHandlerUploadRecentRides')
})();


( async () => {
  const {eventHandlerRefreshStravaTokens} = require('./eventHandlerRefreshStravaTokens');
  console.time('RefreshTokens')
  const {sampleEventRefreshStravaTokens} = require('./data/sampleEventRefreshStravaTokens');
  console.timeEnd('RefreshTokens');
  await eventHandlerRefreshStravaTokens(sampleEventRefreshStravaTokens, docClient);
  console.log('all done eventHandlerRefreshStravaTokens')
})();

