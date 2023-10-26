// import { MongoClient } from "mongodb";
// import User from "../mongodb/models/user.js";
// import mongoose from "mongoose";

// // // Connect to MongoDB
// // mongoose
// //   .connect(process.env.MONGODB_URL, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => {
// //     console.log("Connected to MongoDB");
// //   })
// //   .catch((error) => {
// //     console.error("Error connecting to MongoDB:", error);
// //   });

// const createUser = async (req, res) => {
//   const { s_id } = req.body;

//   // const form = new User({
//   //   s_id: req.body.s_id,
//   //   dp: req.body.photo,
//   // });

//   const client = new MongoClient(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     await client.connect();
//     const users = client.db("test").collection("users");

//     const result = await users.insertOne({ s_id });

//     res
//       .status(201)
//       .json({
//         message: "User created successfully",
//         userId: result.insertedId,
//       });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Failed to create user" });
//   } finally {
//     await client.close();
//   }

//   // try {
//   //   await form.save();
//   //   res.status(200).send("User data saved to database");
//   //   console.log("Saved to db");
//   // } catch (error) {
//   //   console.error("Error creating user:", error);
//   //   res.status(500).send("Failed to create user");
//   // }
// };

// const getUser = async (req, res) => {
//   const s_id = req.params.id;

//   try {
//     const user = await User.findById(s_id);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     const { dp } = user;
//     res.status(200).json({ dp });
//   } catch (error) {
//     console.error("Error retrieving user:", error);
//     res.status(500).send("Failed to retrieve user");
//   }
// };

// const deleteUser = async (req, res) => {};

// export { createUser, getUser, deleteUser };
