const mongoose = require("mongoose");
const dbConnection = mongoose.connection;
const connectionStr = "mongodb://127.0.0.1:27017/pic-less";

mongoose
  .connect(connectionStr, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to MongoDB at ${dbConnection.host}:${dbConnection.port}`))
  .catch((err) => console.log("MongoDB connection err", err));

mongoose.connection.on("disconnected", (err) => console.log(err));
