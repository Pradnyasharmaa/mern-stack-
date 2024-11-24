import mongoose from "mongoose";

export const dbConnection = async () => {
  const mongoURI = "mongodb://127.0.0.1:27017/";

  try {
    await mongoose.connect(mongoURI, { dbName: "MERN_JOB_SEEKING_WEBAPP" });
    console.log("Connected to database!");
  } catch (err) {
    console.error(`Error occurred while connecting to database: ${err}`);
  }
};
