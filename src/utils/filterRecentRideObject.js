const { pick } = require('./pick');

const filterRecentRideObject = (activity, newOrRefreshArg, fieldList) => {
  if (typeof activity !== "object") return {};

  const newOrRefresh =
    typeof newOrRefreshArg === "string" &&
    newOrRefreshArg.trim().toLowerCase() === "new"
      ? "new"
      : "refresh";

  if (!Array.isArray(fieldList)) return {};

  const array =
    newOrRefresh === "new"
      ? fieldList
      : fieldList.filter((obj) => obj.type === "key" || obj.type === "refresh");

  return pick(
    activity,
    array.map((obj) => obj.name)
  );
};

exports.filterRecentRideObject = filterRecentRideObject;
