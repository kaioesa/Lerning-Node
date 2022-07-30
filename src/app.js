import express from "express";
import db from "./config/dbConnect.js";
import products from "./models/Product.js";

db.on("error", console.log.bind(console, "Database connection has failed"));
db.once("open", () => {
  console.log("Database connection established successfully");
});

const app = express();

app.use(express.json());

app.get("/products", (req, res) => {
  products.find((err, products) => {
    res.status(200).json(products);
  });
});

app.get("/products/:id", (req, res) => {
  let index = searchProducts(req.params.id);
  res.json(products[index]);
});

app.post("/products", (req, res) => {
  products.push(req.body);
  res.status(201).send("The product has been successfully created.");
});

app.put("/products/:id", (req, res) => {
  let index = searchProducts(req.params.id);
  products[index].title = req.body.title;
  res.json(products);
});

app.delete("/products/:id", (req, res) => {
  let index = searchProducts(req.params.id);
  products.splice(index, 1);
  res.send(`The product ${req.params.id} was successfully deleted.`);
});

function searchProducts(id) {
  return products.findIndex((product) => product.id == id);
}

export default app;
