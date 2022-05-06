const fetch = require("node-fetch");
const {addRiderID} = require("./utils/addRiderID");
const {epochTimestamp} = require("./utils/epochTimestamp");
const {isValidAccessToken} = require("./utils/isValidAccessToken");
const {isValidRiderIDYearMonth} = require("./utils/isValidRiderIDYearMonth");

const getHistoricalRidesFromStrava = async (historialRiderIDYearMonth, accesstoken) => {
  if( !isValidRiderIDYearMonth( historialRiderIDYearMonth) ) return [];
  if( !isValidAccessToken( accesstoken) ) return [];

  const epochTimes = epochTimestamp( historialRiderIDYearMonth.Year, historialRiderIDYearMonth.Month);

  const historicalRides = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${epochTimes.startEpoch}&before=${epochTimes.endEpoch}&per_page=200&access_token=${accesstoken}`)
    .then((res) => res.json())
    .then((historicalRidesFromStrava) => historicalRidesFromStrava.map((historicalride) => addRiderID(historicalride, historialRiderIDYearMonth.RiderID)))
    .catch((err) => console.log(err.message));

  if (!Array.isArray(historicalRides)) {
    console.log( `Unable to retrieve historial rides for RiderID = ${riderID}` );
    return [];
  }

  return historicalRides;
};

exports.getHistoricalRidesFromStrava = getHistoricalRidesFromStrava;

/*
"https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]"
*/



