# OCDCyclist Event Handlers

Event handlers are triggered by an AWS Lambda functions.  Lambdas are triggered by an SQS queue message.

## eventHandlerRefreshTokens

**Purpose**: Refresh the Strava access tokens for OCDCyclist rider(s).  

**Lambda**: OCDCyclistRefreshStravaTokens

**Queue**: OCDCyclistRefreshStravaTokensQueue

**Description**: The incoming event can either list the riders to refresh tokens for or if this is not provided, the tokens for all riders are refreshed.

The method getRidersFromEvent reads the incoming event object and either returns the requested riders or reterns all riders.

For each riderID, a new accesstoken is requested by sending this object in a POST request

```json
{
        "client_id": "{api.ClientID}",
        "client_secret": "{api.ClientSecret}",
        "grant_type": "{refresh_token}",
        "refresh_token": "{refreshToken}"
}
```

Sample event message to update single rider with RiderID of "1".

```json
{
  "Records": [
    {
      "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
      "receiptHandle": "MessageReceiptHandle",
      "body": "Hello from SQS!",
      "attributes": {
        "ApproximateReceiveCount": "1",
        "SentTimestamp": "1523232000000",
        "SenderId": "123456789012",
        "ApproximateFirstReceiveTimestamp": "1523232000001"
      },
      "MessageAttributes": {
        "RiderID": {
          "DataType": "String",
          "StringValue": "1"
        }
      },
      "MessageBody": "RiderID 1 has requested an activity update from Strava",
      "md5OfBody": "{{{md5_of_body}}}",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      "awsRegion": "us-east-1"
    }
  ]
}
```

## eventHandlerUploadRecentRides

**Purpose**: Retrieve the 30 most recent activities from Strava.

**Lambda**: OCDCyclistUploadRecentRidesToDB

**Queue**: OCDCyclistUploadRecentRidesToDBQueue

**Description**: For the requested RiderID, retrieve the 30 most recent activities from Strava and add new activities to the OCDCyclist DynamoDB database or refresh the existing records for kudo counts, similar non-activity attributes that can change.  Save a copy of the response from Strava in the s3 bucket "ocdcyclist/RecentRides/${RiderID}.T{epochtime}.json".  This S3 file is for debugging purposes only and will be automatically deleted with a day or two.

In addition, when a new activity is created, a request to update the activity details from Strava is made to the queue **OCDCyclistRequestActivityDetail**.

Sample event message to update single rider activities for RiderID of "1".
```json
{
  "Records": [
    {
      "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
      "receiptHandle": "MessageReceiptHandle",
      "body": "Hello from SQS!",
      "attributes": {
        "ApproximateReceiveCount": "1",
        "SentTimestamp": "1523232000000",
        "SenderId": "123456789012",
        "ApproximateFirstReceiveTimestamp": "1523232000001"
      },
      "MessageAttributes": {
        "RiderID": {
          "DataType": "String",
          "StringValue": "1"
        }
      },
      "MessageBody": "RiderID 1 has requested an activity update from Strava",
      "md5OfBody": "{{{md5_of_body}}}",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      "awsRegion": "us-east-1"
    }
  ]
}
```

## eventHandlerRequestActivityDetail

**Purpose**: Retrieve the activity detail from Strava for single activity for a rider.

**Lambda**: OCDCyclistRequestActivityDetail

**Queue**: OCDCyclistRequestActivityDetail

**Description**: For the requested RiderID, retrieve the detailed activity information from Strava which includes the activiity details plus segments, photos, and other related information.


Sample event message to retrieve single riders detailed activity data for an activity.
```json
{
  "Records": [
      {
          "messageId": "2f65d76a-e741-4c41-942c-8def237564b5",
          "receiptHandle": "AQEBGf5E2rvM1WeAzPvAXw6OZ569Tunf4mgmxeQQzqPm/3t3YsxEy3sHHaV0FkAxYSxsWtmVcTjhtDF7W4c2FMIiHc84F5tKeL/pX9QcmU6oyLtRUBHQmliq1jyzfrEkBk7WO/0zZsikem9MuevSgFsJ6HQqj6KGXXZIDB/dMdsh+anLoBUV6H33gI20taRtrXlTBoW7ptHCPx4+hiHUdo1d/n0jm4k6bniT8/yyeGanIAv1TWjLj5Zr4dWFQ2NByoW4H+GC8yNbcE7thAi8spiIbwyzlEc0+sDGtrFkOeQZ+vlsZmAEB7sBD0sBGcCdO3Ei6dQCw9bhtP8u51MVmeRd9RSAKiO1sxjm/IS7+d7VbLhcfAwp4NNK4hVQ4DvsA1oAEmooTmtmG1FzRClIltcAq/aZnDxAgsf+zkiahmo3Np0=",
          "body": "Test request for activity detail",
          "attributes": {
              "ApproximateReceiveCount": "3",
              "SentTimestamp": "1652027070662",
              "SenderId": "085991549361",
              "ApproximateFirstReceiveTimestamp": "1652027074303"
          },
          "messageAttributes": {
              "RiderID": {
                  "stringValue": "1",
                  "stringListValues": [],
                  "binaryListValues": [],
                  "dataType": "String"
              },
              "id": {
                  "stringValue": "7084588632",
                  "stringListValues": [],
                  "binaryListValues": [],
                  "dataType": "Number"
              }
          },
          "md5OfBody": "27f39e9680c80ae48cefd781c13e1f55",
          "md5OfMessageAttributes": "421cbc454bb21609b5267627cca01231",
          "eventSource": "aws:sqs",
          "eventSourceARN": "arn:aws:sqs:us-west-2:085991549361:OCDCyclistRequestActivityDetail",
          "awsRegion": "us-west-2"
      }
  ]
}
```