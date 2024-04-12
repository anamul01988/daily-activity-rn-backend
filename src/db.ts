import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://anamulhaque01827:EefiT6pfMKyoTvRg@cluster0.q8kyamj.mongodb.net/todo-app?retryWrites=true&w=majority"
    );
    if (connection) {
      console.log("Connection established");
    }
  } catch (error) {
    console.log("error in connectToDatabase", error);
    throw error;
  }
};

export default connectToDatabase;
