      // Now ping the SQS RecentRide queue.
      const sqs = new aws.SQS({ apiVersion: "2012-11-05" });

      const params = {
        // Remove DelaySeconds parameter and value for FIFO queues
        DelaySeconds: 0,
        MessageAttributes: {
          RiderID: {
            DataType: "String",
            StringValue: `${riderID}`,
          },
          S3Key: {
            DataType: "String",
            StringValue: `${uploadParams.Key}`,
          },
        },
        MessageBody: `RiderID:${riderID} has recent ride data in ${uploadParams.Bucket}/${uploadParams.Key}`,
        QueueUrl:
          "https://sqs.us-west-2.amazonaws.com/085991549361/RecentRides",
      };

      return sqs.sendMessage(params).promise();
