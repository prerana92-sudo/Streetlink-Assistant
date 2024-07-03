import nodemailer from "nodemailer";
import ejs from "ejs";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prerana1916@gmail.com",
    pass: "nwgx tjbz ieae waui",
  },
});

export const sendEmails = async (
  to: string = "prerana@yopmail.com",
  alertId: string = "1262362"
) => {

  const path = require('path');
const htmlPath = process.env.ALERT_TEMPLATE_PATH || './src/alertTemplate.ejs';
  // const htmlPath =
  //   "C:\\Users\\PRERANA\\Streetlink-Assistant\\src\\alertTemplate.ejs";
  const htmlTemplateContent = await ejs.renderFile(htmlPath, { alertId });

  const info = await transporter.sendMail({
    from: "prerana1916@gmail.com",
    to: to,
    subject: "Alert Creation Email",
    html: htmlTemplateContent,
  }); 

  console.log("Email sent: %s", info.messageId);
};
