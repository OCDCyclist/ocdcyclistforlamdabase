const { filterRecentRideObject } = require("./utils/filterRecentRideObject");
const {fieldList} = require("./utils/fieldList");
const { flattenathleteobject } = require("./utils/flattenathleteobject");

const createActivity = async (activity, docClient) => {
  await putIt(
    flattenathleteobject(filterRecentRideObject(activity, "new", fieldList)),
    docClient
  );
};

const updateActivity = async (activity, docClient) => {
  await updateIt(filterRecentRideObject(activity, "update", fieldList), docClient);
};

const putIt = async (activity, docClient) => {
  var params = {
    TableName: "Rides",
    Item: activity,
  };

  await docClient.put(params ).promise()
    .then( result =>{
      console.log(`Successfully added new ride for RiderID=${activity.RiderID} and id=${activity.id} with title ${activity.name}`);
    })
    .catch( err =>{
      console.log(`Error while adding new ride for RiderID=${activity.RiderID} and id=${activity.id} with title ${activity.name}. Error: ${JSON.stringify(err)}`);
    });
};

const updateIt = async (activity, docClient) => {
  var params = {
    TableName: "Rides",
    Key: { RiderID : activity.RiderID, id: activity.id },
    Item: activity,
    UpdateExpression: 'set #n = :n, achievement_count = :a, kudos_count = :k, comment_count = :c, athlete_count = :at, trainer = :tr, commute = :co, visibility = :vi, gear_id = :ge, flagged = :fa, total_photo_count = :to',
    ExpressionAttributeValues: {
      ':n' : activity.name,
      ':a' : activity.achievement_count,
      ':k' : activity.kudos_count,
      ':c' : activity.comment_count,
      ':at': activity.athlete_count,
      ':tr': activity.trainer,
      ':co': activity.commute,
      ':vi': activity.visibility,
      ':ge': activity.gear_id,
      ':fa': activity.flagged,
      ':to': activity.total_photo_count
    },
    ExpressionAttributeNames: {
      '#n': 'name'
     },
  };

  await docClient.update(params).promise()
    .then( result =>{
      console.log(`Successfully updated existing ride for RiderID=${activity.RiderID} and id=${activity.id} with title ${activity.name}`);
    })
    .catch( err =>{
      console.log(`Error while updating existing ride for RiderID=${activity.RiderID} and id=${activity.id} with title ${activity.name}. Error: ${JSON.stringify(err)}`);
    });
};

exports.createActivity = createActivity;
exports.updateActivity = updateActivity;
