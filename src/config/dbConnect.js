import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://admin:admin@crudexpress.8jhyqzl.mongodb.net/crud-express"
);

let db = mongoose.connection;

export default db;
