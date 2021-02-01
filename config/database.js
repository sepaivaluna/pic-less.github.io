const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = mongoose.connection;
const connectionStr = process.env.MONGODB_URI;

mongoose
  .connect(connectionStr, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to MongoDB at ${dbConnection.host}:${dbConnection.port}`))
  .catch((err) => console.log("MongoDB connection err", err));

dbConnection.on("disconnected", (err) => console.log(err));
