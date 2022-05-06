const isValidAccessToken = accessToken => typeof accessToken === 'string' && accessToken.trim().length > 0;

exports.isValidAccessToken = isValidAccessToken;