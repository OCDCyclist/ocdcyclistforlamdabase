const populateRides = aws => {
  // Create the DynamoDB service object
  var ddb = new aws.DynamoDB({ apiVersion: "2012-08-10" });

  var params = {
    TableName: "Rides",
    Item: {
      RiderID: { S: "1" },
      id: { N: 7015389653 }
    }
  };

  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};

exports.populateRides = populateRides;
