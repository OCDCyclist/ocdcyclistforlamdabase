const getRecentRidesFromS3 = async (filename, s3) => {
    const params = {
      Bucket: "ocdcyclist",
      Key: filename
    };

    return await s3.getObject(params).promise()
        .then( result=>{
            const recentRides = result.Body.toString('utf-8');
            return JSON.parse(recentRides);
        })
        .catch( err =>{
            console.log(`Error retrieving ${filename} data: ${err.message}`);
            return [];
        });
  };

  exports.getRecentRidesFromS3 = getRecentRidesFromS3;
