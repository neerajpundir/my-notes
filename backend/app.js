require("./src/connection/mySqlConn");
require("dotenv").config();

const express = require("express");
const notesRouter = require("./src/routes/notesRouter");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.use("/api", notesRouter);

const server = app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
