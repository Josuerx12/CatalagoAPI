const mongoose = require("mongoose");

class Database {
  constructor() {
    this.uri = process.env.DB_URI;
  }
  async start() {
    try {
      await mongoose
        .connect(`${this.uri}`)
        .then(() => console.log("Connectado com o banco de dados."));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Database;
