import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Database connection has failed"));
db.once("open", () => {
  console.log("Database connection established successfully");
});

const app = express();

app.use(express.json());

routes(app);

export default app;
