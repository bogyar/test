import mysql from "mysql2/promise";

import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pgpool = () => {
  try {
    return new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: true,
    });
  } catch (error) {
    return null;
  }
}

export const pool = pgpool();

export const excQueryReturnFirst = async <T>(
  query: string,
  values: any[]
): Promise<T> => {
  const result = await pool?.query(query, values);
  return result?.rows[0] || (null as any);
};
export const excQueryReturnMany = async <T>(
  query: string,
  values: any[]
): Promise<T[]> => {
  const result = await pool?.query(query, values);
  return (result?.rows || []) as any[];
};

try {
  pool?.on("connect", () => console.log("Connected to PostgreSQL database"));
} catch (error) {
  console.error("Error connecting to PostgreSQL database:", error);
}

let poolManager: mysql.Pool | null = null;

export const getMysqlPool = () => {
  // console.log(databaseName, "databaseName");

  if (!poolManager) {
    poolManager = mysql.createPool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      dateStrings: true,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      multipleStatements: true,
    });
  }
  return poolManager;
};

export const selectManyQuery = async <T>(
  queryString: string,
  variables: any[] = []
): Promise<T[]> => {
  let connection;
  try {
    // console.log(queryString);
    // console.log(variables);
    connection = await getMysqlPool().getConnection(); // Get a connection from the pool
    const [rows] = await connection.execute(queryString, variables);
    const records: any[] = rows as any[];
    return records;
  } catch (error) {
    console.error("Database query error:", error);
    return [];
  } finally {
    if (connection) connection.release();
  }
};
export const selectFirstQuery = async <T>(
  queryString: string,
  variables: any[] = [],
  mode: "READ" | "WRITE" = "READ"
): Promise<T> => {
  let connection;
  try {
    // console.log(queryString);
    // console.log(variables);
    connection = await getMysqlPool().getConnection(); // Get a connection from the pool
    debugger;
    const queryResult: any = await connection.query(queryString, variables);
    if (mode == "WRITE") {
      if (queryResult[0].affectedRows > 0) {
        return 1 as any;
      }
    }
    const rows = queryResult[0] as any[];;
    const record: any = rows.length > 0 ? rows[0] : null;
    return record;
  } catch (error) {
    console.error("Database query error:", error);
    return null as any;
  } finally {
    if (connection) connection.release();
  }
};
