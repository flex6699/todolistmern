const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const routes = require("./route/TodoRoute");

const app = express();
app.use(express.json());

//Port

const PORT = process.env.PORT || 8080;
//use cors

app.use(cors());
const TodoItemRoute = require("./route/TodoRoute");
//MONGODB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use("/", TodoItemRoute);

///Add port and connect to server
app.listen(PORT, () => console.log("server connected"));
