const { createActivity, updateActivity } = require("./manageActivity");

const updateRidesToDB = async (arrayWithRiderID, docClient) => {
  if( !Array.isArray(arrayWithRiderID) || arrayWithRiderID.length === 0 ) return;

  const createParams = (riderID, id) => {
    const params = {
      TableName: "Rides",
      Key: Object.assign({}, { RiderID: riderID, id: id }),
      ProjectionExpression: "RiderID, id",
    };

    return params;
  };

  const isExistingActivity = (data, recentRideID) => typeof data === 'object' && 'Item' in data && data.Item.id === recentRideID;

  const promiseArray = [];
  for(let i = 0; i < arrayWithRiderID.length; i++ ){
    const ride = arrayWithRiderID[i];
    const thisParams = createParams(ride.RiderID, ride.id);
    promiseArray.push( docClient.get(thisParams).promise() );
  };

  const dbUpdateArray = [];

  const dataArray = await Promise.all( promiseArray)

  for( let i = 0; i < dataArray.length; i++){
    const ride = arrayWithRiderID[i];
    if ( isExistingActivity(dataArray[i], ride.id) ) {
      dbUpdateArray.push( updateActivity(ride, docClient) );
    } else {
      dbUpdateArray.push( createActivity(ride, docClient) );
    }
  }

  await Promise.all(dbUpdateArray);
  console.log(`all done updateRidesToDB for ${dataArray.length} activities`);
};

exports.updateRidesToDB = updateRidesToDB;
