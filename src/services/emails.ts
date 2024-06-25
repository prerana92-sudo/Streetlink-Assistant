import nodemailer from "nodemailer";
import ejs from 'ejs';
import path from 'path';

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prerana1916@gmail.com",
    pass: "nwgx tjbz ieae waui",
  },
});


export const sendEmails = async (to: string = 'prerana@yopmail.com', alertId: string = "1262362") => {
   const htmlPath = "C:\\Streetlink Assistant\\src\\alertTemplate.ejs";
   const htmlTemplateContent = await ejs.renderFile( htmlPath, {alertId});
  

 const info = await transporter.sendMail({
    from: "prerana1916@gmail.com",
    to: to,
    subject: "Alert Creation Email",
    html: htmlTemplateContent
   });

    console.log("Email sent: %s", info.messageId);
};
