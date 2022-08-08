import products from "../models/Product.js";

class ProductController {
  static getAllProducts = (req, res) => {
    products
      .find()
      .populate("author", "name")
      .exec((err, products) => {
        res.status(200).json(products);
      });
  };

  static getProductById = (req, res) => {
    const id = req.params.id;

    products
      .findById(id)
      .populate("author", "name")
      .exec((err, products) => {
        if (err) {
          res
            .status(400)
            .send({ message: `${err.message} - Product id not found.` });
        } else {
          res.status(200).send(products);
        }
      });
  };

  static createProduct = (req, res) => {
    let product = new products(req.body);
    product.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - product creation failed` });
      } else {
        res.status(201).send(product.toJSON());
      }
    });
  };

  static updateProduct = (req, res) => {
    const id = req.params.id;

    products.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      (err) => {
        if (!err) {
          res
            .status(200)
            .send({ message: "The product was successfully updated" });
        } else {
          res.status(500).send({ message: err.message });
        }
      }
    );
  };

  static deleteProduct = (req, res) => {
    const id = req.params.id;

    products.findByIdAndDelete(id, (err) => {
      if (!err) {
        res
          .status(200)
          .send({ message: "The product was successfully deleted" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - The product wasn't deleted` });
      }
    });
  };

  static getProductByPublisher = (req, res) => {
    const publisher = req.query.publisher;

    products.find({ publisher: publisher }, {}, (err, products) => {
      // res.status(200).send(products);

      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - The publisher wasn't found` });
      } else {
        res.status(200).send(products);
      }
    });
  };
}

export default ProductController;
