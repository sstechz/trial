// It's important to note that the ESM syntax with import and export is not natively supported in Node.js without additional configuration. Starting from Node.js version 14, ESM can be enabled by using the --experimental-modules flag and specifying .mjs file extension for ESM files. However, for full ESM support without the experimental flag, Node.js version 14.8.0 or later is required.

// In summary, the difference between const express = require('express') and import express from "express" lies in the module systems they belong to. require is the syntax used in CommonJS (Node.js pre-ESM), while import is the syntax used in ECMAScript Modules (ESM) introduced in ECMAScript 6.

// import express from "express"

// const express = require('express');
// const userRoutes = require('./route/users.js');
// const userRoutes = require('./route/users.js');
import mysql from "mysql";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import loginRoutes from "./route/login.js";
import userRoutes from "./route/users.js";
import sportRoutes from "./route/sport.js";

// import http from "http";
// import { Server } from "socket.io";

const app = express();
const PORT = process.env.PORT || 5000;

// the body-parser middleware is placed before the userRoutes middleware, ensuring that the request body is properly parsed before reaching the route handlers.

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ------------------------

app.use("/login", loginRoutes);
app.use("/user", userRoutes);
app.use("/sport", sportRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the users API !");
});

app.all("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
