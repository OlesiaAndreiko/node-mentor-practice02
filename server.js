const app = require("./app");

const connectMongo = require("./db/connection");

require("dotenv").config();

const startServer = async () => {
  try {
    await connectMongo();
    app.listen(process.env.PORT, (error) => {
      if(error) {
        console.log(`Error launch server ${error}`)
      }
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(`Failed to launch application ${error.message}`);
  }
};

startServer();