const mongoose = require("mongoose");

//Connection
async function connectMongoDB(url) {
  return mongoose.connect(url); // this return promise
}

module.exports = {
  connectMongoDB,
};
