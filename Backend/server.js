const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/Database");

// Handle Unchaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Server Shut down due to Uncaught exciption error");
  process.exit(1);
});

// setting up config file
dotenv.config({ path: "config/config.env" });
// Connecting To Database
connectDatabase();
// Connection to the Port and Mode
const server = app.listen(process.env.PORT, () => {
  console.log(
    `server started in port : ${process.env.PORT} in ${process.env.NODE_ENV} mode .`
  );
});
// Handle unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log("Shutting down the Server due to unhandle rejection promise");
  server.close(() => {
    process.exit(1);
  });
});
