import React from 'react'
import { ExpandMoreRounded } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import './faqSection.Module.scss'
import useFaq from 'hooks/useFaq'
import ContentfulRichText from 'components/ui/richTextBox/richTextBox'

export default function FaqSection() {
  const { data, loading } = useFaq()

  if (loading) return <></>

  return (
    <div className="faqSection">
      <div className="faqSection__container">
        {data.map((question, number) => {
          const props = number == 0 ? { defaultExpanded: true } : {}

          return (
            <Accordion key={question.question} {...props}>
              <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                <label className="faqSection__title">
                  {number + 1}. {question.question}
                </label>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <ContentfulRichText
                    content={question.response}
                  ></ContentfulRichText>
                </div>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </div>
    </div>
  )
}
