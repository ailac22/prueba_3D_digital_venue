import express from "express";
import bodyParser from "body-parser";
import { routes } from "./routes";
import { dataSource } from "./database/data-source";
const passport = require('passport');

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );

  // Pass to next layer of middleware
  next();
});
// routes definitions
app.use(routes);


app.get("/", (req, res, next) => {
  res.send("holap")
})

// establish database connection
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(3000, () => {
  console.log("Application started on: http://localhost:3000");
});
