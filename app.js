const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const newMessageRouter = require("./routes/newMessageRouter");
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

console.log("Server Starting");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/new", newMessageRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Now listening on Port: ${PORT}`);
});
