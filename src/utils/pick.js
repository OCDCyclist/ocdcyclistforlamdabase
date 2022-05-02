const pick = (obj, arrayOfNamesToKeep) => {
  const copyToReturn = {};
  if (typeof obj !== "object") return copyToReturn;
  if( !Array.isArray(arrayOfNamesToKeep) || arrayOfNamesToKeep.length === 0) return copyToReturn;

  const keys = Object.keys(obj);
  keys.forEach( key => {
    if (arrayOfNamesToKeep.includes(key) ) {
      copyToReturn[key] = obj[key];
    }
  });

  return copyToReturn;
};

exports.pick = pick;
