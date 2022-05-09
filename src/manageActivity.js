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

const requestDetailforActivity = async (activity, sqs) =>{
  if( typeof activity !== 'object') return;
  const params = {
    // Remove DelaySeconds parameter and value for FIFO queues
    DelaySeconds: 0,
    MessageAttributes: {
      RiderID: {
        DataType: "String",
        StringValue: `${activity.RiderID}`,
      },
      id: {
        DataType: "String",
        StringValue: `${activity.id}`,
      },
    },
    MessageBody: `RiderID ${riderID} requests activity detail for id ${activity.id}`,
    QueueUrl:
      "https://sqs.us-west-2.amazonaws.com/085991549361/OCDCyclistRequestActivityDetail",
  };
  await sqs.sendMessage(params).promise();
  console.log(`requestDetailforActivity for RiderID ${activity.RiderID} and id ${activity.id} queued.`)
};

const putIt = async (activity, docClient) => {
  var params = {
    TableName: "Rides",
    Item: activity,
  };

  await docClient.put(params ).promise()
    .then( () =>{
      logMessage('Create', activity);
    })
    .catch( err =>{
      logMessage('Create', activity, err);
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
    .then( () =>{
      logMessage('Update', activity);
    })
    .catch( err =>{
      logMessage('Update', activity, err);
    });
};

const logMessage = (type, activity, err) =>{
  if( err ){
    console.log(`Type=${type} RiderID=${activity.riderID} id=${activity.id} name=${activity.name}: ${JSON.stringify(err)}`);
  }
  else{
    console.log(`Type=${type} RiderID=${activity.RiderID} id=${activity.id} name=${activity.name}`);
  }
}

exports.createActivity = createActivity;
exports.updateActivity = updateActivity;
exports.requestDetailforActivity = requestDetailforActivity;
