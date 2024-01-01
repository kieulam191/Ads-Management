import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import { promisify } from 'util';
import 'dotenv/config';

const readFile = promisify(fs.readFile);

const transporter  = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.example.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASS,
    },
});



export async function sendMail (email, password) {
  let html = await readFile('./public/content_created_account.html', 'utf8');
  let template = handlebars.compile(html);
  let data = {
      name: email.split("@")[0],
      username: email,
      password: password
  };
  let htmlToSend = template(data);
  var mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: 'Thông tin đăng nhập cho tài khoản',
    html: htmlToSend
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else
      console.log("send mail success")
  });
};


export async function sendOTPMail (email, otp) {
  let html = await readFile('./public/content_otp.html', 'utf8');
  let template = handlebars.compile(html);
  let data = {
      name: email.split("@")[0],
      username: email,
      otp: otp
  };
  let htmlToSend = template(data);
  var mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: 'Thay đổi lại mật khẩu',
    html: htmlToSend
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else
      console.log("send mail success")
  });
};
 