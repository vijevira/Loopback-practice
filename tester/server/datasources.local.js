const dbType = process.env.DB_TYPE;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const usrNm = process.env.DB_USER;
const pwd = process.env.DB_PWD;
const schma = process.env.DB_SCHEMA || null;
const connTimeout = process.env.CONN_TIMEOUT;
const maxDbConnPool = process.env.MAXDB_CONN ? parseInt(process.env.MAXDB_CONN) : 20;
const minDbConnPool = process.env.MINDB_CONN ? parseInt(process.env.MINDB_CONN) : 1;
const poolTimeout = process.env.POOL_TIMEOUT ? parseInt(process.env.POOL_TIMEOUT) : 30;

const pgConfig = {
  "db": {
    "name": "db",
    "host": dbHost,
    "port": dbPort,
    "url": "postgres://" + usrNm + ":" + pwd + "@" + dbHost + ":" + dbPort + "/" + dbName,
    "database": dbName,
    "schema": schma,
    "user": usrNm,
    "password": pwd,
    "connector": "oe-connector-postgresql",
    "connectionTimeout": connTimeout,
    "min": minDbConnPool,
    "max": maxDbConnPool,
    "idleTimeoutMillis": poolTimeout
  }
};

const commonDs = {
  "transient": {
    "name": "transient",
    "connector": "transient"
  }
};

if (dbType.toUpperCase() === "POSTGRESQL") {
  const pgDs = Object.assign({}, pgConfig, commonDs);
  module.exports = pgDs;
}
