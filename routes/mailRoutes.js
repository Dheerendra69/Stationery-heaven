const { mailController } =  require("../controllers/MailController");
const express = require("express");
const router = express.Router();

router.post("/send-mail", mailController);

module.exports = router;
