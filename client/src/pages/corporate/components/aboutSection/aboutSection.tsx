import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React from 'react'
import './aboutSection.Module.scss'

export default function AboutSection() {
  return (
    <div className="aboutSection">
      <SectionTitle
        title="About"
        subtitle="Elevating Corporate Experiences through Exclusive Nights Out"
      />

      <div className="aboutSection__body">
        <p>
          At OOO Events, we recognize the unique demands and expectations that
          come with curating events for senior stakeholders, partners,
          colleagues or clients within the corporate realm. We have a team of
          ex-corporate employees with experience in organizing events,
          conferences, Xmas parties, brand activations, product launches,
          festivals and more.
        </p>

        <p>
          Planning a corporate event or an after-party can be difficult, you
          will have to take into account a wide range of personalities, the
          right location, as well as the atmosphere of the night.
        </p>

        <p>
          Let us elevate your corporate engagements, turning them into memorable
          nights out that resonate with the essence of your brand and leave a
          lasting impact on your esteemed guests
        </p>
      </div>
    </div>
  )
}
