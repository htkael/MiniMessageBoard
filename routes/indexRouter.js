const { format } = require("date-fns");
const { Router } = require("express");
const indexRouter = Router();

const messages = [];

indexRouter.get("/", (req, res) => {
  try {
    res.render("index", { messages: messages });
  } catch (error) {
    console.error("Error rendering homepage:", error);
    res.status(500).send("Internal Server Error");
  }
});

indexRouter.post("/new", (req, res) => {
  try {
    const newMessage = req.body.msg;
    const author = req.body.name;
    const id = messages.length + 1;
    const date = format(new Date(), "MMMM dd, yyyy");
    messages.push({ id: id, text: newMessage, user: author, added: date });
    res.redirect("/");
  } catch (error) {
    console.error("Error adding new message:", error);
    res.status(500).send("Internal Server Error");
  }
});

indexRouter.get("/message/:id", (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const message = messages.find((m) => m.id === messageId);
    if (message) {
      res.render("message", { message: message });
    } else {
      res.status(404).send("Message Not Found");
    }
  } catch (error) {
    console.error("Error retrieving message:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = indexRouter;
