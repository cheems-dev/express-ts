import { createPool, Pool } from "mysql2/promise";

export async function connect(): Promise<Pool> {
  const connection = await createPool({
    host: "localhost",
    user: "davaria",
    password: "!1eam0anikA",
    database: "node_mysql_ts",
    connectionLimit: 10,
  });

  return connection;
}
