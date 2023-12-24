import mysql from "mysql";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { executeQuery } from "./connectionPool.js";

dotenv.config();

export const getUser = async (req, res) => {
  const { s_id, password } = req.body;

  const Query =
    "SELECT name FROM student WHERE s_id = ? AND password = ? LIMIT 1";

  try {
    const results = await executeQuery(Query, [s_id, password]);

    if (results.length === 0) {
      return res
        .status(401)
        .send("Invalid credentials, ID and Password are case sensitive");
    }

    const user = results[0];

    const payload = {
      s_id: user.s_id,
      name: user.name,
    };

    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(payload, secretKey, {
      expiresIn: "1h",
    });

    const response = {
      token: token,
      name: user.name,
    };

    res.send(response);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
};
