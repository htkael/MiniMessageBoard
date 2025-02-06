const { Router } = require("express");
const newMessageRouter = Router();
const messageControler = require("../controllers/messageController");

newMessageRouter.get("/", messageControler.getForm);

newMessageRouter.post("/", messageControler.createMessage);

module.exports = newMessageRouter;
