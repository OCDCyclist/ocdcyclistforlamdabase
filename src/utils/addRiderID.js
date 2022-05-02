const addRiderID = (activity, riderID) => {
  if (typeof activity !== "object") return {};
  if (typeof riderID !== "string")
    return Object.assign({}, activity);

  if ("RiderID" in activity) return Object.assign({}, activity);

  return Object.assign({}, activity, { RiderID: riderID });
};

exports.addRiderID = addRiderID;
