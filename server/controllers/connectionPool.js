import mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.PHP_HOST,
  user: process.env.PHP_USER,
  password: process.env.PHP_PASSWORD,
  database: process.env.PHP_DATABASE,
  connectionLimit: 2000, // Maximum number of connections in the pool
  acquireTimeout: 600000, // 10mins Maximum time (in milliseconds) to wait for a connection
});

export const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (error, results, fields) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};
