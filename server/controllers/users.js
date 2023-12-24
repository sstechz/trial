import mysql from "mysql";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { executeQuery } from "./connectionPool.js";

dotenv.config();

//  ---------------------------------------------------------
//  Access Registered Sports
export const registeredSports = async (req, res) => {
  const userId = req.params.id;

  const Query =
    "SELECT CASE WHEN Badminton <> '0000-00-00' THEN Badminton END AS Badminton, CASE WHEN Cricket <> '0000-00-00' THEN Cricket END AS Cricket, CASE WHEN Basketball <> '0000-00-00' THEN Basketball END AS Basketball, CASE WHEN Football <> '0000-00-00' THEN Football END AS Football, CASE WHEN Table_Tennis <> '0000-00-00' THEN Table_Tennis END AS Table_Tennis FROM student WHERE s_id = ?";

  try {
    const results = await executeQuery(Query, [userId]);

    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      const user = results[0];
      res.send(user);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
};

//  --------------------------------------------------------
//  Access all users
export const getUsers = async (req, res) => {
  const Query = "SELECT * FROM student";

  try {
    const results = await executeQuery(Query);

    res.send(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
};

//  ---------------------------------------------------------
//  Access unique user (with ID)
export const getUser = async (req, res) => {
  const userId = req.params.id;

  const Query = "SELECT * from student WHERE s_id = ?";

  try {
    const results = await executeQuery(Query, [userId]);

    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      const user = results[0];
      res.send(user);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
};

//  ----------------------------------------------------------
//  Create unique user record (signup)
export const createUser = async (req, res) => {
  const { s_id, password, name, email, branch } = req.body;

  const userData = {
    s_id,
    password,
    name,
    email,
    branch,
  };

  const Query = "INSERT INTO student SET ?";

  try {
    const results = await executeQuery(Query, userData);
    console.log(`User with ID : ${s_id} added !`, results);
    res.send(`ID : ${s_id} added successfully !`);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Error executing query !");
  }
};

//  ----------------------------------------------------------
//  Delete existing user account
export const deleteUser = async (req, res) => {
  const userId = req.body.id;

  const Query = "DELETE FROM student WHERE s_id = ?";

  try {
    const results = await executeQuery(Query, [userId]);
    console.log(`User with ID : ${userId} deleted !`, results);
    res.send(`ID : ${userId} deleted successfully !`);
  } catch (error) {
    console.error("Error deleting student record: ", error);
    res.status(500).send("Error deleting student record");
  }
};

//  ----------------------------------------------------------
//  Authenticate user during signin (ID, Password)
export const authUser = async (req, res) => {
  const { s_id, password } = req.body;

  const Query = "SELECT * FROM student WHERE s_id = ? AND password = ?";

  try {
    const results = await executeQuery(Query, [s_id, password]);

    if (results.length > 0) {
      const user = results[0];

      const payload = {
        s_id: user.s_id,
        name: user.name,
      };

      const secretKey = process.env.JWT_SECRET_KEY;

      const token = jwt.sign(payload, secretKey, {
        expiresIn: "1h",
      });

      res.send({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).send("Error executing query");
  }
};

//  ----------------------------------------------------------
//  Player ID's of corresponding game
export const getIDs = async (req, res) => {
  const value = req.params.sports;

  //  Double (??) is used to represent that value is a column name
  const Query = "SELECT s_id FROM student WHERE ?? <> '0000-00-00';";

  try {
    const results = await executeQuery(Query, [value]);

    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      const playerIds = results.map((user) => user.s_id);
      res.send(playerIds);
    }
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).send("Error executing query");
  }
};

//  -----------------------------------------------------------
//  Players details for Banner (dp)
export const getBanner = async (req, res) => {
  const userId = req.params.id;

  const Query = "SELECT s_id, name, branch FROM student WHERE s_id = ?";

  try {
    const results = await executeQuery(Query, [userId]);

    if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      const user = results[0];
      res.send(user);
    }
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).send("Error executing query.");
  }
};
