import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer'
import formatDateToDDMMYYYY from './func/formatDateToDDMMYYYY.js'
import { sendMail, sendMailWithAttachment } from './utils/mail.js'
import newsletterClientControllers from './controllers/newsletterClientControllers.js'
import path from 'path'
dotenv.config()
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import newsletterTemplateController from './controllers/newsletterTemplateController.js'
const __dirname = dirname(fileURLToPath(import.meta.url))

const PORT = process.env.PORT

const MAIL_USER = process.env.MAIL_USER

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: Infinity,
  },
})

const app = express()
app.use(cors())
app.use(express.json())

const isUpcomingDate = (date) => {
  const currentDate = new Date()

  currentDate.setDate(currentDate.getDate() - 1)

  return date > currentDate
}

const isEmail = (str) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(str)
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.post('/forms/reserveTable', async (req, res) => {
  const {
    male,
    female,
    date,
    name,
    spendingAmount,
    email,
    phone,
    age,
    location,
  } = req.body

  if (age < 18) return res.status(400).send('You must be over 18')
  if (!isEmail(email))
    return res.status(400).send('Email provided is not valid')
  if (!isUpcomingDate(new Date(date)))
    return res.status(400).send('Date is not valid')

  const subject = `OOOEvents - Table Reservation Request from ${name}`

  const text = `
    You have received a new Table Reservation Request at ${location.name ? location.name : location.title}, ${location.address || ''}, ${location.postcode || ''}

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
  Table Reservation Confirmation at ${location.name ? location.name : location.title}, ${location.address || ''}, ${location.postcode || ''}

  Information
  Date: ${formatDateToDDMMYYYY(new Date(date))}
  Name: ${name}
  For: ${female} Female(s), ${male} Male(s)
  Email: ${email}
  Phone: ${phone}
  Spending Amoung: ${spendingAmount || 'Undefined'}
`

  try {
    sendMail(MAIL_USER, subject, text)
    sendMail(email, replySubject, replyText)
    res.send('Table Reserved!')
  } catch {
    res.status(400).send('Some error occured, try again later.')
  }
})

app.post('/forms/guestList', async (req, res) => {
  const { club, people, date, email, phone, name, age, workDepartment } =
    req.body

  if (!isEmail(email))
    return res.status(400).send('Email provided is not valid')
  if (age < 18) return res.status(400).send('You must be over 18')
  if (!isUpcomingDate(new Date(date)))
    return res.status(400).send('Date is not valid')

  try {
    const subject = `OOOEvents - Guest List Request from ${name}`
    const text = `You have received a new Guest List Request at ${club.name != undefined ? club.name : club.title}, ${club.address != undefined ? club.address : ''}, ${club.postcode != undefined ? club.postcode : ''}

  Information
  Date: ${formatDateToDDMMYYYY(new Date(date))}
  Name: ${name}
  Age: ${age}
  Work Department: ${workDepartment}
  Friends: ${people.map((person) => `\n ${person.name} - ${person.age}`)}
  Email: ${email}
  Phone: ${phone}
  `

    const replySubject = `OOOEvents - Guest List Confirmation`
    const replyText = `
  Guest List Confirmation at ${club.name || club.title}, ${club.address || ''}, ${club.postcode | ''}

  Information
  Date: ${formatDateToDDMMYYYY(new Date(date))}
  Name: ${name}
  Age: ${age}
  Work Department: ${workDepartment}
  Friends: ${people.map((person) => `\n ${person.name} - ${person.age}`)}
  Email: ${email}
  Phone: ${phone}
`

    try {
      try {
        await sendMail(email, replySubject, replyText)
      } catch {
        return res.status(400).send('Email provided is not valid')
      }
      await sendMail(MAIL_USER, subject, text)

      res.send('Your request has been sent. Someone will be in touch with you.')
    } catch {
      return res.status(400).send('Some error occured.')
    }
  } catch {
    return res.status(400).send('Data provided is not valid')
  }
})

app.post('/forms/specialRequest', async (req, res) => {
  const { restaurant, interest, email, details, name } = req.body
  if (!isEmail(email))
    return res.status(400).send('Email provided is not valid')

  try {
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
      try {
        await sendMail(email, replySubject, replyText)
      } catch {
        return res.status(400).send('Email provided is not valid')
      }
      await sendMail(MAIL_USER, subject, text)

      res.send('Your request has been sent. Someone will be in touch with you.')
    } catch {
      return res.status(400).send('Some error occured')
    }
  } catch {
    return res.status(400).send('Data provided is not valid')
  }
})

