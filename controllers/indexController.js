const db = require("../db/queries");

exports.getMessages = async (req, res) => {
  const messages = await db.getMessages();
  console.log(messages);
  res.render("index", { messages: messages });
};

exports.messageDetails = async (req, res) => {
  try {
    const messageId = parseInt(req.params.id);
    const messages = await db.messageDetails(messageId);
    const message = messages[0];
    if (message) {
      res.render("message", { message: message });
    } else {
      res.status(404).send("Message Not Found");
    }
  } catch (error) {
    console.error("Error retrieving message:", error);
    res.status(500).send("Internal Server Error");
  }
};
