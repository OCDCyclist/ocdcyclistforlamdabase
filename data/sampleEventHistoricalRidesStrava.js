exports.sampleEventHistoricalRidesStrava = {
  "Records": [
    {
      "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
      "receiptHandle": "MessageReceiptHandle",
      "body": "Get ride detail from Strava for a single ride",
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
        "Year": {
          "DataType": "String",
          "StringValue": "2022"
        },
        "Month": {
          "DataType": "String",
          "StringValue": "1"
        }
      },
      "MessageBody": "RiderID 1 has requested an ride details from Strava for id ",
      "md5OfBody": "{{{md5_of_body}}}",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
      "awsRegion": "us-east-1"
    }
  ]
};
