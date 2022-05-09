const addAccessToken = (activity, accesstoken) => {
    if (typeof activity !== "object") return {};
    if (typeof accesstoken !== "string")
      return Object.assign({}, activity);
  
    if ("accesstoken" in activity) return Object.assign({}, activity);
  
    return Object.assign({}, activity, { accesstoken: accesstoken });
  };
  
  exports.addAccessToken = addAccessToken;
  