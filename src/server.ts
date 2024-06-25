import app from "./app";
import mongoose from "mongoose";
const PORT = 3001;

const startServer = async () => {
  try {
    await mongoose
      .connect(
        "mongodb://127.0.0.1:27017/Streetlink?readPreference=primary&directConnection=true&ssl=false"
      )
      .then(() => {
        console.log(`Connected to mongoDB successfully!`);
      })
      .catch(() => {
        console.log(`Error occurred while connecting to mongoDB!`);
      });

    app.listen(PORT, () => {
      console.log(`Server listening at port :${PORT}`);
    });
  } catch (error) {
    console.log(`error occurred while starting server!: ${error}`);
  }
};

startServer();