app.post('/forms/corporate', async (req, res) => {
  const { email, name, details, interest } = req.body
  if (!isEmail(email))
    return res.status(400).send('Email provided is not valid')

  try {
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
      try {
        await sendMail(email, replySubject, replyText)
      } catch {
        return res.status(400).send('Email provided is not valid')
      }
      await sendMail(MAIL_USER, subject, text)

      res.send('Your request has been sent. Someone will be in touch with you.')
    } catch {
      return res.status(400).send('Some error occured')
    }
  } catch {
    return res.status(400).send('Data provided is not valid')
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

  if (!isEmail(email))
    return res.status(400).send('Email provided is not valid')
  if (age < 18) return res.status(400).send('You must be over 18')

  try {
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
      try {
        await sendMail(email, replySubject, replyText)
      } catch {
        return res.status(400).send('Email provided is not valid')
      }
      await sendMail(MAIL_USER, subject, text)

      res.send('Your request has been sent. Someone will be in touch with you.')
    } catch {
      return res.status(400).send('Some error occured')
    }
  } catch {
    return res.status(400).send('Data provided is not valid')
  }
})

app.post('/forms/services', async (req, res) => {
  const { interest, name, email, details } = req.body

  if (!isEmail(email))
    return res.status(400).send('Email provided is not valid')

  try {
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
      try {
        await sendMail(email, replySubject, replyText)
      } catch {
        return res.status(400).send('Email provided is not valid')
      }
      await sendMail(MAIL_USER, subject, text)

      return res.send('Services Interest sent.')
    } catch {
      return res.status(400).send('Some error occured')
    }
  } catch {
    return res.status(400).send('Data provided is not valid')
  }
})

app.post('/forms/contact', async (req, res) => {
  const { name, email, details, age, workDepartment } = req.body

  if (!isEmail(email))
    return res.status(400).send('Email provided is not valid')

  try {
    const subject = `OOOEvents - Contact Message from ${name}`
    const text = `You have received a new Contact message

    Message:
    ${details}
  
    Information
    Name: ${name}
    Email: ${email}
    Age: ${age}
    Work Department: ${workDepartment}1
    `

    const replySubject = `OOOEvents - Contact Message Confirmation`
    const replyText = `Contact Message Confirmation

  
    Message:
    ${details}
    
    Information
    Name: ${name}
    Email: ${email}
    Age: ${age}
    Work Department: ${workDepartment}
  `

    try {
      try {
        await sendMail(email, replySubject, replyText)
      } catch (err) {
        return res.status(400).send('Email provided is not valid')
      }
      await sendMail(MAIL_USER, subject, text)

      return res.send('Contact Message sent.')
    } catch {
      return res.status(400).send('Some error occured')
    }
  } catch {
    return res.status(400).send('Data Provided is not valid')
  }
})

app.post('/forms/newsletter', async (req, res) => {
  const { email, age, workDepartment } = req.body

  if (age < 18) return res.status(400).send('You must be over 18')
  if (!isEmail(email))
    return res.status(400).send('Email provided is not valid')

  try {
    await newsletterClientControllers.add({
      email,
      age,
      workDepartment,
    })
    res.send('Signed to newsletter. Thank you!')
  } catch {
    res.status(400).send('Already signed to newsletter.')
  }
})

app.post(
  '/newsletter/send',
  upload.fields([{ name: 'files', maxCount: 5 }]),
  async (req, res) => {
    const { body, title } = req.body

    const clients = await newsletterClientControllers.getAll()

    clients.forEach((client) => {
      console.log('Sending mail to ' + client.email)
      sendMailWithAttachment(client.email, title, body, req.files['files'])
    })

    res.sendStatus(200)
  },
)

app.get('/newsletter', async (req, res) => {
  const clients = await newsletterClientControllers.getAll()
  res.json(clients)
})

app.post('/newsletter/edit', async (req, res) => {
  const { password } = req.body
  console.log(password)
  if (password != '3jhk1348y123h') res.sendStatus(403)

  const body = req.body
  await newsletterTemplateController.edit(body)

  res.json(body)
})

app.get('/newsletter/getTemplate', async (req, res) => {
  const template = await newsletterTemplateController.get()
  res.json(template)
})

app.get('/newsletter/unsubscribe/:email', async (req, res) => {
  const { email } = req.params

  try {
    newsletterClientControllers.remove(email)
    res.send('Unsubscribed from newsletter')
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
