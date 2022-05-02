const uploadToS3Bucket= async (riderID, recentRides, s3) => {

  const uploadParams = {
    Bucket: "ocdcyclist",
    Key: `RecentRides/${riderID}.T${Date.now()}.json`,
    Body: JSON.stringify(recentRides),
  };

  return await s3.upload(uploadParams).promise()
    .then( data =>{
      console.log(`RecentRides saved to ${data.Bucket}/${data.key}`);
      return true;
    })
    .catch( err =>{
      console.log(`Error in uploadToBucketFolderAndPingSQS for RiderID:${riderID} for ${uploadParams.Bucket}/${uploadParams.Key}: ${err.message}` );
      return false;
    });
};

exports.uploadToS3Bucket = uploadToS3Bucket;
