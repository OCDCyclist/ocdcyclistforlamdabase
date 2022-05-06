const fetch = require("node-fetch");
const { addRiderID } = require("./utils/addRiderID");

const getRideDetailStrava = async (ride, accesstoken) => {
  const rideDetail = await fetch(`https://www.strava.com/api/v3/activities/${ride.id}?access_token=${accesstoken}`)
    .then((res) => res.json())
    .then((rideDetailFromStrava) => addRiderID(rideDetailFromStrava, ride.RiderID))
    .catch((err) => console.log(err.message));

  if ( !rideDetail) {
    console.log( `Unable to retrieve recent rides for ${JSON.stringify(ride)} using ${accesstoken}` );
    return undefined;
  }

  return rideDetail;
};

exports.getRideDetailStrava = getRideDetailStrava;
