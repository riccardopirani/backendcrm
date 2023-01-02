declare const appConfig: {
  appName: string;
  port: string;
  cors: string;
  baseURL: string;
  fileServiceEndPointUrl: string;
  fileEndpointBaseUrl: string;
  db: {
    rootPsw: string;
    user: string;
    psw: string;
    databaseName: string;
    host: string;
    port: number;
  };
  debug: boolean;
  nearitDebug: boolean;
  maxBodyLength: number;
  maxRedirects: number;
  encryption: {
    algorithm: string;
    key: string;
    enabled: boolean;
  };
  jwt: {
    secretKey: string;
    maxAge: number;
  };
  jwtRefresh: {
    secretKey: string;
    maxAge: number;
  };
  log: {
    maxDays: string;
    maxSize: string;
    fileName: string;
    level: string;
  };
  googleChat: {
    enabled: boolean;
    url: string;
  };
  swagger: {
    swaggerEnabled: boolean;
    swaggerPath: string;
    useStaticFile: boolean;
  };
};
export default appConfig;
