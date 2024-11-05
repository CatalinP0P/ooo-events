import * as nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS
const host = process.env.MAIL_HOST
const serverUrl = process.env.SERVER_URL

export const mail = nodemailer.createTransport({
  host: host,
  port: 465,
  auth: {
    user: user,
    pass: pass,
  },
})

export const sendMail = (to, subject, text) => {
  return mail.sendMail({ from: user, to, subject, text })
}

export const sendMailWithAttachment = async (email, subject, text, files) => {
  try {
    console.log(files)
    var attachments = []

    if (files?.length)
      for (var i = 0; i < files.length; i++) {
        const file = files[i]

        const url = file.path
        const name = file.filename

        const response = await axios.get(serverUrl + url, {
          responseType: 'arraybuffer',
        })
        const fileBuffer = Buffer.from(response.data, 'binary')

        attachments.push({ filename: name, content: fileBuffer })
      }

    // Set up the email options
    const mailOptions = {
      from: user,
      to: email,
      subject: subject,
      text: text,
      attachments: [...attachments],
    }

    // Send the email
    await mail.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export default mail
