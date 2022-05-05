const { getRidersFromEvent } = require("../src/getRidersFromEvent");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const singleRiderEvent =  {
    Records: [
      {
        messageId: "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
        receiptHandle: "MessageReceiptHandle",
        body: "Hello from SQS!",
        attributes: {
          ApproximateReceiveCount: "1",
          SentTimestamp: "1523232000000",
          SenderId: "123456789012",
          ApproximateFirstReceiveTimestamp: "1523232000001"
        },
        MessageAttributes: {
          RiderID: {
            DataType: "String",
            StringValue: "1"
          },
          AccessToken: {
            DataType: "String",
            StringValue: "cc9f604fea151a90af181784c24a59e836c349bc"
          }
        },
        MessageBody: "RiderID 1 has requested an activity update from Strava",
        md5OfBody: "{{{md5_of_body}}}",
        eventSource: "aws:sqs",
        eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
        awsRegion: "us-east-1"
      }
    ]
};

const twoRiderEvent =  {
    Records: [
      {
        messageId: "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
        receiptHandle: "MessageReceiptHandle",
        body: "Hello from SQS!",
        attributes: {
          ApproximateReceiveCount: "1",
          SentTimestamp: "1523232000000",
          SenderId: "123456789012",
          ApproximateFirstReceiveTimestamp: "1523232000001"
        },
        MessageAttributes: {
          RiderID: {
            DataType: "String",
            StringValue: "1"
          },
          AccessToken: {
            DataType: "String",
            StringValue: "cc9f604fea151a90af181784c24a59e836c349bc"
          }
        },
        MessageBody: "RiderID 1 has requested an activity update from Strava",
        md5OfBody: "{{{md5_of_body}}}",
        eventSource: "aws:sqs",
        eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
        awsRegion: "us-east-1"
      },
      {
        messageId: "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
        receiptHandle: "MessageReceiptHandle",
        body: "Hello from SQS!",
        attributes: {
          ApproximateReceiveCount: "1",
          SentTimestamp: "1523232000000",
          SenderId: "123456789012",
          ApproximateFirstReceiveTimestamp: "1523232000001"
        },
        MessageAttributes: {
          RiderID: {
            DataType: "String",
            StringValue: "2"
          },
          AccessToken: {
            DataType: "String",
            StringValue: "cc9f604fea151a90af181784c24a59e836c349bc"
          }
        },
        MessageBody: "RiderID 1 has requested an activity update from Strava",
        md5OfBody: "{{{md5_of_body}}}",
        eventSource: "aws:sqs",
        eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
        awsRegion: "us-east-1"
      }
    ]
};

const duplicatedRiderEvent =  {
    Records: [
      {
        messageId: "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
        receiptHandle: "MessageReceiptHandle",
        body: "Hello from SQS!",
        attributes: {
          ApproximateReceiveCount: "1",
          SentTimestamp: "1523232000000",
          SenderId: "123456789012",
          ApproximateFirstReceiveTimestamp: "1523232000001"
        },
        MessageAttributes: {
          RiderID: {
            DataType: "String",
            StringValue: "1"
          },
          AccessToken: {
            DataType: "String",
            StringValue: "cc9f604fea151a90af181784c24a59e836c349bc"
          }
        },
        MessageBody: "RiderID 1 has requested an activity update from Strava",
        md5OfBody: "{{{md5_of_body}}}",
        eventSource: "aws:sqs",
        eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
        awsRegion: "us-east-1"
      },
      {
        messageId: "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
        receiptHandle: "MessageReceiptHandle",
        body: "Hello from SQS!",
        attributes: {
          ApproximateReceiveCount: "1",
          SentTimestamp: "1523232000000",
          SenderId: "123456789012",
          ApproximateFirstReceiveTimestamp: "1523232000001"
        },
        MessageAttributes: {
          RiderID: {
            DataType: "String",
            StringValue: "1"
          },
          AccessToken: {
            DataType: "String",
            StringValue: "cc9f604fea151a90af181784c24a59e836c349bc"
          }
        },
        MessageBody: "RiderID 1 has requested an activity update from Strava",
        md5OfBody: "{{{md5_of_body}}}",
        eventSource: "aws:sqs",
        eventSourceARN: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
        awsRegion: "us-east-1"
      }
    ]
};

const noRiderEvent =  {
    Records: [
      {
        messageId: "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
        receiptHandle: "MessageReceiptHandle",
        body: "Hello from SQS!",
        attributes: {
          ApproximateReceiveCount: "1",
          SentTimestamp: "1523232000000",
          SenderId: "123456789012",
          ApproximateFirstReceiveTimestamp: "1523232000001"
        }
      }
    ]
};

describe("getRidersFromEvent basic tests", () => {
  test("getRidersFromEvent exists and can be called", () => {
    expect(typeof getRidersFromEvent).toBe("function");
  });
  test("getRidersFromEvent returns empty array when called with no parameters", async () => {
    const actual = await getRidersFromEvent();
    expect( Array.isArray(actual) && actual.length === 0 ).toBe(true);
  });

  test("getRidersFromEvent returns empty array when called with an undefined event and missing docClient", async () => {
    const actual = await getRidersFromEvent(undefined);
    expect( Array.isArray(actual) && actual.length === 0 ).toBe(true);
  });

  test("getRidersFromEvent returns empty array when called with an undefined event and undefined docClient", async () => {
    const actual = await getRidersFromEvent(undefined, undefined);
    expect( Array.isArray(actual) && actual.length === 0 ).toBe(true);
  });
});

describe("getRidersFromEvent realistic functional tests with SQS queue events", () => {
    test("getRidersFromEvent returns a single rider from an event with only a single rider", async () => {
      const actual = await getRidersFromEvent(singleRiderEvent);
      expect( Array.isArray(actual) && actual.length === 1 ).toBe(true);
    });

    test("getRidersFromEvent returns a 2 riders from an event with 2 distinct riders", async () => {
        const actual = await getRidersFromEvent(twoRiderEvent);
        expect( Array.isArray(actual) && actual.length === 2 ).toBe(true);
        expect( actual.includes("1") ).toBe(true);
        expect( actual.includes("2") ).toBe(true);
    });

    test("getRidersFromEvent returns a 1 rider from an event with 2 riders with the same riderID", async () => {
        const actual = await getRidersFromEvent(duplicatedRiderEvent);
        expect( Array.isArray(actual) && actual.length === 1 ).toBe(true);
        expect( actual.includes("1") ).toBe(true);
    });
});
