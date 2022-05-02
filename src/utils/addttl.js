const addttl = (obj) => {
  if (typeof obj !== "object") return {};

  if ("ttl" in obj) return Object.assign({}, obj);
  const offset = 3 * 24 * 60 * 60 * 1000;
  return Object.assign({}, obj, { ttl: Date.now() + offset });
};

exports.addttl = addttl;
