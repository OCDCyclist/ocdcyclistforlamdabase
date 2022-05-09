const { getRidesFromEvent } = require("../src/getRidesFromEvent");

const singleRideEvent =  {
    Records: [
      {
        messageAttributes: {
          RiderID: {
            dataType: "String",
            stringValue: "1"
          },
          id: {
            dataType: "Number",
            stringValue: "123"
          }
        }
      }
    ]
};

const twoRideEvent =  {
    Records: [
      {
        messageAttributes: {
          RiderID: {
            dataType: "String",
            stringValue: "1"
          },
          id: {
            dataType: "Number",
            stringValue: "123"
          }
        }
      },
      {
        messageAttributes: {
          RiderID: {
            dataType: "String",
            stringValue: "2"
          },
          id: {
            dataType: "Number",
            stringValue: "234"
          }
        }
      }
    ]
};

const duplicatedRideEvent =  {
    Records: [
      {
        messageAttributes: {
          RiderID: {
            dataType: "String",
            stringValue: "2"
          },
          id: {
            dataType: "Number",
            stringValue: "234"
          }
        }
      },
      {
        messageAttributes: {
          RiderID: {
            dataType: "String",
            stringValue: "2"
          },
          id: {
            dataType: "Number",
            stringValue: "234"
          }
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

