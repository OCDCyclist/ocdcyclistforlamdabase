const { getRidesFromEvent } = require("../src/getRidesFromEvent");

const singleRideEvent =  {
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
          id: {
            DataType: "Number",
            StringValue: "123"
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

const twoRideEvent =  {
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
          id: {
            DataType: "Number",
            StringValue: "123"
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
          id: {
            DataType: "Number",
            StringValue: "234"
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

const duplicatedRideEvent =  {
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
            StringValue: "2"
          },
          id: {
            DataType: "Number",
            StringValue: "234"
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
          id: {
            DataType: "Number",
            StringValue: "234"
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

const noRideEvent =  {
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

describe("getRidesFromEvent basic tests", () => {
  test("getRidesFromEvent exists and can be called", () => {
    expect(typeof getRidesFromEvent).toBe("function");
  });
  test("getRidesFromEvent returns empty array when called with no parameters", async () => {
    const actual = await getRidesFromEvent();
    expect( Array.isArray(actual) && actual.length === 0 ).toBe(true);
  });

  test("getRidesFromEvent returns empty array when called with an undefined event and missing docClient", async () => {
    const actual = await getRidesFromEvent(undefined);
    expect( Array.isArray(actual) && actual.length === 0 ).toBe(true);
  });

  test("getRidesFromEvent returns empty array when called with an undefined event and undefined docClient", async () => {
    const actual = await getRidesFromEvent(undefined, undefined);
    expect( Array.isArray(actual) && actual.length === 0 ).toBe(true);
  });
});

describe("getRidesFromEvent functional tests", () => {
  test("getRidesFromEvent returns one item for an event with one item", async () => {
    const actual = await getRidesFromEvent(singleRideEvent);
    expect( Array.isArray(actual) && actual.length === 1 ).toBe(true);
    expect( actual[0].RiderID).toBe("1")
    expect( actual[0].id).toBe("123")
  });

  test("getRidesFromEvent returns one item for an event with one item", async () => {
    const actual = await getRidesFromEvent(twoRideEvent);
    expect( Array.isArray(actual) && actual.length === 2 ).toBe(true);
    expect( actual[0].RiderID).toBe("1")
    expect( actual[0].id).toBe("123")
    expect( actual[1].RiderID).toBe("2")
    expect( actual[1].id).toBe("234")
  });

  test("getRidesFromEvent returns removes duplicate records in the event", async () => {
    const actual = await getRidesFromEvent(duplicatedRideEvent);
    expect( Array.isArray(actual) && actual.length === 1 ).toBe(true);
    expect( actual[0].RiderID).toBe("2")
    expect( actual[0].id).toBe("234")
  });
});

