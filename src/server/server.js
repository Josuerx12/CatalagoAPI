require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const router = require("./router");
const Database = require("../config/database");

class Server {
  constructor() {
    this.app = express();

    this.app.use(bodyparser.json());
    this.app.use(bodyparser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(router);

    this.port = process.env.PORT;
    this.db = new Database();
  }

  async start() {
    await this.db
      .start()
      .then(
        this.app.listen(this.port, () =>
          console.log(`Servidor rodando em  http://localhost:${this.port}`)
        )
      )
      .catch(() => console.log("Erro ao conecta com o banco de dados!"));
  }
}

module.exports = Server;
