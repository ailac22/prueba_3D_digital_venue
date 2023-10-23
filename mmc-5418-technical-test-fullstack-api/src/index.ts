import express from "express";
import bodyParser from "body-parser";
import { routes } from "./routes";
import { dataSource } from "./database/data-source";
import passport from 'passport';
import configurePassportStrategy from "./config/passport";

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

configurePassportStrategy(passport)

app.use(passport.initialize());

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

// Para el preflight
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});
// routes definitions
app.use(routes);


app.get("/", (req, res, next) => {
  res.send("La api funciona!")
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
