const mongoose = require("mongoose");

class Database {
  constructor() {
    this.uri = process.env.DB_URI;
    this.user = process.env.DB_USER;
    this.pass = process.env.DB_PASS;
  }
  async start() {
    try {
      await mongoose
        .connect(`mongodb+srv://${this.user}:${this.pass}@${this.uri}`)
        .then(() => console.log("Connectado com o banco de dados."));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Database;
