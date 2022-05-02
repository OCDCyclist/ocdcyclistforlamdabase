const sampleMessageForRequestUpdateFromStravaQueue =
{
  "Records": [
    {
      "DelaySeconds": 0,
      "MessageAttributes": {
        "RiderID": { "DataType": "String", "StringValue": "1" },
        "AccessToken": {
          "DataType": "String",
          "StringValue": "cc9f604fea151a90af181784c24a59e836c349bc"
        }
      },
      "MessageBody": "RiderID 1 has requested an activity update from Strava",
      "QueueUrl": ""
    }
  ]
}
