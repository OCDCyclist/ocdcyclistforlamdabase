const checkBuckets = (aws) => {
  // Create S3 service object
  const s3 = new aws.S3({ apiVersion: "2006-03-01" });

  // Call S3 to list the buckets
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", JSON.stringify(data.Buckets));

      // Create the parameters for calling listObjects
      var bucketParams = {
        Bucket: "ocdcyclist",
      };

      // Call S3 to obtain a list of the objects in the bucket
      s3.listObjects(bucketParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          const recentRidesFolder = data.Contents.filter( obj => obj.Key === "RecentRides/");
          if( recentRidesFolder.length === 0 ){
            console.log(`RecentRides key does not exist in the bucket ${bucketParams.Bucket}:`);
          }
          else{
            console.log(`RecentRides key exists in the bucket ${bucketParams.Bucket}:`);
          }
        }
      });
    }
  });
};

exports.checkBuckets = checkBuckets;
