import express from "express";
import products from "./productsRoutes.js";
import authors from "./authorsRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "Curso de node" });
  });

  app.use(express.json(), products, authors);
};

export default routes;
