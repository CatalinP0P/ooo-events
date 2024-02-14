import React from 'react'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import './previousEventsSection.Module.scss'
import usePastEvents from 'hooks/usePastEvents'
import { EventProps } from 'types/event'

export default function PreviousEventsSection() {
  const pastEvents = usePastEvents()

  return (
    <div className="previous__events">
      <SectionTitle
        title="Previous Events"
        subtitle="Explore our Top Events from the Past"
      />
      <div className="previous__events__container">
        <div className="previous__events__row">
          {pastEvents.data?.map((event: EventProps) => {
            return (
              <>
                <div
                  key={event.slug}
                  className="previous__events__item"
                  style={{ backgroundImage: `url(${event.image})` }}
                  onClick={() => window.open(event.image)}
                >
                  <label className="item__date">{event.date}</label>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}
