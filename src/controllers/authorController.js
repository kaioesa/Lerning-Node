import authors from "../models/Author.js";

class AuthorController {
  static getAllAuthors = (req, res) => {
    authors.find((err, authors) => {
      res.status(200).json(authors);
    });
  };

  static getAuthorById = (req, res) => {
    const id = req.params.id;

    authors.findById(id, (err, authors) => {
      if (err) {
        res
          .status(400)
          .send({ message: `${err.message} - author id not found.` });
      } else {
        res.status(200).send(authors);
      }
    });
  };

  static createAuthor = (req, res) => {
    let author = new authors(req.body);
    author.save((err) => {
      if (err) {
        res
          .status(500)
          .send({ message: `${err.message} - author creation failed` });
      } else {
        res.status(201).send(author.toJSON());
      }
    });
  };

  static updateAuthor = (req, res) => {
    const id = req.params.id;

    authors.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      (err) => {
        if (!err) {
          res
            .status(200)
            .send({ message: "The author was successfully updated" });
        } else {
          res.status(500).send({ message: err.message });
        }
      }
    );
  };

  static deleteAuthor = (req, res) => {
    const id = req.params.id;

    authors.findByIdAndDelete(id, (err) => {
      if (!err) {
        res
          .status(200)
          .send({ message: "The author was successfully deleted" });
      } else {
        res
          .status(500)
          .send({ message: `${err.message} - The author wasn't deleted` });
      }
    });
  };
}

export default AuthorController;
