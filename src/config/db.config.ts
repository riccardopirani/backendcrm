export default function (appConfig: any) {
  return {
    type: "mysql",
    host: appConfig.db.host,
    port: appConfig.db.port,
    username: appConfig.db.user,
    password: appConfig.db.psw,
    database: appConfig.db.databaseName,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: appConfig.debug,
    logging: appConfig.debug,
    timezone: "Z",
  };
}
