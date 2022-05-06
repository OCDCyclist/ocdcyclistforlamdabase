const { getHistoricalRiderIDYearMonthFromEvent } = require("../src/getHistoricalRiderIDYearMonthFromEvent");

const singleRiderYearMonthEvent =  {
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
          Year: {
            DataType: "Number",
            StringValue: "2022"
          },
          Month: {
            DataType: "Number",
            StringValue: "1"
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

const twoRiderYearMonthEvent =  {
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
          Year: {
            DataType: "Number",
            StringValue: "2022"
          },
          Month: {
            DataType: "Number",
            StringValue: "1"
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
          Year: {
            DataType: "Number",
            StringValue: "2022"
          },
          Month: {
            DataType: "Number",
            StringValue: "2"
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

const duplicatedRiderYearMonthEvent =  {
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
          Year: {
            DataType: "Number",
            StringValue: "2022"
          },
          Month: {
            DataType: "Number",
            StringValue: "2"
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
          Year: {
            DataType: "Number",
            StringValue: "2022"
          },
          Month: {
            DataType: "Number",
            StringValue: "2"
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

const noRiderYearMonthEvent =  {
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

describe("getHistoricalRiderIDYearMonthFromEvent basic tests", () => {
  test("getHistoricalRiderIDYearMonthFromEvent exists and can be called", () => {
    expect(typeof getHistoricalRiderIDYearMonthFromEvent).toBe("function");
  });
  test("getHistoricalRiderIDYearMonthFromEvent returns empty array when called with no parameters", async () => {
    const actual = getHistoricalRiderIDYearMonthFromEvent();
    expect( Array.isArray(actual) && actual.length === 0 ).toBe(true);
  });
});

describe("getHistoricalRiderIDYearMonthFromEvent realistic functional tests with SQS queue events", () => {
  test("getHistoricalRiderIDYearMonthFromEvent returns a single rider, year, and month for an event with only a single rider, year, and month", async () => {
    const actual = getHistoricalRiderIDYearMonthFromEvent(singleRiderYearMonthEvent);
    expect( Array.isArray(actual) && actual.length === 1 ).toBe(true);
    expect(actual.some( obj => obj.RiderID === "1" && obj.Year === 2022 && obj.Month === 1)).toBe(true);
  });

  test("getHistoricalRiderIDYearMonthFromEvent returns two rider, year, and month for an event with two rider, year, and month", async () => {
    const actual = getHistoricalRiderIDYearMonthFromEvent(twoRiderYearMonthEvent);
    expect( Array.isArray(actual) && actual.length === 2 ).toBe(true);
    expect(actual.some( obj => obj.RiderID === "1" && obj.Year === 2022 && obj.Month === 1)).toBe(true);
    expect(actual.some( obj => obj.RiderID === "1" && obj.Year === 2022 && obj.Month === 2)).toBe(true);
  });

  test("getHistoricalRiderIDYearMonthFromEvent returns one rider, year, and month for an event with duplicate rider, year, and month", async () => {
    const actual = getHistoricalRiderIDYearMonthFromEvent(duplicatedRiderYearMonthEvent);
    expect( Array.isArray(actual) && actual.length === 1 ).toBe(true);
    expect(actual.some( obj => obj.RiderID === "1" && obj.Year === 2022 && obj.Month === 2)).toBe(true);
  });
  test("getHistoricalRiderIDYearMonthFromEvent returns an empty array an event with no rider, year, and month", async () => {
    const actual = getHistoricalRiderIDYearMonthFromEvent(noRiderYearMonthEvent);
    expect( Array.isArray(actual) && actual.length === 0 ).toBe(true);
  });
});
