import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "Edupeak_blog",
    });

    isConnected = true;

    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
