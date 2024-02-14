import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import formatDateToDDMMYYYY from './func/formatDateToDDMMYYYY.js'
import { sendMail } from './utils/mail.js'
dotenv.config()
const PORT = process.env.PORT
const MAIL_USER = process.env.MAIL_USER

const app = express()
app.use(cors())
app.use(express.json())

app.post('/forms/reserveTable', async (req, res) => {
  const { male, female, date, name, spendingAmount, email, phone, location } =
    req.body

  const subject = `OOOEvents - Table Reservation Request from ${name}`

  const text = `
    You have received a new Table Reservation Request at ${location.name}, ${location.address}, ${location.postcode}

    Information
    Date: ${formatDateToDDMMYYYY(new Date(date))}
    Name: ${name}
    For: ${female} Female(s), ${male} Male(s)
    Email: ${email}
    Phone: ${phone}
    Spending Amoung: ${spendingAmount || 'Undefined'}
  `

  const replySubject = `OOOEvents - Table Reservation Confirmation`
  const replyText = `
  Table Reservation Confirmation at ${location.name}, ${location.address}, ${location.postcode}

  Information
  Date: ${formatDateToDDMMYYYY(new Date(date))}
  Name: ${name}
  For: ${female} Female(s), ${male} Male(s)
  Email: ${email}
  Phone: ${phone}
  Spending Amoung: ${spendingAmount || 'Undefined'}
`

  try {
    await sendMail(MAIL_USER, subject, text)
    await sendMail(email, replySubject, replyText)
    res.send('Table Reserved!')
  } catch {
    res.status(400).send('Some error occured, try again later.')
  }
})

app.post('/forms/guestList', async (req, res) => {
  const { club, male, female, date, email, phone, name } = req.body

  const subject = `OOOEvents - Guest List Request from ${name}`
  const text = `You have received a new Guest List Request at ${club.name}, ${club.address}, ${club.postcode}

  Information
  Date: ${formatDateToDDMMYYYY(new Date(date))}
  Name: ${name}
  For: ${female} Female(s), ${male} Male(s)
  Email: ${email}
  Phone: ${phone}
  `

  const replySubject = `OOOEvents - Guest List Confirmation`
  const replyText = `
  Guest List Confirmation at ${club.name}, ${club.address}, ${club.postcode}

  Information
  Date: ${formatDateToDDMMYYYY(new Date(date))}
  Name: ${name}
  For: ${female} Female(s), ${male} Male(s)
  Email: ${email}
  Phone: ${phone}
`

  try {
    await sendMail(MAIL_USER, subject, text)
    await sendMail(email, replySubject, replyText)

    return res.send('Guest List Request sent.')
  } catch {
    return res.status(400).send('Some error occured.')
  }
})

app.post('/forms/specialRequest', async (req, res) => {
  const { restaurant, interest, email, details, name } = req.body

  const subject = `OOOEvents - Special Request from ${name}`
  const text = `You have received a new Special Request at ${restaurant.name}, ${restaurant.address}, ${restaurant.postcode}\n\n

  Message:
  ${details}

  Information
  Name: ${name}
  Email: ${email}
  Interst: ${interest}
  `

  const replySubject = `OOOEvents - Special Request Confirmation`
  const replyText = `
  Special Request Confirmation at ${restaurant.name}, ${restaurant.address}, ${restaurant.postcode}\n\n

  Messsage:
  ${details}

  Information
  Name: ${name}
  Email: ${email}
  Interst: ${interest}
`

  try {
    await sendMail(MAIL_USER, subject, text)
    await sendMail(email, replySubject, replyText)

    return res.send('Special Request sent.')
  } catch {
    return res.status(400).send('Some error occured')
  }
})

app.post('/forms/corporate', async (req, res) => {
  const { email, name, details, interest } = req.body

  const subject = `OOOEvents - Corporate Request from ${name}`
  const text = `You have received a new Corporate Requst about ${interest}

  Message:
  ${details}

  Information
  Name: ${name}
  Email: ${email}
  Interst: ${interest}
  `

  const replySubject = `OOOEvents - Corporate Request Confirmation`
  const replyText = `
  Corporate Request Confirmation about ${interest}

  Messsage:
  ${details}

  Information
  Name: ${name}
  Email: ${email}
  Interst: ${interest}
`

  try {
    await sendMail(MAIL_USER, subject, text)
    await sendMail(email, replySubject, replyText)

    return res.send('Corporate Request sent.')
  } catch {
    return res.status(400).send('Some error occured')
  }
})

app.post('/forms/ambassadors', async (req, res) => {
  const {
    title,
    email,
    name,
    age,
    employer,
    industry,
    instagram,
    facebook,
    linkedin,
  } = req.body

  const subject = `OOOEvents - Ambassador Request from ${name}`
  const text = `You have received a new Ambassador Request

  
    Information
    Title: ${title}
    Name: ${name}
    Email: ${email}
    Age: ${age}
    Employer: ${employer}
    Industry: ${industry}
    Instagram: ${instagram}
    Facebook: ${facebook}
    Linkedin: ${linkedin}
    `

  const replySubject = `OOOEvents - Ambassador Request Confirmation`
  const replyText = `
    Corporate Request Confirmation
  
  
    Information
    Title: ${title}
    Name: ${name}
    Email: ${email}
    Age: ${age}
    Employer: ${employer}
    Industry: ${industry}
    Instagram: ${instagram}
    Facebook: ${facebook}
    Linkedin: ${linkedin}
  `

  try {
    await sendMail(MAIL_USER, subject, text)
    await sendMail(email, replySubject, replyText)

    return res.send('Ambassador Request sent.')
  } catch {
    return res.status(400).send('Some error occured')
  }
})

app.post('/forms/services', async (req, res) => {
  const { interest, name, email, details } = req.body

  let interestString = ''
  interest.forEach((item) => {
    interestString += ' ' + item
  })

  const subject = `OOOEvents - Services Interest from ${name}`
  const text = `You have received a new Services Interest

    Message:
    ${details}
  
    Information
    Interests: ${interestString}
    Name: ${name}
    Email: ${email}
    `

  const replySubject = `OOOEvents - Services Interest Confirmation`
  const replyText = `Services Interest Confirmation
  
  Message:
  ${details}
  
  Information
  Interests: ${interestString}
  Name: ${name}
  Email: ${email}
  `

  try {
    await sendMail(MAIL_USER, subject, text)
    await sendMail(email, replySubject, replyText)

    return res.send('Services Interest sent.')
  } catch {
    return res.status(400).send('Some error occured')
  }
})

app.post('/forms/contact', async (req, res) => {
  const { name, email, details } = req.body

  const subject = `OOOEvents - Contact Message from ${name}`
  const text = `You have received a new Contact message

    Message:
    ${details}
  
    Information
    Name: ${name}
    Email: ${email}
    `

  const replySubject = `OOOEvents - Contact Message Confirmation`
  const replyText = `Contact Message Confirmation

  
  Message:
  ${details}
  
  Information
  Name: ${name}
  Email: ${email}
  `

  try {
    await sendMail(MAIL_USER, subject, text)
    await sendMail(email, replySubject, replyText)

    return res.send('Contact Message sent.')
  } catch {
    return res.status(400).send('Some error occured')
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
