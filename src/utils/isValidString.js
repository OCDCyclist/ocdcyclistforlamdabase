const isValidString = val => typeof val === 'string' && val.trim().length > 0;

exports.isValidString = isValidString;