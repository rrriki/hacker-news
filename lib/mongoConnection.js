const mongoose = require('mongoose');

/* Helper class to start a MongoDB Connection */

class MongoConnection {
  constructor() {
    this.db = null;
    this.url = process.env.MONGODB_URI;
  }

  async connect() {
    try {
      await mongoose.connect(this.url, { useNewUrlParser: true, useCreateIndex: true });
      this.db = mongoose.connection;
      console.log('Connected to mongoDB');
    } catch (error) {
      console.log('Error connecting to mongoDB:', error.toString());
      process.exit(1);
    }
  }

  async disconnect() {
    try {
      await this.db.close();
      console.log('Connection to mongoDB closed');
    } catch (error) {
      console.log('Error closing connection to mongoDB:', error.toString());
    }
  }
}

module.exports = MongoConnection;
