import mysql from "mysql";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const getUser = (req, res) => {
  const { s_id, password } = req.body;

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query =
    "SELECT name FROM student WHERE s_id = ? AND password = ? LIMIT 1";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, [s_id, password], (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  executeQuery(Query)
    .then((results) => {
      if (results.length === 0)
        return res
          .status(401)
          .send("Invalid credentials, ID and Password are case sensitive");

      const user = results[0];

      const payload = {
        s_id: user.s_id,
        name: user.name,
      };

      const secretKey = process.env.JWT_SECRET_KEY;

      const token = jwt.sign(payload, secretKey, {
        expiresIn: '1h',
      });

      const response = {
        token: token,
        name: user.name,
      };

      return res.send(response);
    })
    .catch((error) => {
      console.log("Error executing query:", error);
      return res.status(500).send("Error executing query");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) console.log("Error closing connection pool", error);
        else console.log("Connection pool closed");
      });
    });
};
