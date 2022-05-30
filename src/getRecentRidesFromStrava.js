const fetch = require("node-fetch");
const { addRiderID } = require("./utils/addRiderID");

const getRecentRidesFromStrava = async (riderID, accesstoken) => {
  const recentRides = await fetch(`https://www.strava.com/api/v3/activities?access_token=${accesstoken}`)
    .then((res) => res.json())
    .then((recentRidesFromStrava) =>{
      if( Array.isArray(recentRidesFromStrava) ){
        return recentRidesFromStrava.map( recentride => addRiderID(recentride, riderID) );
      }
      return [];
    })
    .catch((err) => console.log(err.message));

  if (!Array.isArray(recentRides)) {
    console.log( `Unable to retrieve recent rides for RiderID = ${riderID}` );
    return [];
  }

  return recentRides;
};

exports.getRecentRidesFromStrava = getRecentRidesFromStrava;
