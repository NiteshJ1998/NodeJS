const mongoose = require("mongoose");

async function connectMongoDB(url) {
  //Connection

  return mongoose.connect(url); // this return promise
}

module.exports = {
  connectMongoDB,
};
