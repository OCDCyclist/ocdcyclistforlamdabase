
const createRides = aws => {
  // Create the DynamoDB service object
  const ddb = new aws.DynamoDB({ apiVersion: "2012-08-10" });

  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "RiderID",
        AttributeType: "S",
      },
      {
        AttributeName: "id",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "RiderID",
        KeyType: "HASH",
      },
      {
        AttributeName: "id",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "Rides",
    StreamSpecification: {
      StreamEnabled: false,
    },
  };

  // Call DynamoDB to create the table
  ddb.createTable(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Table Created", data);
    }
  });
};

exports.createRides = createRides;