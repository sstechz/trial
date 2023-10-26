import mysql from "mysql";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

//  ---------------------------------------------------------
//  Access Registered Sports
export const registeredSports = (req, res) => {
  const userId = req.params.id;

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query =
    "SELECT CASE WHEN Badminton <> '0000-00-00' THEN Badminton END AS Badminton, CASE WHEN Cricket <> '0000-00-00' THEN Cricket END AS Cricket, CASE WHEN Basketball <> '0000-00-00' THEN Basketball END AS Basketball, CASE WHEN Football <> '0000-00-00' THEN Football END AS Football, CASE WHEN Table_Tennis <> '0000-00-00' THEN Table_Tennis END AS Table_Tennis FROM student WHERE s_id = ?";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, [userId], (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  executeQuery(Query)
    .then((results) => {
      if (results.length === 0) {
        res.status(404).send("User not found");
      } else {
        const user = results[0];
        res.send(user);
      }
    })
    .catch((error) => {
      console.error("Error executing query:", error);
      return res.status(500).send("Error executing query");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) console.log("Error closing connection pool", error);
        else console.log("Connection pool closed");
      });
    });
};

//  --------------------------------------------------------
//  Access all users
export const getUsers = (req, res) => {
  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query = "SELECT * FROM student";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  executeQuery(Query)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error("Error executing query:", error);
      return res.status(500).send("Error executing query");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) console.log("Error closing connection pool", error);
        else console.log("Connection pool closed");
      });
    });
};

//  ---------------------------------------------------------
//  Access unique user (with ID)
export const getUser = (req, res) => {
  const userId = req.params.id;

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query = "SELECT * from student WHERE s_id = ?";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, [userId], (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  executeQuery(Query)
    .then((results) => {
      if (results.length === 0) {
        res.status(404).send("User not found");
      } else {
        const user = results[0];
        res.send(user);
      }
    })
    .catch((error) => {
      console.error("Error executing query: ", error);
      res.status(500).send("Error executing query.");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) {
          console.log("Error closing connection pool", error);
        } else {
          console.log("Connection pool closed");
        }
      });
    });
};

//  ----------------------------------------------------------
//  Create unique user record (signup)
export const createUser = (req, res) => {
  const { s_id, password, name, email, branch } = req.body;

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const userData = {
    s_id,
    password,
    name,
    email,
    branch,
  };

  const Query = "INSERT INTO student SET ?";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, userData, (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };

  executeQuery(Query)
    .then((results) => {
      console.log(`User with ID : ${s_id} added !`, results);
      res.send(`ID : ${s_id} added successfully !`);
    })
    .catch((error) => {
      console.error("Error executing query", error);
      res.status(500).send("Error executing query !");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) console.error("Error closing connection pool", error);
        else console.log("Connection pool closed");
      });
    });
};

//  ----------------------------------------------------------
//  Delete existing user account
export const deleteUser = (req, res) => {
  const userId = req.body.id;

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query = "DELETE FROM student WHERE s_id = ?";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, [userId], (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  executeQuery(Query)
    .then((results) => {
      console.log(`User with ID : ${userId} deleted !`, results);
      res.send(`ID : ${userId} deleted successfully !`);
    })
    .catch((error) => {
      console.error("Error deleting student record: ", error);
      res.status(500).send("Error deleting student record");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) console.error("Error closing connection pool", error);
        else console.log("Connection pool closed");
      });
    });
};

//  ----------------------------------------------------------
//  Authenticate user during signin (ID, Password)
export const authUser = (req, res) => {
  const { s_id, password } = req.body;

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query = "SELECT * FROM student WHERE s_id = ? AND password = ?";

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
    })
    .catch((error) => {
      console.error("Error executing query : ", error);
      res.status(500).send("Error  executing query");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) {
          console.log("Error closing connection pool", error);
        } else {
          console.log("Connection pool closed");
        }
      });
    });
};

//  ----------------------------------------------------------
//  Player ID's of corresponding game
export const getIDs = (req, res) => {
  const value = req.params.sports;

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  //  Double (??) is used to represent that value is a column name
  const Query = "SELECT s_id FROM student WHERE ?? <> '0000-00-00';";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, [value], (error, results, fields) => {
        if (error) reject(error);
        else {
          const playerIds = results.map((user) => user.s_id);
          resolve(playerIds);
        }
      });
    });
  };

  executeQuery(Query)
    .then((playerIds) => {
      if (playerIds.length === 0) {
        res.status(404).send("User not found");
      } else {
        res.send(playerIds);
      }
    })
    .catch((error) => {
      console.error("Error executing query : ", error);
      res.status(500).send("Error  executing query");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) {
          console.log("Error closing connection pool", error);
        } else {
          console.log("Connection pool closed");
        }
      });
    });
};

//  -----------------------------------------------------------
//  Players details for Banner (dp)
export const getBanner = (req, res) => {
  const userId = req.params.id;

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query = "SELECT s_id, name, branch FROM student WHERE s_id = ?";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, [userId], (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  executeQuery(Query)
    .then((results) => {
      if (results.length === 0) {
        res.status(404).send("User not found");
      } else {
        const user = results[0];
        res.send(user);
      }
    })
    .catch((error) => {
      console.error("Error executing query: ", error);
      res.status(500).send("Error executing query.");
    })
    .finally(() => {
      pool.end((error) => {
        if (error) {
          console.log("Error closing connection pool", error);
        } else {
          console.log("Connection pool closed");
        }
      });
    });
}
