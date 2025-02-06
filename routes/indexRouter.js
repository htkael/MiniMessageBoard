const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

const messages = [];

indexRouter.get("/", indexController.getMessages);

indexRouter.get("/message/:id", indexController.messageDetails);

module.exports = indexRouter;
