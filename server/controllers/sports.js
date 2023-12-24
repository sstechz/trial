import mysql from "mysql";
import * as dotenv from "dotenv";
import { executeQuery } from "./connectionPool.js";

dotenv.config();

//  ------------------------------------------------------------------
//  Access Sports Name & Timings
export const getSports = async (req, res) => {
  try {
    const gameTitleQuery = "SELECT sports FROM sport";
    const gameTimeQuery = "SELECT time FROM sport";

    const gameTitleResults = await executeQuery(gameTitleQuery);
    const gameTimeResults = await executeQuery(gameTimeQuery);

    // Extract values from the results
    const gameTitle = gameTitleResults.map((result) => result.sports);
    const gameTime = gameTimeResults.map((result) => result.time);

    // Response object for both the arrays
    const response = {
      sports: gameTitle,
      time: gameTime,
    };

    res.send(response);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
};

// --------------------------------------------------------------------------
//  Access equipments, venue, players
export const getDetails = async (req, res) => {
  const sport = req.params.sports;

  const equipmentMap = {
    Badminton: {
      Rackets: "badminton_rackets",
      Shuttles: "shuttle_cocks",
      Net: "badminton_net",
    },
    Basketball: {
      Basketballs: "basket_ball",
    },
    Cricket: {
      Balls: "cricket_ball",
      Bats: "cricket_bat",
      Stumps: "stumps",
      Bails: "bails",
    },
    Football: {
      Footballs: "foot_ball",
      Goalkeeper_Gloves: "goalkeeper_gloves",
    },
    Table_Tennis: {
      Tables: "tt_table",
      Rackets: "tt_rackets",
      Nets: "tt_net",
      Balls: "tt_ball",
    },
  };

  const equipment = equipmentMap[sport];

  const query = `SELECT ${Object.values(equipment).join(
    ", "
  )}, amount, place, time FROM sport WHERE sports=?`;

  try {
    const results = await executeQuery(query, [sport]);

    if (results.length === 0) {
      res.status(404).send("Sport not found");
      return;
    }

    const details = {
      equipments: {},
      Fee: results[0].amount,
      Venue: results[0].place,
      Time: results[0].time,
    };

    Object.keys(equipment).forEach((key, index) => {
      details.equipments[key] = results[0][Object.values(equipment)[index]];
    });

    res.send(details);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Error executing query");
  }
};
