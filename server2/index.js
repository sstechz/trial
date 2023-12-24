import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import users from "./mongodb/models/user.js";
import badmintonChats from "./mongodb/models/chat/badmintonChat.js";
import cricketChats from "./mongodb/models/chat/cricketChat.js";
import footballChats from "./mongodb/models/chat/footballChat.js";
import basketballChats from "./mongodb/models/chat/basketballChat.js";
import tabletennisChats from "./mongodb/models/chat/tabletennisChat.js";

dotenv.config();

const app = express();
const PORT = 5100;

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(express.json({ limit: "100mb" }));

// -------------------------------------------

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

// --------------------------------------------------

app.get("/getDiscussions/:sport", async (req, res) => {
  const sport = req.params.sport;

  try {
    let chatModel;

    switch (sport) {
      case "Basketball":
        chatModel = basketballChats;
        break;
      case "Table_Tennis":
        chatModel = tabletennisChats;
        break;
      case "Football":
        chatModel = footballChats;
        break;
      case "Cricket":
        chatModel = cricketChats;
        break;
      case "Badminton":
        chatModel = badmintonChats;
        break;
      default:
        throw new Error("Invalid sport name");
    }

    const chats = await chatModel
      .find({})
      .select("-_id author message time")
      .lean();

    if (chats.length > 0) {
      // Add the additional 'room' field to each chat
      const chatsWithRoom = chats.map(({ ...chat }) => ({
        ...chat,
        room: sport,
      }));

      // console.log(chatsWithRoom);
      res.json({ chat: chatsWithRoom });
    } else {
      res.json({ chat: [] });
    }
  } catch (error) {
    console.error("Error retrieving chats:", error);
    throw error;
  }
});

// ---------------------------------------------------

app.post("/discussions", async (req, res) => {
  const { author, message, room, time } = req.body;
  const sport = room;

  if (sport === "Basketball") {
    const newBasketBallChat = new basketballChats({
      author: author,
      message: message,
      time: time,
    });

    try {
      await newBasketBallChat.save();
      res.status(201).json({ message: "BasketBallChat saved in MongoDB!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving chats in MongoDB!" });
    }
  } else if (sport === "Table_Tennis") {
    const newTableTennisChat = new tabletennisChats({
      author: author,
      message: message,
      time: time,
    });

    try {
      await newTableTennisChat.save();
      res.status(201).json({ message: "TableTennisChat saved in MongoDB!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving chats in MongoDB!" });
    }
  } else if (sport === "Football") {
    const newFootballChat = new footballChats({
      author: author,
      message: message,
      time: time,
    });

    try {
      await newFootballChat.save();
      res.status(201).json({ message: "FootballChat saved in MongoDB!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving chats in MongoDB!" });
    }
  } else if (sport === "Cricket") {
    const newCricketChat = new cricketChats({
      author: author,
      message: message,
      time: time,
    });

    try {
      await newCricketChat.save();
      res.status(201).json({ message: "CricketChat saved in MongoDB!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving chats in MongoDB!" });
    }
  } else if (sport === "Badminton") {
    const newBadmintonChat = new badmintonChats({
      author: author,
      message: message,
      time: time,
    });

    try {
      await newBadmintonChat.save();
      res.status(201).json({ message: "BadmintonChat saved in MongoDB!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving chats in MongoDB!" });
    }
  }
});

// ------------------------------------------------------

app.post("/upload", async (req, res) => {
  const { base64Data, id } = req.body;

  // Assuming you have a User model for storing images in the database
  const newUser = new users({ dp: base64Data, s_id: id });

  // console.log(base64Data);

  try {
    await newUser.save();
    res.status(201).json({ message: "Image saved in MongoDB!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving image in MongoDB", error });
  }
});

//  --------------------------------------------------------
//  Accessing dp of players
app.get("/dp/:id", async (req, res) => {
  const s_id = req.params.id;

  try {
    const user = await users.findOne({ s_id });

    // If user with the given 's_id' is found, send the 'dp' in the response
    if (user) {
      res.json({ dp: user.dp });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

// ----------------------------------------------------------

app.post("/find", async (req, res) => {
  const { id } = req.body;

  try {
    // Assuming you have a User model for storing images in the database
    const user = await users.findOne({ s_id: id });

    if (user) {
      const base64Data = user.dp;
      res.status(200).json({ base64Data });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving image from MongoDB", error });
  }
});

app.all("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.");
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const startServer = async () => {
  const PORT = process.env.PORT || 5100;
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(PORT, () =>
      console.log(`Server started on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
