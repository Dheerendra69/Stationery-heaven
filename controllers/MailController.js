const { sendEmail } = require("../utils/sendEmail");

const mailController =  async (req, res) => {
  try {
    const { receiver, message } = req.body;

    if (!receiver || !message) {
      return res.status(400).json({ error: "Receiver and message are required" });
    }

    const subject = "Message from Your App";

    // await sendEmail(receiver, subject, message);

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error in /send-email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
};
module.exports = {mailController};