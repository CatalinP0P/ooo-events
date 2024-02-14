import React from 'react'
import { ExpandMoreRounded } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import './faqSection.Module.scss'

export default function FaqSection() {
  const questions = [
    {
      title: 'How to book a table?',
      details:
        'To make a table booking at any London club, you can contact us via phone, WhatsApp, or email or click Book Now button. We offer VIP tables with bottle service for groups of varying sizes, depending on your needs. You can select a table that fits your needs.',
    },

    {
      title: 'What is the most common dress code?',
      details:
        'The dress code varies from club to club. In general, most of the clubs ask for "dress to impress".',
    },

    {
      title: 'Can I cancel my booking?',
      details: 'Yes, you can cancel your booking by informing us.',
    },

    {
      title: 'Can you arrange a private party?',
      details:
        'You can contact us with your requirements and budget. Our event management team will guide you to choose the right venue as per your requirements.',
    },
    {
      title: 'What are the tables prices?',
      details:
        'Different clubs have different prices for the tables, and there is a price difference between standard and VIP tables. Please, contact us with the club name in mind, and we will provide you with the correct information.',
    },
  ]

  return (
    <div className="faqSection">
      <div className="faqSection__container">
        {questions.map((question, number) => {
          const props = number == 0 ? { defaultExpanded: true } : {}

          return (
            <Accordion key={question.title} {...props}>
              <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                <label className="faqSection__title">
                  {number + 1}. {question.title}
                </label>
              </AccordionSummary>
              <AccordionDetails>
                <label className="faqSection__details">
                  {question.details}
                </label>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}
