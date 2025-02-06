const db = require("../db/queries");
const { format } = require("date-fns");

exports.getForm = async (req, res) => {
  try {
    res.render("form");
  } catch (error) {
    console.error("Error retrieving new message form");
    res.status(500).send("Internal Server Error");
  }
};

exports.createMessage = async (req, res) => {
  try {
    const newMessage = req.body.msg;
    const author = req.body.name;
    const date = new Date();
    await db.createMessage(author, newMessage, date);
    res.redirect("/");
  } catch (error) {
    console.error("Error adding new message:", error);
    res.status(500).send("Internal Server Error");
  }
};
