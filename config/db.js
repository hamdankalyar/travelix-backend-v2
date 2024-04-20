const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://hamdankalyar:kalyar@cluster0.xifgntj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      //"mongodb+srv://hamdankalyar:kalyar@cluster0.r8gi2rk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB..");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDb;
