const { Router } = require("express");
const newMessageRouter = Router();

newMessageRouter.get("/", (req, res) => {
  try {
    res.render("form");
  } catch (error) {
    console.error("Error retrieving new message form");
    res.status(500).send("Internal Server Error");
  }
});

module.exports = newMessageRouter;
