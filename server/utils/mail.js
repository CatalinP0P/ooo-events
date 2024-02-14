import * as nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

export const mail = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  auth: {
    user: user,
    pass: pass,
  },
})

export const sendMail = (to, subject, text) => {
  return mail.sendMail({ from: user, to, subject, text })
}

export default mail
