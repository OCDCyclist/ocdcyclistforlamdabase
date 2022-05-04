exports.sampleEventRefreshStravaTokens = {
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
        },
        "AccessToken": {
          "DataType": "String",
          "StringValue": "cc9f604fea151a90af181784c24a59e836c349bc"
        }
      },
      "MessageBody": "RiderID 1 has requested an activity update from Strava",
      "md5OfBody": "{{{md5_of_body}}}",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      "awsRegion": "us-east-1"
    }
  ]
};
