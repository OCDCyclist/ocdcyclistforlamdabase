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

  const promiseArray = [];
  for(let i = 0; i < arrayWithRiderID.length; i++ ){
    const ride = arrayWithRiderID[i];
    const thisParams = createParams(ride.RiderID, ride.id);
    promiseArray.push( docClient.get(thisParams).promise() );
  };

  await Promise.all( promiseArray)
    .then( async dataArray =>{
      for( let j = 0; j < dataArray.length; j++){
        const ride = arrayWithRiderID[j];
        const data = dataArray[j];
        const updateExisitingRide = typeof data === 'object' && 'Item' in data && data.Item.id === arrayWithRiderID[j].id ;
        if ( updateExisitingRide) {
          /*await*/ updateActivity(ride, docClient);
        } else {
          /*await*/ createActivity(ride, docClient);
        }
      }
      console.log(`updateRidesToDB completed for ${dataArray.length} activities.` );
    })
    .catch( err => {
      console.log(`Error in updateRidesToDB: ${err.message}` );
      return [];
  });
};

exports.updateRidesToDB = updateRidesToDB;
