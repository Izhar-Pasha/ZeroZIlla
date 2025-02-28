import mongoose from "mongoose";

const dbConnection = () => {
  const URI = process.env.Mongo_URI;

  mongoose
    .connect(URI, {
      dbName: process.env.DBName,
    })
    .then(() => console.log("DB Connection is successfull"))
    .catch((err) => console.log("failed to connect:", err));
};

export default dbConnection;
