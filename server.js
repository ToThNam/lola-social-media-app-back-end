import express from "express";
import mongoose from "mongoose";
import * as io from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import user from "./routers/User.js"
import auth from "./routers/Authentication.js"

const app = express();

const PORT = 1204;
const URI = "mongodb://127.0.0.1:27017/lola-db";

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

app.use('/user', user);
app.use('/auth', auth);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to BD");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });




