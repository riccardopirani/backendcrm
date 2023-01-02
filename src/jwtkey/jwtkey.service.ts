import appConfig from "../config/app.config";

export const jwtkey = appConfig.jwt.secretKey;
export const expiresIn = appConfig.jwt.maxAge;
