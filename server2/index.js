import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import users from "./mongodb/models/user.js";

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

// app.post("/uploads", async (req, res) => {
//   const { myFile } = req.body;

//   const form = new users({
//     myFile: myFile,
//   });

//   // const client = new MongoClient(process.env.MONGODB_URL, {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true,
//   // });

//   try {
//     // await client.connectDB();

//     // const newImage = await users.create({ myFile });

//     // const newImage = new users({ myFile: myFile });

//     form.save({ timeout: 30000 });
//     console.log("Saved to DB");
//     res.status(201).json({ message: "New image uploaded...!" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

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
    res.status(500).json({ message: "Error retrieving image from MongoDB", error });
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
