const flattenathleteobject = (activity, newOrRefreshArg) => {
  if (typeof activity !== "object") return {};

  if ("athlete" in activity === false) return Object.assign({}, activity);

  if (typeof activity.athlete === "object")
    return Object.assign({}, activity, { athlete: activity.athlete.id });
  else return Object.assign({}, activity);
};

exports.flattenathleteobject = flattenathleteobject;
