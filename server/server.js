const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require("body-parser");
// const cors = require("cors");

require("dotenv").config();
const db = process.env.mongoURI;

const mongoose = require("mongoose");
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connection to Mongo DB established"))
  .catch(err => console.log(err));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const passport = require("passport");

//passport middleware
app.use(passport.initialize());
//passport configuration
require("./config/passport");

// app.use(cors());

app.listen(port, () => {
  console.log("Server is running on " + port + " port");
});

app.use("/cities", require("./routes/cities"));
app.use("/itineraries", require("./routes/itineraries"));
app.use("/activities", require("./routes/activities"));
app.use("/users", require("./routes/users"));
