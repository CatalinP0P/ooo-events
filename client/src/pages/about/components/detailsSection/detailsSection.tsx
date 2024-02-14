import React from 'react'
import './detailsSection.Module.scss'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'

export default function DetailsSection() {
  return (
    <div className="details">
      <SectionTitle
        title="Details"
        subtitle="More Informations about Out Of Office Events"
      />
      <div className="details__container">
        <div className="details__item">
          <h4 className="details__title">• Our connections </h4>
          <label>
            {`We operate alongside industry-leading venues across
        London. So, whatever you want, we make it happen. How? Because we’re
        backed by a good network of partners and powered by a creative and
        inspiring team. We don't just organize events; we craft experiences that
        linger in the hearts and minds of your clients, friends and colleagues.`}
          </label>
        </div>

        <div className="details__item">
          <h4 className="details__title">• Our London presence</h4>
          <label>
            {`Our London presence positions us with the knowledge
        and opportunities to create legendary events that are perfectly tailored
        to yourself, colleagues & friends, your company & stakeholders. Gain
        access to London's most exclusive restaurants, nightclubs, and members
        clubs. Whether you seek a chic urban setting or a sophisticated
        members-only enclave, we've got the keys to unlock the doors to the
        city's finest venues.`}
          </label>
        </div>

        <div className="details__item">
          <h4 className="details__title">• Our understanding </h4>
          <label>
            {`Our company ethos of a people-first approach dictates
        the details of Out of Office Events, delivered by a designated Lifestyle
        Management Team who is on-call 24 hours a day, wherever business or life
        takes you. By combining our expertise and network we produce
        extraordinary experiences that deliver exceptional results and exceed
        all expectations. Our team is committed to delivering impeccable
        service, ensuring that every detail is meticulously handled to create
        seamless and stress-free events.`}{' '}
          </label>
        </div>
      </div>
    </div>
  )
}
