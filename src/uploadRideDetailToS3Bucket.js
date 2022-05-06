const uploadRideDetailToS3Bucket= async (rideDetail, s3) => {

  const uploadParams = {
    Bucket: "ocdcyclist",
    Key: `RideDetail/${rideDetail.id}.json`,
    Body: JSON.stringify(rideDetail),
  };

  return await s3.upload(uploadParams).promise()
    .then( data =>{
      console.log(`RideDetail saved to ${data.Bucket}/${data.key}`);
      return true;
    })
    .catch( err =>{
      console.log(`Error in uploadToBucketFolderAndPingSQS for RiderID:${rideDetail.RiderID} for ${uploadParams.Bucket}/${uploadParams.Key}: ${err.message}` );
      return false;
    })
    .finally( ()=>{
      console.log('all done uploadRideDetailToS3Bucket');
    })
};

exports.uploadRideDetailToS3Bucket = uploadRideDetailToS3Bucket;
