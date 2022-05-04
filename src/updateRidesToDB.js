const { createActivity, updateActivity } = require("./manageActivity");

const updateRidesToDB = async (arrayWithRiderID, docClient) => {
  if( !Array.isArray(arrayWithRiderID) || arrayWithRiderID.length === 0 ) return;

  const createBatchParams = (recentRides) => {
      if( !Array.isArray(recentRides) || recentRides.length === 0) return undefined;

      const keys = recentRides.map( ride =>{
          return Object.assign({}, {"RiderID": ride.RiderID, "id": ride.id });
      });

      const batchParams = {
          "RequestItems": {
              "Rides": {
                  "Keys": keys,
                  "ProjectionExpression":"RiderID, id"
              },
          },
          "ReturnConsumedCapacity": "TOTAL"
      }
      return batchParams;
  };

  const isExistingActivity = (ride, existingRideArray) => {
      if( !Array.isArray(existingRideArray) || existingRideArray.length === 0) return false;
      return existingRideArray.find( obj => obj.RiderID === ride.RiderID &&  obj.id === ride.id) ? true : false;
  }

  const params = createBatchParams(arrayWithRiderID);
  const dataArray = await docClient.batchGet(params).promise()
    .then( response => response.Responses.Rides )
    .catch( err => console.log(`Error querying DB for recent ride existence: ${err.message}`));

  const dbUpdateArray = [];
  for( let i = 0; i < dataArray.length; i++){
    const ride = arrayWithRiderID[i];
    if ( isExistingActivity(ride, dataArray) ) {
      dbUpdateArray.push( updateActivity(ride, docClient) );
    } else {
      dbUpdateArray.push( createActivity(ride, docClient) );
    }
  }

  await Promise.all(dbUpdateArray);
  console.log(`all done updateRidesToDB for ${dataArray.length} activities`);
};

exports.updateRidesToDB = updateRidesToDB;
