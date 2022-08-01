const express = require("express");
const mongoose = require("mongoose");
const logger = require("./middleware/logger");
port = 3000;
const adminRoutes = require("./routes/admin");
const userRoute = require("./routes/users");
const login = require("./routes/login");
const app = express();
app.use(express.json());
app.use(logger);

//use routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoute);
app.use("/login", login);

//import contents of .env file
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

//connect to database using mongoose
mongoose.connect(mongoString);
const database = mongoose.connection;

//check if database connecttion is successful or fails
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
