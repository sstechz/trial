import mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

//  ------------------------------------------------------------------
//  Access Sports Name & Timings  
export const getSports = (req, res) => {
  const gameTitle = [];
  const gameTime = [];

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query = "SELECT sports FROM sport";
  const Query2 = "SELECT time FROM sport";

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
      //  store the query results in an empty array
      gameTitle.push(...results.map((result) => result.sports));

      return executeQuery(Query2);
    })
    .then((results) => {
      //  store time values in array
      gameTime.push(...results.map((result) => result.time));

      //    response object for both the array
      const response = {
        sports: gameTitle,
        time: gameTime,
      };
      res.send(response);
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

// --------------------------------------------------------------------------
//  Access equipments, venue, players
export const getDetails = (req, res) => {
  const sport = req.params.sports;

  const Badminton = {
    equipments: {
      Rackets: "",
      Shuttles: "",
      Net: "",
    },
    Fee: "",
    Venue: "",
    Time: "",
  };

  const Basketball = {
    equipments: {
      Basketballs: "",
    },
    Fee: "",
    Venue: "",
    Time: "",
  };

  const Cricket = {
    equipments: {
      Balls: "",
      Bats: "",
      Stumps: "",
      Bails: "",
    },
    Fee: "",
    Venue: "",
    Time: "",
  };

  const Football = {
    equipments: {
      Footballs: "",
      Goalkeeper_Gloves: "",
    },
    Fee: "",
    Venue: "",
    Time: "",
  };

  const Table_Tennis = {
    equipments: {
      Rackets: "",
      Balls: "",
      Tables: "",
      Nets: "",
    },
    Fee: "",
    Venue: "",
    Time: "",
  };

  // const response = [Badminton, Basketball, Cricket, Football, Table_Tennis];

  const pool = mysql.createPool({
    host: process.env.PHP_HOST,
    user: process.env.PHP_USER,
    password: process.env.PHP_PASSWORD,
    database: process.env.PHP_DATABASE,
    connectionLimit: 2000,
  });

  const Query1 =
    "SELECT badminton_rackets, shuttle_cocks, badminton_net, amount, place, time FROM sport WHERE sports='Badminton'";

  const Query2 =
    "SELECT basket_ball, amount, place, time FROM sport WHERE sports='Basketball'";

  const Query3 =
    "SELECT cricket_ball, cricket_bat, stumps, bails, amount, place, time FROM sport WHERE sports='Cricket'";

  const Query4 =
    "SELECT foot_ball, goalkeeper_gloves, amount, place, time FROM sport WHERE sports='Football'";

  const Query5 =
    "SELECT tt_table, tt_rackets, tt_net, tt_ball, amount, place, time FROM sport WHERE sports='Table_Tennis'";

  const executeQuery = (Query) => {
    return new Promise((resolve, reject) => {
      pool.query(Query, (error, results, fields) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  };

  if (sport == "Badminton") {
    executeQuery(Query1)
      .then((results) => {
        const {
          badminton_rackets,
          shuttle_cocks,
          badminton_net,
          amount,
          place,
          time,
        } = results[0];

        Badminton.equipments.Rackets = badminton_rackets;
        Badminton.equipments.Shuttles = shuttle_cocks;
        Badminton.equipments.Net = badminton_net;
        Badminton.Fee = amount;
        Badminton.Venue = place;
        Badminton.Time = time;

        res.send(Badminton);
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
  } else if (sport == "Cricket") {
    executeQuery(Query3)
      .then((results) => {
        const {
          cricket_ball,
          cricket_bat,
          stumps,
          bails,
          amount,
          place,
          time,
        } = results[0];

        Cricket.equipments.Balls = cricket_ball;
        Cricket.equipments.Bats = cricket_bat;
        Cricket.equipments.Stumps = stumps;
        Cricket.equipments.Bails = bails;
        Cricket.Fee = amount;
        Cricket.Venue = place;
        Cricket.Time = time;

        res.send(Cricket);
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
  } else if (sport == "Basketball") {
    executeQuery(Query2)
      .then((results) => {
        const { basket_ball, amount, place, time } = results[0];

        Basketball.equipments.Basketballs = basket_ball;
        Basketball.Fee = amount;
        Basketball.Venue = place;
        Basketball.Time = time;

        res.send(Basketball);
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
  } else if (sport == "Football") {
    executeQuery(Query4)
      .then((results) => {
        const { foot_ball, goalkeeper_gloves, amount, place, time } =
          results[0];

        Football.equipments.Footballs = foot_ball;
        Football.equipments.Goalkeeper_Gloves = goalkeeper_gloves;
        Football.Fee = amount;
        Football.Venue = place;
        Football.Time = time;

        res.send(Football);
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
  } else {
    executeQuery(Query5)
      .then((results) => {
        const { tt_table, tt_rackets, tt_net, tt_ball, amount, place, time } =
          results[0];

        Table_Tennis.equipments.Tables = tt_table;
        Table_Tennis.equipments.Rackets = tt_rackets;
        Table_Tennis.equipments.Nets = tt_net;
        Table_Tennis.equipments.Balls = tt_ball;
        Table_Tennis.Fee = amount;
        Table_Tennis.Venue = place;
        Table_Tennis.Time = time;

        res.send(Table_Tennis);
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
  }
};
